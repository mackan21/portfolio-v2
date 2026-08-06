<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { navLinks } from '../data/portfolio'
import { lang, toggleLang } from '../composables/useLang'

const scrolled = ref(false)
const menuOpen = ref(false)
const activeHref = ref('')

let sectionObserver: IntersectionObserver | undefined

function onScroll() {
  scrolled.value = window.scrollY > 40
}

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

function setupSectionObserver() {
  const sections = navLinks
    .map((link) => document.querySelector<HTMLElement>(link.href))
    .filter((el): el is HTMLElement => !!el)

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeHref.value = `#${entry.target.id}`
      })
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  )

  sections.forEach((section) => sectionObserver?.observe(section))
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  setupSectionObserver()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  sectionObserver?.disconnect()
})
</script>

<template>
  <nav class="app-nav" :class="{ scrolled }">
    <div class="logo">marcus<span class="dot">.</span>dev</div>
    <div class="right">
      <div class="links">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :class="{ active: activeHref === link.href }"
          >{{ link.label[lang] }}</a
        >
      </div>
      <button
        type="button"
        class="lang-toggle"
        @click="toggleLang"
        :aria-label="lang === 'sv' ? 'Switch to English' : 'Byt till svenska'"
      >
        {{ lang === 'sv' ? 'EN' : 'SV' }}
      </button>
      <button
        type="button"
        class="menu-toggle"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? (lang === 'sv' ? 'Stäng meny' : 'Close menu') : (lang === 'sv' ? 'Öppna meny' : 'Open menu')"
        @click="menuOpen = !menuOpen"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen" class="mobile-menu">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :class="{ active: activeHref === link.href }"
          @click="closeMenu"
          >{{ link.label[lang] }}</a
        >
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 48px;
  background: linear-gradient(color-mix(in oklch, var(--bg) 75%, transparent), transparent);
  transition: background 0.3s ease;
}

.app-nav.scrolled {
  background: color-mix(in oklch, var(--bg) 92%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}

.logo {
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: 0.01em;
  color: var(--ink);
}

.dot {
  color: var(--accent);
}

.right {
  display: flex;
  align-items: center;
  gap: 22px;
}

.links {
  display: flex;
  gap: 28px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  letter-spacing: 0.03em;
}

.links a {
  position: relative;
  color: var(--ink-muted);
  transition: color 0.2s;
}

.links a:hover {
  color: var(--accent);
}

.links a.active {
  color: var(--ink);
}

.links a.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}

.lang-toggle {
  background: color-mix(in oklch, var(--accent) 12%, transparent);
  border: 1.5px solid var(--accent);
  border-radius: 999px;
  padding: 5px 13px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s,
    transform 0.2s;
}

.lang-toggle:hover {
  color: var(--bg);
  background: var(--accent);
  transform: translateY(-1px);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 30px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-toggle .bar {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--ink);
  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}

.menu-toggle[aria-expanded='true'] .bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle[aria-expanded='true'] .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle[aria-expanded='true'] .bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 4px 20px 20px;
  background: color-mix(in oklch, var(--bg) 96%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 15px;
}

.mobile-menu a {
  padding: 14px 0;
  color: var(--ink-muted);
  border-bottom: 1px solid var(--border);
}

.mobile-menu a.active {
  color: var(--accent);
}

.mobile-menu a:last-child {
  border-bottom: none;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .lang-toggle:hover {
    transform: none;
  }

  .menu-toggle .bar {
    transition: none;
  }

  .menu-enter-active,
  .menu-leave-active {
    transition: none;
  }
}

@media (max-width: 900px) {
  .app-nav {
    padding: 18px 24px;
  }

  .links {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}

@media (max-width: 480px) {
  .app-nav {
    padding: 16px 20px;
  }
}
</style>
