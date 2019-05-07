/**
 * Here be a service worker. This is where caching, fetch recovery and all sorts
 * of other useful offline tooling will happen.
 */
export class ServiceWorker {
  static register () {
    if ('serviceWorker' in navigator) {
      console.log('Regisering service worker')
      navigator.serviceWorker.register('/src/service-worker.js')
        .then(reg => {
          console.log('Service worker registration succeeded. Scope is ' + reg.scope)
        }).catch(error => {
          console.log('Service worker registration failed with ' + error)
        })
    }
  }
}
