const CACHE_NAME = 'birthday-cache-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './assets/birthday_cake_1780160233362.png',
    './assets/cat_cake_preloader_1780163227004.png',
    './assets/memory_one_1780160303924.png',
    './assets/memory_three_1780160335503.png',
    './assets/memory_two_1780160318768.png',
    './assets/nami_anime_1780160280133.png',
    './assets/new_cake_gifts_1780161455521.png',
    './assets/party_balloon_1780160247234.png',
    './assets/sanji_anime_1780160262330.png',
    './assets/site_bg_1_1780164153681.png',
    './assets/site_bg_2_1780164167135.png',
    './assets/site_bg_3_1780166265413.png',
    './assets/song.mp3',
    './assets/wavy_birthday_bg_1780163764918.png',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Satisfy&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
