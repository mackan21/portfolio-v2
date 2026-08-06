<script setup lang="ts">
import { computed } from 'vue'
import type { StackItem } from '../data/stack'

const props = defineProps<{ item: StackItem }>()

const initials = computed(() =>
  props.item.name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase(),
)

// Some brand marks (Next.js, Express) are pure/near black and disappear
// against the dark card background — fall back to ink color for those.
function relativeLuminance(hex: string) {
  const [r, g, b] = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((c) => parseInt(c, 16) / 255)
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

const brand = computed(() => (relativeLuminance(props.item.hex) < 0.03 ? 'var(--ink-muted)' : `#${props.item.hex}`))
</script>

<template>
  <div class="badge" :style="{ '--brand': brand }">
    <svg v-if="item.path" viewBox="0 0 24 24"><path :d="item.path" /></svg>
    <span v-else class="mark">{{ initials }}</span>
    <span class="label">{{ item.name }}</span>
  </div>
</template>

<style scoped>
.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  transition:
    transform 0.25s cubic-bezier(0.34, 1.4, 0.64, 1),
    border-color 0.25s,
    background 0.25s;
}

.badge:hover {
  transform: translateY(-4px);
  border-color: var(--brand);
  background: var(--surface-raised);
}

svg {
  width: 30px;
  height: 30px;
  fill: var(--brand);
}

.mark {
  height: 30px;
  display: flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--brand);
}

.label {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-muted);
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .badge {
    transition: none;
  }
}
</style>
