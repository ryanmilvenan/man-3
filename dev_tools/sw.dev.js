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
  var response;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).then((r) => {
      console.log("EVENT", event.request.url);
      console.log("RESPONSE", r);
      response = r;
      caches.open('mangrove').then((cache) => {
        cache.put(event.request, response);
      })
      return response.clone();
    })
  );
});