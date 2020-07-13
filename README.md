# nuxt-breakpoints

> Resize observer breakpoints with Nuxt.js module. Bulma edition

## Setup

1. Add `nuxt-bulma-breakpoints` dependency to your project

```bash
yarn add nuxt-bulma-breakpoints # or npm install nuxt-breakpoints
```

2. Add `nuxt-bulma-breakpoints` to the `modules` section of `nuxt.config.js`

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
