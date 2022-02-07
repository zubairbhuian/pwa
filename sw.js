const staticCacheName = "cache-v1";
const dynamicCacheName = 'cache-v2';

const assets = [
  "/",
  "/index.html",
  "/assets/bootstrap/css/bootstrap.min.css",
  "/assets/bootstrap/js/bootstrap.min.js",
  "/assets/css/vanilla-zoom.min.css",
  "/assets/js/app.js",
  "/assets/js/theme.js",
  "/assets/js/vanilla-zoom.js",
  "/assets/img/tech/image4.jpg",
  "/assets/img/scenery/image5.jpg",
  "/assets/img/avatars/avatar1.jpg",
  "/assets/img/avatars/avatar2.jpg",
  "/assets/img/avatars/avatar3.jpg",
  "https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i,600,600i",
  "https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.css",
  'https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css',
  '/fallback.html',
  '/assets/img/err/err-404.jpg'
];


// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};




// install
self.addEventListener("install", (e) => {
  // console.log('Install Successful');
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});
// demo sdjk
// Activate
self.addEventListener("activate", (e) => {
  // console.log("Activate Successful", e);
  e.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch 
self.addEventListener('fetch', e => {
  //console.log('fetch event', e);
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(e.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCacheName, 6);
          return fetchRes;
        })
      });
    }).catch(() => {
      if(e.request.url.indexOf('.html') > -1){
        return caches.match('/fallback.html');
      } 
    })
  );
});