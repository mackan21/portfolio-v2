<script setup lang="ts">
import { computed } from 'vue'
import PlaceholderImage from './PlaceholderImage.vue'
import type { Project } from '../types/portfolio'
import { lang } from '../composables/useLang'

const props = defineProps<{ project: Project; active?: boolean }>()

const placeholderLabel = computed(() => (lang.value === 'sv' ? 'Skärmdump' : 'Screenshot'))
const altText = computed(() =>
  lang.value === 'sv'
    ? `Skärmdump från ${props.project.title.sv}`
    : `Screenshot from ${props.project.title.en}`,
)
</script>

<template>
  <a :href="project.href" target="_blank" rel="noopener" class="poster" draggable="false">
    <div class="art" :class="{ 'is-active': active }">
      <img v-if="project.image" :src="project.image" :alt="altText" loading="lazy" draggable="false" />
      <PlaceholderImage v-else :label="placeholderLabel" aspect-ratio="16 / 9" :radius="6" />
      <span class="code-tag mono">{{ project.code }}</span>
      <span class="play">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l10-5.5z" /></svg>
      </span>
    </div>
    <h3>{{ project.title[lang] }}</h3>
    <div class="info" :class="{ 'is-active': active }">
      <div class="info-inner">
        <p>{{ project.description[lang] }}</p>
        <div class="tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
.poster {
  display: block;
  width: 100%;
  color: var(--ink);
  -webkit-user-drag: none;
  user-select: none;
  transform-origin: bottom center;
  transition: transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
}

@media (hover: hover) and (pointer: fine) {
  .poster:hover {
    transform: translateY(-6px) scale(1.03);
    color: var(--ink);
    z-index: 2;
    position: relative;
  }
}

.art {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--border);
  transition: box-shadow 0.3s;
  background: var(--surface);
}

.art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

.poster:hover .art,
.art.is-active {
  box-shadow:
    0 0 0 1px var(--border-strong),
    0 24px 48px -20px oklch(0 0 0 / 0.6);
}

.code-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: color-mix(in oklch, var(--bg) 70%, transparent);
  border: 1px solid var(--border-strong);
  border-radius: 3px;
  padding: 3px 8px;
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: var(--ink-muted);
}

.play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  background: color-mix(in oklch, var(--bg) 35%, transparent);
  opacity: 0;
  transition: opacity 0.25s;
}

.play svg {
  background: var(--accent);
  border-radius: 50%;
  padding: 12px;
}

.poster:hover .play {
  opacity: 1;
}

h3 {
  font-family: var(--font-sans);
  font-size: 15.5px;
  font-weight: 600;
  margin: 12px 0 0 0;
  color: var(--ink);
}

.info {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}

.poster:hover .info,
.info.is-active {
  grid-template-rows: 1fr;
}

.info-inner {
  overflow: hidden;
}

p {
  font-size: 13px;
  line-height: 1.55;
  color: var(--ink-muted);
  margin: 8px 0 10px 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-bottom: 4px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .poster,
  .art,
  .play,
  .info {
    transition: none;
  }
}
</style>
