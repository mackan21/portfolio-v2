# Marcus Mikko — Portfolio (v2)

Mörk portfolio i en cinematisk streaming-känsla: hero med bakgrundsglow och "play"-knappar,
erfarenhet som en avsnittslista (Avsnitt 01–05), och en "Utvalda projekt"-sektion med tre
kurerade projektkort. Egen färgidentitet (varm marquee-orange, inte Netflix röd/svart) för
att inte kopiera ett annat varumärke.

Vue 3 + TypeScript + Vite. Smooth scroll via Lenis. Typsnitt: Anton (rubriker), IBM Plex
Sans/Mono (brödtext/data). Palett: nästan svart cinema-bakgrund + en varm orange accent.

## Innehåll och funktioner

- **Tvåspråkig** — auto-detect av webbläsarspråk + växlare i navigationen (SV/EN)
- **Utvalda projekt** — tre kurerade projektkort (Socialt nätverk, Notify Studio, CV Forge),
  med länk vidare till GitHub för resten. Statisk 3-kolumnsgrid på desktop, swipeable
  coverflow-karusell på mobil/tablet (<901px)
- **Erfarenhet** som avsnittslista, med en "Ladda ner CV"-knapp kopplad till en riktig PDF
  (byggd i [CV Forge](https://github.com/mackan21/cv-builder), ett av de andra projekten)
- **Kontaktformulär** kopplat till Formspree
- Responsiv ner till mobil, med hamburgermeny under 480px
- Open Graph/Twitter-metataggar för länkförhandsvisningar, egen favicon
- Respekterar `prefers-reduced-motion` genomgående (partikelbakgrund, karusell, reveals)

## Kom igång

```sh
npm install
npm run dev
```

## Bygga för produktion

```sh
npm run build
```

## Deploy

Vercel, kopplat direkt mot detta GitHub-repo (auto-deploy vid push till `main`).

