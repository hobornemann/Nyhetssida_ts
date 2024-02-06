//@ts-nocheck

const CACHE_NAME = 'my-vite-app-cache';  //  'my-cache-v1';
const urlsToCache = [
    '/',
    '/style/article.css',
    '/style/media-queries.css',
    '/style/pages.css',
    '/style/style.css',
    '/types/article.d.ts',
    '/types/index.d.ts',
    '/modules/favourites.ts',
    '/modules/localStorage.ts',
    '/modules/model.ts',
    '/modules/render-news.ts',
    '/svg-icon/account-svgrepo-com.svg',
    'svg-icon/american-football-svgrepo-com.svg',
    'svg-icon/arrow-down-circle-svgrepo-com.svg',
    'svg-icon/calender-svgrepo-com.svg',
    'svg-icon/chevron-left-svgrepo-com.svg',
    'svg-icon/favourite-star-black-svgrepo-com.svg',
    'svg-icon/favourite-star-red-svgrepo-com.svg',
    'svg-icon/favourite-star-svgrepo-com.svg',
    'svg-icon/menu-svgrepo-com.svg',
    'svg-icon/news-svgrepo-com.svg',
    'svg-icon/search-svgrepo-com (1).svg',
    'vite-env-d.ts',
    'index.html',
    'package-lock.json',
    'package.json',
    'tsconfig.json'
];

self.addEventListener('install', function(event){
    console.log("Service worker is installed.");
    event.waitUntil(
        cashes.open(CACHE_NAME)
        .then(function(cache){
            return cache.addAll(urlsToCache);
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



