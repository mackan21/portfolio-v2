<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import BootLoader from './components/BootLoader.vue'
import PortfolioPage from './components/PortfolioPage.vue'
import ParticleField from './components/ParticleField.vue'
import CustomScrollbar from './components/CustomScrollbar.vue'
import { pageReadyKey } from './composables/pageReady'
import { useLenis } from './composables/useLenis'
import { lang } from './composables/useLang'

useLenis()

watch(lang, (value) => (document.documentElement.lang = value), { immediate: true })

const pageReady = ref(false)
provide(pageReadyKey, pageReady)

watch(
  pageReady,
  (ready) => {
    document.body.style.overflow = ready ? '' : 'hidden'
  },
  { immediate: true },
)

function handleLoaderDone() {
  pageReady.value = true
}
</script>

<template>
  <ParticleField />
  <CustomScrollbar />
  <BootLoader @done="handleLoaderDone" />
  <PortfolioPage />
</template>
