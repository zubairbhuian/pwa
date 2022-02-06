const cachesFolder = 'firest-catch';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
  ];

// install
self.addEventListener('install', e =>{
    // console.log('service worker installed');
    e.waitUntil(
        caches.open(cachesFolder).then( cache =>{
            console.log('caching sell assets');
            cache.addAll(assets);
        })
    )

});
// active
self.addEventListener('activate', e =>{
    console.log('service worker active',e);
});
// fetch
self.addEventListener('fetch', e =>{
    console.log('fetching', e)
})
