/* eslint-disable no-undef */

const CACHE_VERSION = 1
const CURRENT_CACHES = {
  'read-through': `read-through-cache-v${CACHE_VERSION}`
}

self.addEventListener('load', event => {
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map(key => {
    return CURRENT_CACHES[key]
  })

  event.waitUntil(
    self.caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            return self.caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    self.caches.open(CURRENT_CACHES['read-through']).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) return response
        return self.fetch(event.request.clone()).then(response => {
          if (response.status < 400) {
            cache.put(event.request, response.clone())
          }
          return response
        })
      }).catch(error => {
        throw error
      })
    })
  )
})
