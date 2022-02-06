const staticCatchName = "firest-catch";
const dynamicCacheName = "firest-catch-v1";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://fonts.gstatic.com/s/materialicons/v121/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "/pages/fallback.html",
];

// catch size
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install
self.addEventListener("install", (e) => {
  // console.log('service worker installed');
  e.waitUntil(
    caches.open(staticCatchName).then((cache) => {
      console.log("caching sell assets");
      cache.addAll(assets);
    })
  );
});
// active
self.addEventListener("activate", (e) => {
  // console.log('service worker active',e);
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCatchName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// fetch xx
self.addEventListener("fetch", (e) => {
  // console.log('fetching', e)
  e.respondWith(
    caches
      .match(e.request)
      .then((catchRes) => {
        return (
          catchRes ||
          fetch(e.request).then((fetchRec) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(e.request.url, fetchRec.clone());
              limitCacheSize(dynamicCacheName, 15);
              return fetchRec;
            });
          })
        );
      })
      .catch(() => {
        if (e.request.url.indexOf(".html") > -1) {
          return caches.match("/pages/fallback.html");
        }
      })
  );
});
