const staticcacheName = "cache-v2";

const assets = [
  "/",
  "/index.html",
  "/assets/bootstrap/css/bootstrap.min.css",
  "/assets/bootstrap/js/bootstrap.min.js",
  "/assets/css/vanilla-zoom.min.css",
  "/assets/js/app.js",
  "/assets/js/theme.js",
  "/assets/js/vanilla-zoom.js",
  "/assets/fonts/Simple-Line-Icons.woff2",
  "/assets/fonts/Simple-Line-Icons.ttf",
  "/assets/fonts/Simple-Line-Icons.woff",
  "/assets/fonts/simple-line-icons.min.css",
  "/assets/img/tech/image4.jpg",
  "/assets/img/scenery/image5.jpg",
  "/assets/img/avatars/avatar1.jpg",
  "/assets/img/avatars/avatar2.jpg",
  "/assets/img/avatars/avatar3.jpg",
  "https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i,600,600i",
  "https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.css",
  'https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.js',
];
// install
self.addEventListener("install", (e) => {
  // console.log('Install Successful');
  e.waitUntil(
    caches.open(staticcacheName).then((catche) => {
      catche.addAll(assets);
    })
  );
});
// demo ssdsfsfd sfggd
// Activate
self.addEventListener("activate", (e) => {
  console.log("Activate Successful", e);
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch 
self.addEventListener("fetch", (e) => {
//   console.log("Fetch Successful");
e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});
// end bhljk