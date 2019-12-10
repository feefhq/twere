/**
 * Here be a service worker. This is where caching, fetch recovery and all sorts
 * of other useful offline tooling will happen.
 */
export class ServiceWorker {
  static register (url) {
    if ('serviceWorker' in navigator) {
      console.debug('Regisering service worker', Date.now())
      return navigator.serviceWorker
        .register(url)
        .then(reg => {
          console.debug(
            'Service worker registration succeeded. Scope is ' + reg.scope
          )
        })
        .catch(error => {
          console.log('Service worker registration failed with ' + error)
        })
    }
  }
}
