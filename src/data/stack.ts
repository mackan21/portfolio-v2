import {
  siCss,
  siExpress,
  siFigma,
  siGit,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siSass,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  siWordpress,
} from 'simple-icons'

export interface StackItem {
  name: string
  path?: string
  hex: string
}

export interface StackCategory {
  label: { sv: string; en: string }
  items: StackItem[]
}

function item(name: string, icon: { path: string; hex: string }): StackItem {
  return { name, path: icon.path, hex: icon.hex }
}

export const stack: StackCategory[] = [
  {
    label: { sv: 'Frontend', en: 'Frontend' },
    items: [
      item('HTML', siHtml5),
      item('CSS', siCss),
      item('JavaScript', siJavascript),
      item('TypeScript', siTypescript),
      item('Vue.js', siVuedotjs),
      item('React', siReact),
      item('Next.js', siNextdotjs),
      item('Tailwind CSS', siTailwindcss),
      item('Sass', siSass),
    ],
  },
  {
    label: { sv: 'Backend', en: 'Backend' },
    items: [item('Node.js', siNodedotjs), item('Express', siExpress), item('PHP', siPhp)],
  },
  {
    label: { sv: 'Databas', en: 'Database' },
    items: [item('PostgreSQL', siPostgresql), item('MySQL', siMysql), item('MongoDB', siMongodb)],
  },
  {
    label: { sv: 'Verktyg', en: 'Tools' },
    items: [
      item('Git', siGit),
      item('Figma', siFigma),
      item('WordPress', siWordpress),
      // AWS has no logo in simple-icons (Amazon does not permit third-party
      // redistribution of its mark) — rendered as a text badge instead, see TechBadge.vue.
      { name: 'AWS', hex: 'FF9900' },
    ],
  },
]
