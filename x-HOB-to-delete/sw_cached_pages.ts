//@ts-nocheck

//const CACHE_NAME = 'my-vite-app-cache';

//const myCacheName = 'v1';

//const CACHE_VERSION = 'v1';
//const CACHE_KEY = `${cache_NAME}-${CACHE_VERSION}`;
//const cacheUrls = ['/'];

/* // Call install event
self.addEventListener('install', (event) =>{        // self = service-worker
    console.log("Service Worker installed");
});


// Call activate event
self.addEventListener('activate', event =>{
    console.log("Service Worker activated");
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== myCacheName) {
                        console.log("Service worker clearing/deleting old cache")
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', event => {
    console.log("Service worker is fetching");
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Make a copy/clone of the response
                const responseClone = response.clone();
                // Open cache
                caches
                    .open(myCacheName).then(cache => {
                        // Add response to cache
                        cache.put(event.request, responseClone);
                    });
                return response;
            }).catch(error => caches.match(event.request).then(response => response))
    );
});



 */

