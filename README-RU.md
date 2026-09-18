# FBG Bau — Production Candidate v3

Diese Version baut auf dem letzten Multipage-Stand auf und übernimmt die zuletzt gemachten Mobile-/Rhythmus-Korrekturen.

## Was geändert wurde

- Originale URL-Struktur von fbg-bau.ch für die wichtigsten Seiten inklusive `/ueber-uns/` beibehalten (`/leistungen/`, `/referenzen/`, `/ueber-uns/team/` usw.).
- Canonical URLs, Open Graph, `de-CH`, strukturierte LocalBusiness/GeneralContractor-Daten, `robots.txt` und `sitemap.xml` ergänzt.
- Öffentliche Prototyp-Hinweise entfernt; leere Team-Bild-`src` entfernt, Initialen bleiben bewusst als Fallback.
- Letzte Mobile-/Abstands-Korrekturen der neuesten `styles.css` in die komplette Multipage-Version übernommen.
- Tastatur-Fokus, Skip-Link und `prefers-reduced-motion` ergänzt.
- Das zuvor mehrfach als Base64 eingebettete 1024×1024-FBG-Zeichen wurde in ein gemeinsames, kompaktes Asset ausgelagert; dadurch sind die HTML-Seiten deutlich kleiner und das Zeichen kann browserseitig gecacht werden.
- Kontakt-, Leistungs-, Referenz-, Team- und Firmengeschichts-Inhalte gegen den aktuellen FBG-Auftritt geprüft (Stand 12.09.2026).
- Sicherheitsheader und Redirects für alte flache Preview-Dateinamen in `vercel.json` ergänzt.
- Einfache lokale Seiten für Impressum/Datenschutz ergänzt, damit beim Domainwechsel keine 404 entstehen.

## Vor dem endgültigen Go-live

1. **Projektbilder:** Die drei grossen Projektkarten auf der Startseite verwenden weiterhin externe Bild-URLs (Vulcano, Westlink, Nidfeld). Vor dem produktiven Launch sollten diese durch FBG-eigene bzw. ausdrücklich freigegebene Originaldateien ersetzt werden.
2. **Teamfotos:** Die vier Bildflächen funktionieren als Initialen-Fallback. Sobald freigegebene Teamfotos vorhanden sind, können sie eingesetzt werden.
3. **Rechtstexte:** Impressum und Datenschutz wurden technisch sauber neu angelegt, sollten aber vor dem produktiven Launch von der Firma bzw. einer zuständigen Fachperson abschliessend geprüft werden — besonders nach Festlegung von Hosting, Analytics und Cookie-Diensten.
4. **SEO-Migration:** Beim Live-Schalten die bestehenden URLs unverändert lassen und keine unnötigen Redirect-Ketten erzeugen. Danach Sitemap in der Google Search Console neu einreichen und 404/Indexierung beobachten.

## Lokaler Test

Im Projektordner z. B. `python -m http.server 8080` starten und `http://localhost:8080/` öffnen. Direktes Öffnen per `file://` ist wegen der Root-URLs nicht der richtige Test.

- Die bisherige Seite `/ref-in-bearbeitung/` wird per 301 auf `/referenzen/` geführt; ihre brauchbaren historischen Projektnamen wurden in das Referenzarchiv übernommen.


## V4 — новые блоки
- интерактивная карта Швейцарии с актуальными проектами;
- блок «So arbeiten wir» (Planung → Schalung → Beton → Ergebnis);
- анимированные ключевые цифры;
- двойной CTA «Projekt / Karriere» на важных страницах;
- фирменная жёлтая микро-анимация перехода между страницами;
- структура под фотоленту настоящих FBG Baustellen подготовлена, но намеренно не публикуется до получения разрешённых оригинальных фото (без стоков).

## V4.2 — финальная шлифовка 13.09.2026

- Основа сохранена без редизайна: это продолжение `fbg-v4-portable-fixed(1)`, а не версия Astra.
- Исправлен реальный horizontal overflow на 320 px.
- Блок вакансий теперь корректно сжимается на самых узких экранах.
- Мобильная DOKA-композиция смещена вправо и больше не пересекает логотип/главный заголовок.
- На пачке H20 надписи DOKA переставлены между стяжками: крайние буквы больше не закрываются вертикальными ремнями.
- Мобильное меню открывается ровно под фактической высотой шапки, а не по жёстко заданному числу; добавлено закрытие по Escape и корректный aria-label.
- Повторно проверены локальные ссылки и JavaScript.
