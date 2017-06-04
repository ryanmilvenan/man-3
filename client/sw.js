const REQUIRED_FILES = [
  '/',
  '/index.html',
  '/vendor.bundle.js',
  '/client.bundle.js',
  '/stylesheets/sass-bundle.css',
  '/carnival.png',
  '/manifest.json'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mangrove').then(function(cache) {
      return cache.addAll(REQUIRED_FILES).catch((err) => {
        console.error(`Cache Add All Error: ${err}`);
      });
    })
  )
});;


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('mangrove').then((cache) => {
      if(event.request.referrer === "" || fetchingDependency(event)) {
        return fetchCacheThenRemote(event, cache);
      } else {
        return remoteFetchCacheResult(event, cache);
      }
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

function remoteFetchCacheResult(event, cache) {
  return fetch(event.request).then((response) => {
    if(event.request.method !== "POST") {
      cache.put(event.request, response.clone());
    }
    return response;
  });
}

function fetchCacheThenRemote(event, cache) {
  return cache.match(event.request).then((response) => {
    return response || fetch(event.request).then((response) => {
      cache.put(event.request, response.clone());
      return response;
    });
  })
}

function fetchingDependency(event) {
  const { url } = event.request;
  const reg = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;
  const matches = reg.exec(url);
  if(matches.length > 3) {
    const resource = matches[3];
    if(REQUIRED_FILES.includes(`/${resource}`)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
