if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(new URL('serviceworker.js', import.meta.url))
}