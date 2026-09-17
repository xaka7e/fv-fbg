# FBG Bau — рабочая версия

Текущая версия: **V4.3.22**

Статус: **рабочая версия**.

Исходник V4.3.22 хранится в `pack/` и автоматически восстанавливается в `dist` командой `npm run build`.

Индексация тестового сайта отключена двумя способами:
- `robots.txt`: `Disallow: /`
- HTTP header: `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`

Vercel:
- Build Command: `npm run build`
- Output Directory: `dist`
