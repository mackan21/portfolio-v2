import type { Episode, NavLink, Project } from '../types/portfolio'

export const navLinks: NavLink[] = [
  { label: { sv: 'om mig', en: 'about' }, href: '#about' },
  { label: { sv: 'stack', en: 'stack' }, href: '#stack' },
  { label: { sv: 'erfarenhet', en: 'experience' }, href: '#episodes' },
  { label: { sv: 'projekt', en: 'projects' }, href: '#work' },
  { label: { sv: 'kontakt', en: 'contact' }, href: '#contact' },
]

export const projects: Project[] = [
  {
    code: 'SN-2025',
    title: { sv: 'Socialt nätverk', en: 'Social Network' },
    description: {
      sv: 'Fullstack socialt nätverk med inloggning, flöde, profiler och sök. Byggt med React 19 och TypeScript i frontend, Express och PostgreSQL i backend, med JWT-autentisering och lösenordshashning via bcrypt. Man kan följa varandra, gilla och kommentera inlägg och söka fram andra profiler i realtid.',
      en: 'Full-stack social network with login, feed, profiles and search. Built with React 19 and TypeScript on the frontend, Express and PostgreSQL on the backend, with JWT authentication and bcrypt password hashing. You can follow other users, like and comment on posts, and search for profiles in real time.',
    },
    tags: ['react', 'typescript', 'postgresql', 'jwt'],
    href: 'https://github.com/mackan21/social-network',
    image: '/screenshots/social-network.webp',
    selected: true,
  },
  {
    code: 'NS-2026',
    title: { sv: 'Notify Studio', en: 'Notify Studio' },
    description: {
      sv: 'Konsol för att komponera och förhandsgranska flerspråkiga notifieringar, e-post och SMS sida vid sida, med en SMS-mätare som räknar segment enligt riktig GSM-7-logik. Byggt i Vue 3, TypeScript och Pinia. Fem färdiga malltyper (välkomstmejl, orderbekräftelse, lösenordsåterställning med mera) med variabelsubstitution och liveuppdatering medan man skriver.',
      en: 'A console for composing and previewing multilingual notifications, email and SMS side by side, with an SMS meter that counts segments using real GSM-7 logic. Built with Vue 3, TypeScript and Pinia. Five ready made template types (welcome email, order confirmation, password reset and more) with variable substitution and live updates as you type.',
    },
    tags: ['vue', 'typescript', 'pinia', 'i18n'],
    href: 'https://github.com/mackan21/notify-studio',
    image: '/screenshots/notify-studio.webp',
    selected: true,
  },
  {
    code: 'CV-2026',
    title: { sv: 'CV Forge', en: 'CV Forge' },
    description: {
      sv: 'Bygg ett CV sektion för sektion och se det ta form live på en riktig sida, exportera direkt till PDF. Mörk teknisk ritbordsyta runt en vit, utskriftsklar sida. Byggt i React, TypeScript och Zustand. Lägg till hur många erfarenheter och utbildningar du vill, allt sparas automatiskt lokalt så du aldrig tappar ditt arbete.',
      en: 'Build a resume section by section and watch it take shape live on a real page, then export straight to PDF. A dark, technical drafting desk around a real, print ready white page. Built with React, TypeScript and Zustand. Add as many experience and education entries as you want, everything autosaves locally so you never lose your work.',
    },
    tags: ['react', 'typescript', 'zustand', 'pdf'],
    href: 'https://github.com/mackan21/cv-builder',
    image: '/screenshots/cv-builder.webp',
    selected: true,
  },
  {
    code: 'DS-2025',
    title: { sv: 'Dream Shoes', en: 'Dream Shoes' },
    description: {
      sv: 'E-handelssajt för sneakers byggd i Vue 3. Kategorivyer för herr-, barn- och alla skor, state-hantering med Pinia, routing med Vue Router.',
      en: 'Sneaker e-commerce site built in Vue 3. Category views for men, kids and all shoes, state management with Pinia, routing with Vue Router.',
    },
    tags: ['vue', 'pinia', 'ecommerce'],
    href: 'https://github.com/mackan21/dream-shoes',
    image: '/screenshots/dream-shoes.webp',
    selected: false,
  },
  {
    code: 'WX-2025',
    title: { sv: 'Weather App', en: 'Weather App' },
    description: {
      sv: 'Väderapp i Vue 3 som hämtar prognoser via ett väder-API med Axios. Sökbar, med dagsprognos och en detaljerad vy per plats, state hanterat med Pinia.',
      en: 'Weather app in Vue 3 that fetches forecasts from a weather API with Axios. Searchable, with a daily forecast and a detailed view per location, state handled with Pinia.',
    },
    tags: ['vue', 'axios', 'api'],
    href: 'https://github.com/mackan21/weather-app',
    image: '/screenshots/weather-app.webp',
    selected: false,
  },
  {
    code: 'LB2-2024',
    title: { sv: 'API-labb', en: 'API Lab' },
    description: {
      sv: 'Skolprojekt i ren JavaScript, HTML och CSS: hämtar och visualiserar data dynamiskt från ett publikt API, med formulär kopplat till POST- och DELETE-anrop.',
      en: 'School project in plain JavaScript, HTML and CSS: fetches and dynamically visualizes data from a public API, with a form wired to POST and DELETE requests.',
    },
    tags: ['javascript', 'api', 'dom'],
    href: 'https://github.com/RichardITHS/laboration-2-mackan21',
    image: '/screenshots/lab2.webp',
    selected: false,
  },
]

