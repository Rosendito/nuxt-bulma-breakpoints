import Vue from 'vue'
import throttle from 'lodash/throttle'
import { transform } from 'lodash'
const extend = (app, mixin) => {
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push(mixin)
}


const defaultOptions = {
  tablet: 769,
  desktop: 1024,
  widescreen: 1216,
  fullhd: 1408,
  options: {
    polyfill: true,
    throttle: 200
  }
}

const defaultBreakpoints = {
  current: 'mobile',

  mobile: true,
  tablet: false,
  tabletOnly: false,
  touch: false,
  desktop: false,
  desktopOnly: false,
  untilWidescreen: true,
  widescreen: false,
  widescreenOnly: false,
  untilFullhd: true,
  fullhd: false,

  width: 0,
  height: 0
}

const conditions = {
  mobile: (width, breakpoints) => width < breakpoints.tablet,
  tablet: (width, breakpoints) => width >= breakpoints.tablet,
  tabletOnly: (width, breakpoints) => width >= breakpoints.tablet && width < breakpoints.desktop,
  touch: (width, breakpoints) => width < breakpoints.desktop,
  desktop: (width, breakpoints) => width >= breakpoints.desktop,
  desktopOnly: (width, breakpoints) => width >= breakpoints.desktop && width < breakpoints.widescreen,
  untilWidescreen: (width, breakpoints) => width < breakpoints.widescreen,
  widescreen: (width, breakpoints) => width >= breakpoints.widescreen,
  widescreenOnly: (width, breakpoints) => width >= breakpoints.widescreen && width < breakpoints.fullhd,
  untilFullhd: (width, breakpoints) => width < breakpoints.fullhd,
  fullhd: (width, breakpoints) => width >= breakpoints.fullhd,
}

const transformBreakpoints = (breakpoints, { width, height }, options) => {
  const originalBreakpoints = [
    'mobile',
    'tablet',
    'desktop',
    'widescreen',
    'fullhd'
  ]
  const conditionsKey = Object.keys(conditions)
  let transformData = {
    current: 'mobile'
  }

  conditionsKey.forEach(breakpoint => {
    transformData[breakpoint] = conditions[breakpoint](width, options)

    if (
      originalBreakpoints.includes(breakpoint) &&
      conditions[breakpoint](width, options)
    )
      transformData.current = breakpoint
  })

  transformData.width = ~~width
  transformData.height = ~~height

  Object.assign(breakpoints, transformData)
}

export default async (ctx, inject) => {
  const options = { ...defaultOptions, ...<%= JSON.stringify(options, null, 2) %>}


  const breakpoints = Vue.observable(defaultBreakpoints)

  if (process.server) {
    ctx.$breakpoints = breakpoints
    inject('breakpoints', breakpoints)
    return
  }

  const needPolyfill =
    !Object.prototype.hasOwnProperty.call(window, 'ResizeObserver') &&
    options.options.polyfill



  if (needPolyfill) {
    const ResizeObserver = await import('resize-observer-polyfill')

    Object.defineProperty(window, 'ResizeObserver', {
      value: ResizeObserver.default,
      writable: false
    })
  }

  const bodyElem = document.querySelector('body')

  const resizeObserver = new ResizeObserver(
    throttle((entries) => {
      const [{ contentRect }] = entries
      transformBreakpoints(breakpoints, contentRect, options)
    }, +options.options.throttle, { trailing: true, leading: false })
  )

  extend(ctx.app, {
    beforeDestroy () {
      resizeObserver.unobserve(bodyElem)
    }
  })

  resizeObserver.observe(bodyElem)

  ctx.$breakpoints = breakpoints
  inject('breakpoints', breakpoints)
}
