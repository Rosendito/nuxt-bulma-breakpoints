import Vue from 'vue'
import throttle from 'lodash/throttle'
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
  desktop: false,
  widescreen: false,
  fullhd: false,

  width: 0,
  height: 0
}

const transformBreakpoints = (breakpoints, { width, height }, options) => {
  const { tablet, desktop, widescreen, fullhd } = options

  let currentActive = 'mobile'

  switch (true) {
    case width >= fullhd:
      currentActive = 'fullhd'
      break
    case width >= widescreen:
      currentActive = 'widescreen'
      break
    case width >= desktop:
      currentActive = 'desktop'
      break
    case width >= tablet:
      currentActive = 'tablet'
      break
    default:
      currentActive = 'mobile'
      break
  }

  const transformData = {
    current: currentActive,

    mobile: currentActive === 'mobile',
    tablet: currentActive === 'tablet',
    desktop: currentActive === 'desktop',
    widescreen: currentActive === 'widescreen',
    fullhd: currentActive === 'fullhd',

    width: ~~width,
    height: ~~height
  }

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
