self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mangrove').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/vendor.bundle.js',
        '/client.bundle.js',
        '/stylesheets/sass-bundle.css',
        '/carnival.png',
        '/manifest.json'
      ]).catch((err) => {
        console.error(`Cache Add All Error: ${err}`);
      });
    })
  )
});;


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('mangrove').then((cache) => {
      return fetch(event.request).then((response) => {
        if(event.request.method !== "POST") {
          cache.put(event.request, response.clone());
        }
        return response;
      });
    })
  );
});