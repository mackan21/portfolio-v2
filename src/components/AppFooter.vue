<script setup lang="ts">
import { computed } from 'vue'
import { lang } from '../composables/useLang'

const year = new Date().getFullYear()
const tagline = computed(() => (lang.value === 'sv' ? 'Byggd med Vue & TypeScript' : 'Built with Vue & TypeScript'))
</script>

<template>
  <footer class="app-footer divider">
    <span class="mono">© {{ year }} Marcus Mikko</span>
    <span class="mono">{{ tagline }}</span>
  </footer>
</template>

<style scoped>
.app-footer {
  display: flex;
  justify-content: space-between;
  padding: 24px 48px 40px;
  max-width: 1100px;
  margin: 0 auto;
}

.mono {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-faint);
}

@media (max-width: 600px) {
  .app-footer {
    flex-direction: column;
    gap: 8px;
    padding: 24px 20px 40px;
  }
}
</style>
