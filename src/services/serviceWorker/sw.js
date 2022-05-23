/* eslint-disable*/
const CACHE_NAME = 'my-site-cache-v1';

const URLS = ['/', '/index.html', '/sw.js'];

self.addEventListener('install', (event) => {
  console.log('install');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('opened cache');
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      }),
  );
});

self.addEventListener('fetch', (event) => {
  console.log('fetch');
  event.respondWith(
    caches.match(event.request).then((response) => {
      console.log('fetch service worker');
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();
      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    }),
  );
});
