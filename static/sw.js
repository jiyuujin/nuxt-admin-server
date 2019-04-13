importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/26e0d1bb4bece9e740aa.js",
    "revision": "a2c4d9fe27d7a0c0450926faab78c033"
  },
  {
    "url": "/_nuxt/38c33def5e92ec01dd63.js",
    "revision": "93ab659b90ae347d65154e0f3f5ef3e0"
  },
  {
    "url": "/_nuxt/3eb6c4056b02604fd2d9.js",
    "revision": "e85b977e84c826114910d9a6b114fac0"
  },
  {
    "url": "/_nuxt/4d98003e96c0be35dbb6.css",
    "revision": "a97236a6c15cc79d77b88f3153ff538e"
  },
  {
    "url": "/_nuxt/5e1f4932a5bf18441345.js",
    "revision": "b26bdeeb237becd2b51b5f95e6d09220"
  },
  {
    "url": "/_nuxt/63349437a87b195cdc74.css",
    "revision": "427d2054815cd29e3d44e1b8f18d40c8"
  },
  {
    "url": "/_nuxt/65eba453c47ead286018.js",
    "revision": "b9469ec03e7303a4c33be568173def30"
  },
  {
    "url": "/_nuxt/665932e0dcafa684fd6e.js",
    "revision": "6b68819e4062289bd6fb0e0fd1a5fc74"
  },
  {
    "url": "/_nuxt/797faafd8b0db4b67e27.css",
    "revision": "f076032209c1d851f6af246a2ddd08f0"
  },
  {
    "url": "/_nuxt/7bbd7098d9758c49a681.js",
    "revision": "8881713b1b18cc43a2e4b4acb95f806d"
  },
  {
    "url": "/_nuxt/a8ae2e58500152425dfc.js",
    "revision": "1a9c6ae9c624f5fbe3df0a2e2f83d796"
  },
  {
    "url": "/_nuxt/ad8a3015f2526cd8af96.css",
    "revision": "dff2c25cfca81c13352f2147ca82017c"
  },
  {
    "url": "/_nuxt/b94eb6dba97d4ebdb051.css",
    "revision": "916cd02aeeb2e360306dd24b67460366"
  },
  {
    "url": "/_nuxt/bb19109e8a7c66a5daaf.js",
    "revision": "876ae84fa98b3a2c2f954169fe5d3fd6"
  },
  {
    "url": "/_nuxt/dcc027114a38f321777b.js",
    "revision": "a6d23364a668ea9b0c54d7ca011cf665"
  },
  {
    "url": "/_nuxt/eba0d983a2dda0e71582.css",
    "revision": "8549196768881dde3c02252670760aa2"
  },
  {
    "url": "/_nuxt/f664be7b79498332ea16.css",
    "revision": "6f0dd130fda8dc16aaecc2787d061690"
  }
], {
  "cacheId": "nuxt-admin-server",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
