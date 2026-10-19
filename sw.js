const CACHE_NAME = 'mydramadiary-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();

      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('mydramadiary-') &&
                           key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })()
  );
});
