addEventListener('install', (e)=>{
    e.waitUntil(caches.open('static').then((cache)=>{
        return cache.addAll([
            '/episodes-all.html', 
        ]).catch((error)=>console.log(error)
        );
    }));
});
addEventListener('fetch', (e)=>{
    e.respondWith(caches.match(e.request).then((response)=>{
        return response || fetch(e.request);
    }));
});

//# sourceMappingURL=serviceworker.js.map
