<script setup lang="ts">
import { computed } from 'vue'
import TechBadge from './TechBadge.vue'
import { stack } from '../data/stack'
import { vReveal } from '../directives/reveal'
import { lang } from '../composables/useLang'

const eyebrow = computed(() => (lang.value === 'sv' ? 'vad jag bygger med' : 'what I build with'))
</script>

<template>
  <section id="stack" class="stack divider">
    <div class="eyebrow">{{ eyebrow }}</div>
    <h2>Stack</h2>
    <div class="categories">
      <div v-for="(category, i) in stack" :key="category.label.sv" class="category" v-reveal="i * 80">
        <div class="category-label mono">{{ category.label[lang] }}</div>
        <div class="grid">
          <TechBadge v-for="tech in category.items" :key="tech.name" :item="tech" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stack {
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
  margin: 0 0 48px 0;
  color: var(--ink);
  line-height: 1;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.category-label.mono {
  font-family: var(--font-mono);
  font-size: 12.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 14px;
}

@media (max-width: 900px) {
  .stack {
    padding: 80px 24px;
  }

  h2 {
    font-size: 30px;
    margin-bottom: 32px;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}
</style>
