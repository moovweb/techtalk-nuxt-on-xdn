const { Router } = require('@xdn/core/router')
const { nuxtRoutes } = require('@xdn/nuxt')

const HTML = {
  browser: {
    maxAgeSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
  },
}

const API = {
  browser: {
    serviceWorkerSeconds: 60 * 60,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
  },
}

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .get('/', ({ cache }) => cache(HTML))
  .get('/posts/:id', ({ cache }) => cache(HTML))
  .get('/api/:path*', ({ proxy, cache }) => {
    cache(API)
    proxy('api')
  })
  .use(nuxtRoutes)
