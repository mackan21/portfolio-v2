export interface LocalizedText {
  sv: string
  en: string
}

export interface NavLink {
  label: LocalizedText
  href: string
}

export interface Project {
  code: string
  title: LocalizedText
  description: LocalizedText
  tags: string[]
  href?: string
  image?: string
  selected?: boolean
}

export interface Episode {
  id: string
  number: LocalizedText
  period: LocalizedText
  place: LocalizedText
  description: LocalizedText
  type: 'education' | 'work'
}
