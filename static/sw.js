importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/5c4eb97e06a9bd22a9bb.js",
    "revision": "a66a5a735d390ee7827a851595c0984c"
  },
  {
    "url": "/_nuxt/5e8556bc8677f5fbf43e.js",
    "revision": "eb258d4891b44a5043c27a410acd9f93"
  },
  {
    "url": "/_nuxt/6f9b49c77c884ad4c730.js",
    "revision": "01b0c5f007d7d3e7d8ff2e5c8033caf3"
  },
  {
    "url": "/_nuxt/734419facb3ecf40439e.js",
    "revision": "6d2ee86c837b8be27b523e51eb569069"
  },
  {
    "url": "/_nuxt/849ecd738e35ba24b850.js",
    "revision": "fbe82adb75636b3c44c467564628ce09"
  },
  {
    "url": "/_nuxt/92dae1796c885d9562c5.js",
    "revision": "56e30bdcf8fc4ebf7e876427998498d9"
  },
  {
    "url": "/_nuxt/b6ccc181937b78a6085f.js",
    "revision": "14109590081d77f6cd539897ae156627"
  },
  {
    "url": "/_nuxt/bbc37aaf1fce623dd936.js",
    "revision": "bac83bb06d30ed5688c980abc91163ad"
  },
  {
    "url": "/_nuxt/ea0fc6c394cdc749264b.js",
    "revision": "1a3ca8548efdd3eb647cd5789e8587ef"
  },
  {
    "url": "/_nuxt/ee7eca0ccb3727699ef7.js",
    "revision": "d6fc74150672d952676e5db973f482fe"
  },
  {
    "url": "/_nuxt/fddf4fa2ec9b32a09057.js",
    "revision": "495bcaf65201a18a874312e286ec8d5a"
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
