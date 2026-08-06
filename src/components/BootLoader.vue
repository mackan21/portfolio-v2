<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { lang } from '../composables/useLang'

const emit = defineEmits<{ done: [] }>()

const name = 'Marcus_Mikko'.split('').map((ch) => (ch === '_' ? String.fromCharCode(160) : ch))

const stage = ref<'in' | 'hold' | 'out'>('in')
const hiding = ref(false)

let holdTimeout: ReturnType<typeof setTimeout> | undefined
let outTimeout: ReturnType<typeof setTimeout> | undefined
let doneTimeout: ReturnType<typeof setTimeout> | undefined

function finish() {
  if (hiding.value) return
  clearTimeout(holdTimeout)
  clearTimeout(outTimeout)
  clearTimeout(doneTimeout)
  hiding.value = true
  doneTimeout = setTimeout(() => emit('done'), 420)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish()
    return
  }
  holdTimeout = setTimeout(() => {
    stage.value = 'hold'
    outTimeout = setTimeout(finish, 550)
  }, 1150)
})

onBeforeUnmount(() => {
  clearTimeout(holdTimeout)
  clearTimeout(outTimeout)
  clearTimeout(doneTimeout)
})
</script>

<template>
  <div class="boot" :class="{ hiding }" role="status" :aria-label="lang === 'sv' ? 'Laddar' : 'Loading'" @click="finish">
    <div class="mark" :class="stage">
      <span class="bar" v-for="n in 3" :key="n"></span>
      <span class="wordmark-wrap">
        <span class="wordmark">
          <span
            v-for="(ch, idx) in name"
            :key="idx"
            class="letter"
            :style="{ animationDelay: `${0.3 + idx * 0.045}s` }"
            >{{ ch }}</span
          >
        </span>
        <span class="progress-line"></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.boot {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    opacity 0.42s ease,
    visibility 0.42s ease;
}

.boot.hiding {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.mark {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.bar {
  width: 6px;
  height: 34px;
  background: var(--accent);
  border-radius: 1px;
  transform: scaleY(0.15);
  animation: rise 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.bar:nth-child(2) {
  animation-delay: 0.08s;
  height: 46px;
}

.bar:nth-child(3) {
  animation-delay: 0.16s;
}

@keyframes rise {
  to {
    transform: scaleY(1);
  }
}

.wordmark-wrap {
  position: relative;
  margin-left: 14px;
}

.wordmark {
  display: block;
  font-family: var(--font-display);
  font-size: 30px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--ink);
  white-space: nowrap;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(6px);
  animation: reveal-letter 0.35s ease forwards;
}

@keyframes reveal-letter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.progress-line {
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 2px;
  background: var(--border);
  overflow: hidden;
}

.progress-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
}

.mark.hold .bar,
.mark.out .bar {
  animation: none;
  transform: scaleY(1);
}

.mark.hold .letter,
.mark.out .letter {
  animation: none;
  opacity: 1;
  transform: translateY(0);
}

.mark.hold .progress-line::after {
  animation: fill-line 0.55s linear forwards;
}

@keyframes fill-line {
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bar,
  .letter {
    animation: none;
    transform: none;
    opacity: 1;
  }

  .progress-line::after {
    animation: none;
    transform: scaleX(1);
  }
}
</style>
