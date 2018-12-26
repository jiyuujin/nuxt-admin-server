importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/04a0588315951fe6d12a.js",
    "revision": "bff2a64c90c757237e911922479767bc"
  },
  {
    "url": "/_nuxt/0669efbab022544b3c84.js",
    "revision": "03fd21f8f59dd8df8cb42068bff92670"
  },
  {
    "url": "/_nuxt/0c91612fed0d07d6ef29.js",
    "revision": "a327083b77ce8d58850ab1c8569f6ee3"
  },
  {
    "url": "/_nuxt/57d743b72ee238505e41.js",
    "revision": "3bdc90d98411a87ff493d36d6cd97db6"
  },
  {
    "url": "/_nuxt/598878deba2f31978d82.js",
    "revision": "2148e8586dcb27755ec23a46742a7575"
  },
  {
    "url": "/_nuxt/63487a8e3ff207f04baf.js",
    "revision": "3519095c4aaccb9c6dfef66545333450"
  },
  {
    "url": "/_nuxt/a28fb844e23ab82f15cd.js",
    "revision": "071453ae01847181edaae16d514ab2d3"
  },
  {
    "url": "/_nuxt/b4388b3bdb53adb38f8f.js",
    "revision": "f870b3f58d7bcea27c59c3adf821998c"
  },
  {
    "url": "/_nuxt/b5d49f9c6b48b60ce7be.js",
    "revision": "0ad1c357d0e4b2563fafa83674e31e12"
  },
  {
    "url": "/_nuxt/c2190fb8d00a97e6b400.js",
    "revision": "d82cfe68f698fb19d40778a0c5f20dd1"
  },
  {
    "url": "/_nuxt/e4a9a45a5cd598815de0.js",
    "revision": "66a1d69e24bc06fb9f7c8a4a42e39ac5"
  },
  {
    "url": "/_nuxt/f1a216ae0e03f36543df.js",
    "revision": "3fb5025378bb5462533fb934a0ef70b5"
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
