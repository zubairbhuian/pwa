// install 
self.addEventListener('install', e =>{
    console.log('Install Successful');
})
// Activate
self.addEventListener('activate', e =>{
    console.log('Activate Successful', e);
});
// eeeee
// Fetch
self.addEventListener('fetch', e =>{
    console.log('Fetch Successful');
});