<script setup lang="ts">
import type { Episode } from '../types/portfolio'
import EpisodeArt from './EpisodeArt.vue'
import { vReveal } from '../directives/reveal'
import { lang } from '../composables/useLang'

defineProps<{ episode: Episode; index: number }>()
</script>

<template>
  <div class="episode" v-reveal="index * 70">
    <div class="index mono">{{ String(index + 1).padStart(2, '0') }}</div>
    <EpisodeArt :type="episode.type" :index="index" class="thumb" />
    <div class="info">
      <div class="head">
        <h3>{{ episode.place[lang] }}</h3>
        <span class="period mono">{{ episode.period[lang] }}</span>
      </div>
      <div class="number">{{ episode.number[lang] }}</div>
      <p>{{ episode.description[lang] }}</p>
    </div>
  </div>
</template>

<style scoped>
.episode {
  display: grid;
  grid-template-columns: 32px 180px 1fr;
  gap: 22px;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid var(--border);
}

.episode:first-child {
  padding-top: 0;
}

.index.mono {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--ink-faint);
  text-align: center;
}

.thumb {
  border-radius: 4px;
}

.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 4px;
}

h3 {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--ink);
}

.period.mono {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--ink-faint);
  white-space: nowrap;
}

.number {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--accent);
  margin-bottom: 8px;
}

p {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--ink-muted);
  margin: 0;
}

@media (max-width: 900px) {
  .episode {
    grid-template-columns: 24px 96px 1fr;
    gap: 14px;
  }

  .head {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  h3 {
    font-size: 16px;
  }
}
</style>
