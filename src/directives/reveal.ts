import type { Directive } from 'vue'

const observer = new WeakMap<Element, IntersectionObserver>()
const BASE_DELAY = 200

export const vReveal: Directive<HTMLElement, number | void> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    const delay = BASE_DELAY + (typeof binding.value === 'number' ? binding.value : 0)
    el.style.transitionDelay = `${delay}ms`

    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle('is-revealed', entry?.isIntersecting ?? false)
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    observer.set(el, io)
  },
  unmounted(el) {
    observer.get(el)?.disconnect()
    observer.delete(el)
  },
}
