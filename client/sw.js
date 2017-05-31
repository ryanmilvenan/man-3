self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mangrove').then(function(cache) {
      return cache.addAll([
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

self.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).then((r) => {
      response = r;
      caches.open('mangrove').then((cache) => {
        cache.put(event.request, response);
      })
      return response.clone();
    })
  );
});