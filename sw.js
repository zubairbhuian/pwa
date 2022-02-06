// install
self.addEventListener('install', e =>{
    console.log('service worker installed');
});
// active
self.addEventListener('activate', e =>{
    console.log('service worker active',e);
});
// fetce
self.addEventListener('fetch', e =>{
    console.log('fetch');
})
