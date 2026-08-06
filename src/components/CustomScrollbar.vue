<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const percent = ref(0)
let ticking = false

function update() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const fraction = scrollable > 0 ? window.scrollY / scrollable : 0
  percent.value = Math.max(0, Math.min(1, fraction)) * 100
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    update()
    ticking = false
  })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div class="bar" aria-hidden="true">
    <div class="fill" :style="{ height: `${percent}%` }"></div>
  </div>
</template>

<style scoped>
.bar {
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 4px;
  height: 120px;
  border-radius: 999px;
  background: var(--border);
  overflow: hidden;
  z-index: 90;
}

.fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--accent);
  box-shadow: 0 0 8px 0 color-mix(in oklch, var(--accent) 70%, transparent);
}

@media (max-width: 768px) {
  .bar {
    display: none;
  }
}
</style>
