<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer divider">
    <span class="mono">© {{ year }} Marcus Mikko</span>
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
