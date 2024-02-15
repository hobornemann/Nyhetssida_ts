
const CACHE_NAME: string = 'my-vite-app-cache';  
const urlsToCache: string[] = [
    'index.html'
];



self.addEventListener('install', function(event: ExtendableEvent){
    console.log("Service worker is installed.");
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log("Service worker is caching files");
            /* return */ cache.addAll(urlsToCache);     //    
        })
    );
});



self.addEventListener('activate', function(event: ExtendableEvent){
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


self.addEventListener('fetch', function(event: FetchEvent){
    console.log("Service worker is fetching.");
    try{
        event.respondWith(
            caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }
                return fetch(event.request);
            })
        );
    }
    catch(error){
        console.log("Service Worker: Error when fetching.")
    }
});

