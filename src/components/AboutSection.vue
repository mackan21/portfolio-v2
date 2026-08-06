<script setup lang="ts">
import { computed } from 'vue'
import { vReveal } from '../directives/reveal'
import { lang } from '../composables/useLang'

const copy = {
  sv: {
    eyebrow: 'om mig',
    title: 'Det här är jag',
    p1: 'Jag tror på att sätta användaren i centrum. Varje projekt jag jobbar med ska kännas anpassat efter vad just de användarna faktiskt behöver, och jag gillar att förvandla idéer till konkreta, genomtänkta lösningar.',
    p2: 'Jag fokuserar på att bygga snabba, skalbara lösningar som funkar för både användarna och verksamheten bakom. Prestanda och tillgänglighet är alltid högt prioriterat.',
  },
  en: {
    eyebrow: 'about me',
    title: 'This is me',
    p1: "I believe in putting the user first. Every project I work on should feel tailored to what its users actually need, and I like turning ideas into concrete, well thought out solutions.",
    p2: "I focus on building fast, scalable solutions that work for both users and the business behind them. Performance and accessibility are always a priority.",
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
