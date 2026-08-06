<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Particle {
  x: number
  y: number
  depth: number
  size: number
  speed: number
  wobbleAmp: number
  wobblePhase: number
  opacity: number
  accent: boolean
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let rafId: number | undefined
let particles: Particle[] = []
let accentSprite: HTMLCanvasElement | undefined
let whiteSprite: HTMLCanvasElement | undefined
let width = 0
let height = 0
let dpr = 1
let time = 0

const PARTICLE_COUNT = 90

function makeSprite(color: string) {
  const size = 64
  const sprite = document.createElement('canvas')
  sprite.width = size
  sprite.height = size
  const c = sprite.getContext('2d')!
  const gradient = c.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, color)
  gradient.addColorStop(1, 'transparent')
  c.fillStyle = gradient
  c.fillRect(0, 0, size, size)
  return sprite
}

function makeParticle(randomY: boolean): Particle {
  const depth = Math.random()
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : height + 20,
    depth,
    size: 4 + depth * 22,
    speed: 0.08 + depth * 0.35,
    wobbleAmp: 6 + depth * 14,
    wobblePhase: Math.random() * Math.PI * 2,
    opacity: 0.08 + depth * 0.4,
    accent: Math.random() < 0.78,
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return
  width = window.innerWidth
  height = window.innerHeight
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function draw(reduced: boolean) {
  if (!ctx || !accentSprite || !whiteSprite) return
  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    if (!reduced) {
      p.y -= p.speed
      if (p.y < -30) {
        Object.assign(p, makeParticle(false))
      }
    }
    const wobble = reduced ? 0 : Math.sin(time * 0.001 + p.wobblePhase) * p.wobbleAmp * 0.3
    const drawX = p.x + wobble - p.size / 2
    const drawY = p.y - p.size / 2
    ctx.globalAlpha = p.opacity
    ctx.drawImage(p.accent ? accentSprite : whiteSprite, drawX, drawY, p.size, p.size)
  }
  ctx.globalAlpha = 1
}

function loop(t: number) {
  time = t
  draw(false)
  rafId = requestAnimationFrame(loop)
}

function onResize() {
  resize()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  if (!ctx) return

  const styles = getComputedStyle(document.documentElement)
  accentSprite = makeSprite(styles.getPropertyValue('--accent').trim() || '#e5a04a')
  whiteSprite = makeSprite(styles.getPropertyValue('--ink').trim() || '#f5f5f5')

  resize()
  particles = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(true))

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    draw(true)
  } else {
    rafId = requestAnimationFrame(loop)
  }

  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvasRef" class="particle-field" aria-hidden="true"></canvas>
</template>

<style scoped>
.particle-field {
  position: fixed;
  inset: 0;
  display: block;
  pointer-events: none;
}
</style>
