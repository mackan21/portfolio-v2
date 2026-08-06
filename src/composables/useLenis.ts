import Lenis from 'lenis'
import { onBeforeUnmount, onMounted } from 'vue'

export function useLenis() {
  let lenis: Lenis | undefined
  let rafId: number | undefined

  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    rafId = requestAnimationFrame(raf)
  })

  onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId)
    lenis?.destroy()
  })
}
