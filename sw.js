self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Если файл есть в кэше — отдаем его
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Если нет — идем в интернет
      return fetch(event.request).catch(() => {
        // Если интернета нет и это запрос на открытие страницы
        if (event.request.mode === 'navigate') {
          // Пытаемся отдать сохраненный index.html
          return caches.match('./index.html');
        }
        // Для остальных файлов возвращаем пустой ответ (чтобы не было ошибки)
        return new Response('', { status: 404, statusText: 'Not Found' });
      });
    })
  );
});
