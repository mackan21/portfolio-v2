<script setup lang="ts">
import { computed } from 'vue'
import type { Episode } from '../types/portfolio'

const props = defineProps<{ type: Episode['type']; index: number }>()

const glowPos = computed(() => {
  const angle = (props.index * 47) % 360
  return `${50 + Math.cos((angle * Math.PI) / 180) * 30}% ${50 + Math.sin((angle * Math.PI) / 180) * 30}%`
})
</script>

<template>
  <div class="art" :style="{ '--glow-pos': glowPos }">
    <svg
      v-if="type === 'education'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="12 3 22 8 12 13 2 8" />
      <path d="M6 10v4a6 3 0 0 0 12 0v-4" />
      <path d="M12 13v5.3" />
      <circle cx="12" cy="19.3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
    <svg
      v-else
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </svg>
  </div>
</template>

<style scoped>
.art {
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  background: radial-gradient(
    110% 130% at var(--glow-pos),
    color-mix(in oklch, var(--accent) 24%, transparent),
    var(--surface) 62%
  );
  color: var(--ink-faint);
  width: 100%;
}

.art svg {
  width: 30%;
  height: auto;
}
</style>
