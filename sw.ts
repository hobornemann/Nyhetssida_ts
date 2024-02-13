//@ts-nocheck

const CACHE_NAME = 'my-vite-app-cache';  
const urlsToCache = [
    'index.html'
];

self.addEventListener('install', function(event){
    console.log("Service worker is installed.");
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log("Service worker is caching files");
            /* return */ cache.addAll(urlsToCache);
        })
    );
});



self.addEventListener('activate', function(event){
    console.log("Service worker is activated.");
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', function(event){
    console.log("Service worker is fetching.");
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    );
});

