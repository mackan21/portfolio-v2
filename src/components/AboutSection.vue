<script setup lang="ts">
import { computed } from 'vue'
import { vReveal } from '../directives/reveal'
import { lang } from '../composables/useLang'

const copy = {
  sv: {
    eyebrow: 'om mig',
    title: 'Det här är jag',
    p1: 'Jag drivs av att skapa digitala lösningar som gör skillnad för användarna. Jag tycker om att ta en idé från koncept till färdig produkt och hitta lösningar som både är användarvänliga och tekniskt hållbara.',
    p2: 'När jag utvecklar fokuserar jag på prestanda, tillgänglighet och skalbarhet. Mitt mål är att skriva ren och genomtänkt kod som är enkel att underhålla och som ger en bra upplevelse för både användare och utvecklingsteam.',
    p3: 'Under min praktik på PostNord fick jag arbeta med moderna frontendlösningar i Vue, där jag utvecklade nya funktioner, förbättrade användarupplevelsen och löste verkliga problem i produktionsmiljö.',
  },
  en: {
    eyebrow: 'about me',
    title: 'This is me',
    p1: "I'm driven by creating digital solutions that make a real difference for users. I enjoy taking an idea from concept to finished product, finding solutions that are both user-friendly and technically sound.",
    p2: "When I build, I focus on performance, accessibility and scalability. My goal is to write clean, well thought out code that's easy to maintain and gives both users and the development team a good experience.",
    p3: "During my internship at Postnord, I worked with modern frontend solutions in Vue, where I developed new features, improved the user experience and solved real problems in a production environment.",
  },
}

const t = computed(() => copy[lang.value])
</script>

<template>
  <section id="about" class="about divider">
    <div class="eyebrow">{{ t.eyebrow }}</div>
    <div class="content" v-reveal>
      <h2>{{ t.title }}</h2>
      <p>{{ t.p1 }}</p>
      <p>{{ t.p2 }}</p>
      <p>{{ t.p3 }}</p>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 120px 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.eyebrow {
  margin-bottom: 16px;
}

.content {
  max-width: 640px;
}

h2 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 400;
  margin: 0 0 22px 0;
  letter-spacing: -0.005em;
  color: var(--ink);
  text-transform: uppercase;
  line-height: 1;
}

p {
  font-size: 16.5px;
  line-height: 1.75;
  color: var(--ink-muted);
  margin: 0 0 20px 0;
}

@media (max-width: 900px) {
  .about {
    padding: 80px 24px;
  }

  h2 {
    font-size: 30px;
  }
}
</style>
