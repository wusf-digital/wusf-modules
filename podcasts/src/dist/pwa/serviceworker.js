addEventListener('install', (e)=>{
    e.waitUntil(caches.open('static').then((cache)=>{
        console.log(cache);
        return cache.addAll([
            '../episodes-all.html',
            '../images/logo192.png'
        ]).catch((error)=>console.log(error)
        );
    }));
});

//# sourceMappingURL=serviceworker.js.map
