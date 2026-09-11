import gsap from 'gsap'

/**
 * Shared per-character clip-stagger swap, extracted from ButtonAnimated
 * so any element (not just links/buttons) can reuse the same hover feel.
 * Operates on [data-l="1"]/[data-l="2"] children within `root`.
 */
export function charsEnter(root) {
  if (!root) return
  const l1 = [...root.querySelectorAll('[data-l="1"]')]
  const l2 = [...root.querySelectorAll('[data-l="2"]')]
  gsap.killTweensOf([...l1, ...l2])
  gsap.to(l1, { y: '-100%', duration: 0.30, ease: 'power3.in',  stagger: 0.012 })
  gsap.to(l2, { y: '-100%', duration: 0.40, ease: 'power3.out', stagger: 0.013, delay: 0.16 })
}

export function charsLeave(root) {
  if (!root) return
  const l1 = [...root.querySelectorAll('[data-l="1"]')]
  const l2 = [...root.querySelectorAll('[data-l="2"]')]
  gsap.killTweensOf([...l1, ...l2])
  gsap.to(l2, { y: '0%', duration: 0.28, ease: 'power3.in',  stagger: 0.011 })
  gsap.to(l1, { y: '0%', duration: 0.38, ease: 'power3.out', stagger: 0.012, delay: 0.14 })
}
