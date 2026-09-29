const CACHE_NAME = 'bisonte-cockpit-v9';
const APP_ASSETS = ['./','./index.html','./manifest.json','./spidey-icon-180-v9.png','./spidey-icon-192-v9.png','./spidey-icon-512-v9.png','./favicon-32-v9.png','./favicon-16-v9.png','./spidey-emblem-64.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener('fetch', event => { if (event.request.method !== 'GET') return; event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => caches.match('./index.html')))); });
