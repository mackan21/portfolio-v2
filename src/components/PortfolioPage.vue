<script setup lang="ts">
import AppNav from './AppNav.vue'
import HeroSection from './HeroSection.vue'
import AboutSection from './AboutSection.vue'
import StackSection from './StackSection.vue'
import EpisodesSection from './EpisodesSection.vue'
import ProjectsRow from './ProjectsRow.vue'
import ContactSection from './ContactSection.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="portfolio-page">
    <AppNav />
    <HeroSection />
    <AboutSection />
    <StackSection />
    <EpisodesSection />
    <ProjectsRow />
    <ContactSection />
    <AppFooter />
  </div>
</template>

<style scoped>
.portfolio-page {
  min-height: 100vh;
}
</style>