export const episodes: Episode[] = [
  {
    id: 'gymnasiet',
    number: { sv: 'AVSNITT 01', en: 'EPISODE 01' },
    period: { sv: '2016 — 2019', en: '2016 — 2019' },
    place: { sv: 'Bromma Gymnasium, Stockholm', en: 'Bromma Gymnasium, Stockholm' },
    description: {
      sv: 'Teknikprogrammet, inriktning Design & Produktutveckling.',
      en: 'Technology programme, specializing in Design & Product Development.',
    },
    type: 'education',
  },
  {
    id: 'iths',
    number: { sv: 'AVSNITT 02', en: 'EPISODE 02' },
    period: { sv: '2024 — 2026', en: '2024 — 2026' },
    place: { sv: 'IT-Högskolan, Stockholm', en: 'IT-Högskolan, Stockholm' },
    description: {
      sv: 'Yrkesutbildning till frontendutvecklare: HTML/CSS, JavaScript, TypeScript, ramverk, UX/UI och agil utveckling.',
      en: 'Vocational training as a frontend developer: HTML/CSS, JavaScript, TypeScript, frameworks, UX/UI and agile development.',
    },
    type: 'education',
  },
  {
    id: 'postnord-1',
    number: { sv: 'AVSNITT 03', en: 'EPISODE 03' },
    period: { sv: 'aug 2025 — okt 2025', en: 'Aug 2025 — Oct 2025' },
    place: { sv: 'Postnord — Frontendutvecklare (praktik)', en: 'PostNord — Frontend Developer (Internship)' },
    description: {
      sv: 'Första praktikperioden. Byggde vyer för spårning och hantering av försändelser i Vue, TypeScript och SCSS.',
      en: 'First internship period. Built views for tracking and managing shipments in Vue, TypeScript and SCSS.',
    },
    type: 'work',
  },
  {
    id: 'postnord-2',
    number: { sv: 'AVSNITT 04', en: 'EPISODE 04' },
    period: { sv: 'jan 2026 — jun 2026', en: 'Jan 2026 — Jun 2026' },
    place: { sv: 'Postnord — Frontendutvecklare (praktik)', en: 'PostNord — Frontend Developer (Internship)' },
    description: {
      sv: 'Andra praktikperioden. Vidareutvecklade Postnord Business Portal i nära samarbete med design- och utvecklingsteamet.',
      en: 'Second internship period. Further developed the PostNord Business Portal in close collaboration with the design and development team.',
    },
    type: 'work',
  },
  {
    id: 'willys',
    number: { sv: 'AVSNITT 05', en: 'EPISODE 05' },
    period: { sv: '2026 —', en: '2026 —' },
    place: { sv: 'Willys', en: 'Willys' },
    description: {
      sv: 'Jobbar deltid medan jag söker mitt första jobb som frontendutvecklare.',
      en: 'Working part-time while looking for my first job as a frontend developer.',
    },
    type: 'work',
  },
]

export const contactEmail = 'marcusmikko@gmail.com'

export const contactLinks = [
  { label: 'linkedin.com/in/marcusmikko', href: 'https://linkedin.com/in/marcusmikko' },
  { label: 'github.com/mackan21', href: 'https://github.com/mackan21' },
]
