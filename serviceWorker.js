const staticNadiya = "Nadiya-catering-v1";
const asset = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/src/app.js",
  "/img/catering/1.jpg",
  "/img/catering/2.jpg",
  "/img/catering/3.jpg",
  "/img/catering/4.jpg",
  "/img/menu/nasi-bakar.jpg",
  "/img/menu/nasi-campur.jpg",
  "/img/menu/nasi-kuning.jpg",
  "/img/menu/nasi-liwet.jpg",
  "/img/menu1/artwork.png",
  "/img/menu1/feather-sprite.svg",
  "/img/menu1/nadiya.jpeg",
  "/login.html",
  "/register.html",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticNadiya).then((cache) => {
      return cache.addAll(asset);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
