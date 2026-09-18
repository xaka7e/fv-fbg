# FBG V4.3.11 — Mobile final timing & scene spacing

Проверено после точечных правок mobile hero.

## Изменения
- FERTIG начинает появляться при progress ≈ 0.86, до исчезновения левого story-текста.
- Левый story-текст, scroll hint и нижний step UI больше не скрываются только из-за финального состояния.
- FERTIG возвращён вправо в исходную композицию.
- Лестница сдвинута к правому краю.
- DOKA 700 отделена от оси лестницы.
- H20 4.90 поднята/сдвинута влево-вверх и больше не зажата между стойкой и лестницей.

## QA
Проверено визуально в Chromium mobile viewport:
- 320 × 844: start / FERTIG entry / step 05
- 390 × 844: start / FERTIG entry / step 05
- 430 × 844: start / FERTIG entry / step 05

Результат:
- horizontal overflow: 0 px на 320 / 390 / 430;
- FERTIG виден справа одновременно с текстом слева;
- DOKA 700, H20 4.90 и лестница имеют раздельные оси;
- step 05 и Daumen hoch сохраняются;
- desktop-логика не изменялась (правки layout ограничены max-width:760px).
- script.js проходит syntax check;
- отсутствующих локальных ссылок/файлов: 0.
