# nuxt-breakpoints

> Resize observer breakpoints with Nuxt.js module.

[![NPM](https://nodei.co/npm/nuxt-breakpoints.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nuxt-breakpoints/)
<a href="https://www.buymeacoffee.com/steven0811" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
[![Codecov](https://codecov.io/gh/steven0811/nuxt-breakpoints/branch/master/graph/badge.svg)](https://codecov.io/gh/steven0811/nuxt-breakpoints)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Package Size](https://img.shields.io/bundlephobia/minzip/nuxt-breakpoints)](https://nodei.co/npm/nuxt-breakpoints/)

## Setup

1. Add `nuxt-breakpoints` dependency to your project

```bash
yarn add nuxt-breakpoints # or npm install nuxt-breakpoints
```

2. Add `nuxt-breakpoints` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt-breakpoints',

    // With options
    ['nuxt-breakpoints', { /* module options */ }]
  ]

  // Another way to use options
  breakpoints: {
    // default options
    tablet: 769,
    desktop: 1024,
    widescreen: 1216,
    fullhd: 1408,
    options: {
      polyfill: true,
      throttle: 200
    }
  }
}
```
## Usage
```js
// components.vue
export default {
  computed: {
    isMobile() {
      return this.$breakpoints.mobile
    },
    current() {
      return this.$breakpoints.current
    }
  }
}
```

## Options
| property   | type                                         | default                           | note                                                                                                                                                                                                                     |
|------------|----------------------------------------------|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| mobile     | none                                         | none                              | < 769px (tablet)                                                                                                                                                                                                         |
| tablet     | number                                       | 769                               | >= 769px (tablet) && <= 1024px (desktop)                                                                                                                                                                                 |
| desktop    | number                                       | 1024                              | >= 1024px (desktop) && <= 1216px (widescreen)                                                                                                                                                                            |
| widescreen | number                                       | 1216                              | >= 1216px (widescreen) && <= 1408px (fullhd)                                                                                                                                                                             |
| fullhd     | number                                       | 1408                              | => 1408px (fullhd)                                                                                                                                                                                                       |
| options    | object <polyfill: boolean, throttle: number> | { polyfill: true, throttle: 200 } | `polyfill` default by true, which means auto-import `resize-observer-polyfill` when the browser doesn't support ResizeObserver more information below, `throttle` will slow down when Window has resizing trigger speed. |

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## Ref
[Nuxt.js](https://nuxtjs.org)

[MDN - ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

[ResizeObserver Polyfill](https://github.com/que-etc/resize-observer-polyfill)

## License

[MIT License](./LICENSE)

Copyright (c) Steven Ho <shockshocksoul@gmail.com>
