const CACHE_NAME = 'chat-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/app.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
