//@ts-nocheck

const CACHE_NAME = 'my-vite-app-cache';
const CACHE_VERSION = 'v1';
const CACHE_KEY = `${CACHE_NAME}-${CACHE_VERSION}`;

const cacheUrls = ['/'];

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log("Service Worker installed");
  event.waitUntil(
    caches.open(CACHE_KEY).then((cache) => {
      return cache.addAll(cacheUrls);
    })
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log("Service Worker activated");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_KEY) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  console.log("Service worker is fetching");
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});