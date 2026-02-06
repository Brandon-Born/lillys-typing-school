import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { createHandlerBoundToURL } from 'workbox-precaching'

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

const navigationHandler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(navigationHandler, {
  denylist: [/^\/api\//]
})

registerRoute(navigationRoute)
