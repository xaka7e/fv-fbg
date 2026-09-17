# FBG Bau — рабочая версия

Текущая версия: **V4.3.22**

Исходник сайта хранится в архиве `FBG-V4.3.22-WORKING-NOINDEX.zip`.

Индексация тестового сайта отключена двумя способами:
- `robots.txt`: `Disallow: /`
- HTTP header: `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`

Vercel автоматически распаковывает архив в `dist` при сборке.
