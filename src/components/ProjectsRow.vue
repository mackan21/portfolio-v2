<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PosterCard from './PosterCard.vue'
import { projects } from '../data/portfolio'
import { vReveal } from '../directives/reveal'
import { lang } from '../composables/useLang'

const copy = {
  sv: { eyebrow: 'utvalt just nu', title: 'Utvalda projekt', allProjects: 'Se alla projekt på GitHub' },
  en: { eyebrow: 'featured now', title: 'Selected Projects', allProjects: 'See all projects on GitHub' },
}

const t = computed(() => copy[lang.value])

const selectedProjects = computed(() => projects.filter((project) => project.selected))

// Desktop shows all projects at once, no scrolling. Mobile/tablet gets a
// swipeable carousel instead — there just isn't room to show three cards
// at a comfortable size on a small screen.
const isDesktop = ref(true)
const reducedMotion = ref(false)
const showCarousel = computed(() => !isDesktop.value && !reducedMotion.value)

const rowRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
let ticking = false
let desktopQuery: MediaQueryList | undefined
let motionQuery: MediaQueryList | undefined

function updateActiveIndex() {
  const row = rowRef.value
  if (!row) return
  const maxScrollLeft = row.scrollWidth - row.clientWidth
  const fraction = maxScrollLeft > 0 ? row.scrollLeft / maxScrollLeft : 0
  activeIndex.value = Math.round(fraction * (selectedProjects.value.length - 1))
}

function onRowScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateActiveIndex()
    ticking = false
  })
}

// Let a plain vertical mouse wheel move the row sideways while hovering it —
// trackpad/shift+wheel horizontal gestures pass through untouched.
function onWheel(e: WheelEvent) {
  if (!rowRef.value) return
  if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
  e.preventDefault()
  rowRef.value.scrollLeft += e.deltaY
}

function scrollToIndex(index: number) {
  const row = rowRef.value
  const card = row?.children[index] as HTMLElement | undefined
  if (!row || !card) return
  const target = card.offsetLeft - (row.clientWidth - card.clientWidth) / 2
  row.scrollTo({ left: target, behavior: 'smooth' })
}

// Relying on native touch scrolling here doesn't work: once the finger
// lifts, the browser's own scroll-snap "spring back" animation races our
// scrollToIndex() call and wins, undoing it. So we take over the drag
// entirely — `touch-action: pan-y` on the row stops the browser from
// handling horizontal touch gestures at all, and we move scrollLeft
// ourselves, then always resolve to exactly one card of movement (or none)
// once the finger lifts, rather than requiring a swipe past the halfway point.
const SWIPE_THRESHOLD = 24
let touchStartX = 0
let touchStartScrollLeft = 0
let touchStartIndex = 0
let dragging = false

function onTouchStart(e: TouchEvent) {
  if (!rowRef.value) return
  dragging = true
  touchStartX = e.touches[0].clientX
  touchStartScrollLeft = rowRef.value.scrollLeft
  touchStartIndex = activeIndex.value
}

function onTouchMove(e: TouchEvent) {
  if (!dragging || !rowRef.value) return
  const deltaX = e.touches[0].clientX - touchStartX
  rowRef.value.scrollLeft = touchStartScrollLeft - deltaX
  e.preventDefault()
}

function onTouchEnd(e: TouchEvent) {
  if (!dragging) return
  dragging = false
  const deltaX = e.changedTouches[0].clientX - touchStartX
  let targetIndex = touchStartIndex
  if (deltaX <= -SWIPE_THRESHOLD) {
    targetIndex = Math.min(touchStartIndex + 1, selectedProjects.value.length - 1)
  } else if (deltaX >= SWIPE_THRESHOLD) {
    targetIndex = Math.max(touchStartIndex - 1, 0)
  }
  scrollToIndex(targetIndex)
}

watch(rowRef, (newRow, oldRow) => {
  oldRow?.removeEventListener('scroll', onRowScroll)
  if (newRow) {
    activeIndex.value = 0
    newRow.addEventListener('scroll', onRowScroll, { passive: true })
  }
})

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 901px)')
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  isDesktop.value = desktopQuery.matches
  reducedMotion.value = motionQuery.matches
  desktopQuery.addEventListener('change', (e) => (isDesktop.value = e.matches))
  motionQuery.addEventListener('change', (e) => (reducedMotion.value = e.matches))
})

onBeforeUnmount(() => {
  rowRef.value?.removeEventListener('scroll', onRowScroll)
})
</script>

<template>
  <section id="work" class="projects divider">
    <div class="eyebrow">{{ t.eyebrow }}</div>
    <h2>{{ t.title }}</h2>

    <div v-if="!showCarousel" class="grid">
      <div v-for="(project, index) in selectedProjects" :key="project.code" v-reveal="index * 80">
        <PosterCard :project="project" />
      </div>
    </div>

    <div
      v-else
      ref="rowRef"
      class="row no-scrollbar"
      data-lenis-prevent-wheel
      @wheel="onWheel"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div v-for="(project, index) in selectedProjects" :key="project.code" class="poster-wrap" v-reveal="index * 80">
        <div class="poster-scale" :class="{ 'is-active': index === activeIndex }">
          <PosterCard :project="project" :active="index === activeIndex" />
        </div>
      </div>
    </div>

    <a class="all-projects" href="https://github.com/mackan21" target="_blank" rel="noopener noreferrer">
      {{ t.allProjects }} →
    </a>
  </section>
</template>

<style scoped>
.projects {
  padding: 120px 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.eyebrow {
  margin-bottom: 16px;
}

h2 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 36px 0;
  color: var(--ink);
  line-height: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.row {
  display: flex;
  gap: 28px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  touch-action: pan-y;
  padding: 24px calc(50% - 120px) 56px;
  -webkit-mask-image: linear-gradient(90deg, transparent, black 28px, black calc(100% - 28px), transparent);
  mask-image: linear-gradient(90deg, transparent, black 28px, black calc(100% - 28px), transparent);
  margin: 0 -24px -32px;
}

.poster-wrap {
  flex: 0 0 240px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.poster-scale {
  transform-origin: top center;
  transform: scale(1);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.poster-scale.is-active {
  transform: scale(1.08);
}

@media (prefers-reduced-motion: reduce) {
  .poster-scale {
    transition: none;
  }
}

.all-projects {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 600;
  border: 1px solid var(--border-strong);
  padding: 12px 22px;
  border-radius: 4px;
  color: var(--ink);
  background: var(--surface);
  transition:
    border-color 0.2s,
    color 0.2s;
}

.all-projects:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 900px) {
  .projects {
    padding: 80px 24px;
  }

  h2 {
    font-size: 30px;
    margin-bottom: 24px;
  }

  .all-projects {
    margin-top: 32px;
  }
}
</style>
