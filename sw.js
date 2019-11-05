/* eslint-disable no-undef */

/**
 * The Service Worker needs to live in the root of the application, so that scope covers
 * the entire app. Still need to find a good way to do unit tests.
 */

const CACHE_VERSION = 1
const CURRENT_CACHES = {
  'read-through': `read-through-cache-v${CACHE_VERSION}`
}

/**
 * Install event occurs if the service worker is considered to be new by the browser,
 * either because the site currently doesn't have a registered service worker, or
 * because there is a byte difference between the new service worker and the previously
 * installed one.
 *
 * This is where we should do pre-caching for instant reload.
 */
self.addEventListener('install', event => {
  console.debug('Service worker installed')

  const expectedCacheNames = Object.keys(CURRENT_CACHES).map(
    key => CURRENT_CACHES[key]
  )

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

/**
 * Fetch event
 */
self.addEventListener('fetch', event => {
  console.debug('Service worker fetch')
  event.respondWith(
    self.caches.open(CURRENT_CACHES['read-through']).then(cache => {
      return cache
        .match(event.request)
        .then(response => {
          if (response) return response
          return self.fetch(event.request.clone()).then(response => {
            if (response.status < 400) {
              cache.put(event.request, response.clone())
            }
            return response
          })
        })
        .catch(error => {
          throw error
        })
    })
  )
})
