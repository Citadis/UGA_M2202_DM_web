var cacheName = "Cit&GO!-V0.2";
var contentToCache = [
    "/",
    "/index.html",
    "/contact.html",
    "/matos.html",
    "/fake.html",
    "/js/generic.js",
    "/js/contact.js",
    "/css/generic.css",
    "/css/contact.css",
    "/css/index.css",
    "/css/matos.css",
    "/img/fav.ico",
    "/img/BB22200_&_Corail.png",
    "/img/BB26000_&_Corail.png",
    "/img/BB26000V2N_&_V2N.png",
    "/img/CC40100_&_Dosto.png",
    // "https://i.postimg.cc/2S8BqJYG/Gif-Cit-Go-rame-d-mo.gif"
];
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Installation');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
        console.log('[Service Worker] Mise en cache globale: app shell et contenu');
        return cache.addAll(contentToCache);
      })
    );
  });

  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Récupération de la ressource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Mise en cache de la nouvelle ressource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });
  self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Ressource récupérée '+e.request.url);
});
  