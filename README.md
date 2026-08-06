# Marcus Mikko — Portfolio (v2)

Mörk portfolio i en cinematisk streaming-känsla: hero med bakgrundsglow och "play"-knappar,
erfarenhet som en avsnittslista (Avsnitt 01–05), projekt som en horisontellt scrollbar
"poster"-rad med hover-förstoring. Egen färgidentitet (varm marquee-orange, inte Netflix
röd/svart) för att inte kopiera ett annat varumärke.

Vue 3 + TypeScript + Vite. Smooth scroll via Lenis. Typsnitt: Anton (rubriker), IBM Plex
Sans/Mono (brödtext/data). Palett: nästan svart cinema-bakgrund + en varm orange accent.

## Kom igång

```sh
npm install
npm run dev
```

## Innan den går live

- "Ladda ner CV"-länken i `EpisodesSection.vue` pekar ingenstans än.
- Deploy (Netlify/Vercel) — görs när innehållet är klart.

Klart: kontaktformuläret postar till Formspree, GitHub- och LinkedIn-länkarna i
`src/data/portfolio.ts` (`contactLinks`) är båda verifierade mot de riktiga profilerna.

## Bygga för produktion

```sh
npm run build
```
