<script setup lang="ts">
import { computed } from 'vue'
import EpisodeRow from './EpisodeRow.vue'
import { episodes } from '../data/portfolio'
import { lang } from '../composables/useLang'

const copy = {
  sv: { eyebrow: 'säsong 01', title: 'Erfarenhet', download: 'Ladda ner CV →' },
  en: { eyebrow: 'season 01', title: 'Experience', download: 'Download CV →' },
}

const t = computed(() => copy[lang.value])
</script>

<template>
  <section id="episodes" class="episodes divider">
    <div class="eyebrow">{{ t.eyebrow }}</div>
    <h2>{{ t.title }}</h2>
    <div class="list">
      <EpisodeRow v-for="(episode, index) in episodes" :key="episode.id" :episode="episode" :index="index" />
    </div>
    <a href="/Marcus_Mikko_CV.pdf" download class="download">{{ t.download }}</a>
  </section>
</template>

<style scoped>
.episodes {
  padding: 120px 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.eyebrow {
  margin-bottom: 16px;
}

h2 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 40px 0;
  color: var(--ink);
  line-height: 1;
}

.list {
  margin-bottom: 32px;
}

.download {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 600;
  border: 1px solid var(--border-strong);
  padding: 12px 22px;
  border-radius: 4px;
  color: var(--ink);
  background: var(--surface);
}

@media (max-width: 900px) {
  .episodes {
    padding: 80px 24px;
  }

  h2 {
    font-size: 30px;
    margin-bottom: 24px;
  }
}
</style>
