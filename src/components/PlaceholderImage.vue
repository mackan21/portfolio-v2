<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    aspectRatio?: string
    radius?: number
  }>(),
  { aspectRatio: '4 / 5', radius: 4 },
)
</script>

<template>
  <div class="placeholder" :style="{ aspectRatio, borderRadius: `${radius}px` }">
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--ink-faint);
  font-family: var(--font-mono);
  font-size: 12.5px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  width: 100%;
}
</style>
