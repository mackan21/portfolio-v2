<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { lang } from '../composables/useLang'

// Plays immediately on mount rather than waiting for the boot loader to
// finish: the boot loader already covers the screen while it runs, so the
// hero paints (and satisfies LCP) while still hidden behind it, with no
// visible difference once the boot loader fades out.
const revealed = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    revealed.value = true
  })
})

const copy = {
  sv: {
    badge: 'Tillgänglig nu',
    role: 'Frontendutvecklare',
    synopsis: 'Hej! Jag heter Marcus, en kreativ frontendutvecklare som bygger snabba, skalbara och responsiva webblösningar.',
    play: 'Se projekt',
    info: 'Mer info',
  },
  en: {
    badge: 'Available now',
    role: 'Frontend Developer',
    synopsis: "Hi! I'm Marcus, a creative frontend developer building high-performance, scalable and responsive web solutions.",
    play: 'View projects',
    info: 'More info',
  },
}

const t = computed(() => copy[lang.value])
</script>

<template>
  <section id="hero" class="hero">
    <div class="backdrop"></div>
    <div class="scrim"></div>

    <div class="content" :class="{ revealed }">
      <div class="badge">
        <span class="status-dot"></span>
        {{ t.badge }}
      </div>
      <h1>Marcus Mikko</h1>
      <div class="meta">
        <span>2026</span>
        <span class="sep">·</span>
        <span>{{ t.role }}</span>
        <span class="sep">·</span>
        <span>Stockholm</span>
      </div>
      <p class="synopsis">
        {{ t.synopsis }}
      </p>
      <div class="cta">
        <a href="#work" class="button button-play">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l10-5.5z" /></svg>
          {{ t.play }}
        </a>
        <a href="#about" class="button button-info">{{ t.info }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.backdrop {
  position: absolute;
  inset: -5%;
  background:
    radial-gradient(ellipse 60% 50% at 80% 20%, color-mix(in oklch, var(--accent) 22%, transparent), transparent),
    radial-gradient(ellipse 50% 60% at 15% 70%, color-mix(in oklch, var(--accent) 10%, transparent), transparent);
  animation: drift 24s ease-in-out infinite alternate;
}

@keyframes drift {
  to {
    transform: scale(1.08) translate(-1%, -1%);
  }
}

.scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, color-mix(in oklch, var(--bg) 40%, transparent) 55%, var(--bg) 92%);
}

.content {
  position: relative;
  z-index: 1;
  padding: 48px;
  max-width: 760px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 96px;
}

.content > * {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.content.revealed > * {
  opacity: 1;
  transform: none;
}

.content.revealed .badge {
  transition-delay: 0.05s;
}

.content.revealed h1 {
  transition-delay: 0.15s;
}

.content.revealed .meta {
  transition-delay: 0.28s;
}

.content.revealed .synopsis {
  transition-delay: 0.38s;
}

.content.revealed .cta {
  transition-delay: 0.48s;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  padding: 6px 14px;
  margin-bottom: 20px;
}

.status-dot {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.status-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

h1 {
  font-family: var(--font-display);
  font-size: 88px;
  line-height: 0.92;
  letter-spacing: 0.01em;
  margin: 0 0 18px 0;
  color: var(--ink);
  text-transform: uppercase;
}

.meta {
  display: flex;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink-muted);
  margin-bottom: 22px;
}

.sep {
  color: var(--border-strong);
}

.synopsis {
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-muted);
  max-width: 520px;
  margin: 0 0 32px 0;
}

.cta {
  display: flex;
  gap: 14px;
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 26px;
  border-radius: 4px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  transition:
    filter 0.2s,
    background 0.2s;
}

.button-play {
  background: var(--ink);
  color: var(--bg);
}

.button-play:hover {
  filter: brightness(0.92);
  color: var(--bg);
}

.button-info {
  background: color-mix(in oklch, var(--ink) 22%, transparent);
  color: var(--ink);
}

.button-info:hover {
  background: color-mix(in oklch, var(--ink) 30%, transparent);
  color: var(--ink);
}

@media (prefers-reduced-motion: reduce) {
  .backdrop {
    animation: none;
  }
  .status-dot::after {
    animation: none;
  }
  .content > * {
    transition: none;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 96px 20px 56px;
  }

  h1 {
    font-size: 52px;
  }

  .synopsis {
    font-size: 16px;
  }

  .cta {
    flex-direction: column;
  }

  .button {
    justify-content: center;
  }
}
</style>
