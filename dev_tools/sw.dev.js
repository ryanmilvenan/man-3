self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('mangrove').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/client.bundle.js',
      ]).catch((err) => {
        console.error(`Cache Add All Error: ${err}`);
      });
    })
  )
});;

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log("RESPONSE", response)
      return response || fetch(event.request);
    })
  );
});