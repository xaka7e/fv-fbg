# FBG BAU — V4.3 Mobile Scroll Fix

## Что исправлено
- Mobile scroll progress теперь рассчитывается через `visualViewport.height` с fallback на `innerHeight`.
- Добавлены обновления сцены на `scroll`, `resize`, `orientationchange`, `pageshow`, `load` и `visualViewport` resize/scroll.
- Обновления объединены через `requestAnimationFrame`, чтобы не перегружать мобильный браузер.
- Исправлен баг первого mobile-этапа: раньше `01` мог оставаться desktop-текстом, потому что stage уже считался активным.
- При смене desktop/mobile режима текст текущего этапа теперь переинициализируется.
- `prefers-reduced-motion` больше не ломает scroll-story: прогресс, позиция рабочего, этапы и FERTIG продолжают работать; декоративная ходьба упрощается.
- Sticky-stage на mobile использует `100vh` → `100svh` → `100dvh` fallback chain.
- У sticky-сцены нет отдельного vertical scroll container.

## Автоматическая проверка
Проверено с touch/mobile emulation:
- 320×740
- 360×800
- 375×812
- 390×844
- 393×852
- 414×896
- 430×932

На каждом размере проверены точки scroll progress 0%, 20%, 45%, 75%, 95%, 100%.

Проверено:
- mobile worker transform меняется по мере прокрутки;
- этапы 01 / 02 / 03 / 04 / 05 синхронизированы с progress;
- mobile copy: EINSTIEG / TEAM / SCHALUNG / ERFAHRUNG / FERTIG;
- FERTIG появляется после 92%;
- sticky stage остаётся закреплённым;
- horizontal overflow = 0;
- JavaScript errors = 0;
- reduced-motion режим сохраняет работоспособность story;
- resize + pageshow не ломают сцену;
- desktop 1440 px smoke-test после изменений пройден.

Примечание: автоматический прогон выполнен в Chromium с mobile/touch emulation. Правки специально используют стандартные `visualViewport`, `svh/dvh` и sticky-паттерны, рассчитанные также на современные iOS Safari.
