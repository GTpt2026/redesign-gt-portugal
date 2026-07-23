'use client'

/**
 * FooterAnimations
 * Placed in app/layout.js — returns null but drives all GSAP
 * animations on the footer via data attributes.
 *
 * Data attributes used in Footer.jsx:
 *   data-footer           — the <footer> element (scroll trigger anchor)
 *   data-footer-logo      — GT Portugal logo link
 *   data-footer-social-btn — each social icon button
 *   data-footer-col       — each nav column
 *   data-footer-funding   — EU funding bar
 */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function FooterAnimations() {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const footer = document.querySelector('[data-footer]')
    if (!footer) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 92%',
        once: true,
      },
    })

    /* ── 1. Logo slides in — opacity handled by CSS so it never stays hidden ── */
    tl.from('[data-footer-logo]', {
      x: -36,
      duration: 0.65,
      ease: 'back.out(1.8)',
    })

    /* ── 2. Social icons pop up, staggered ── */
    tl.from('[data-footer-social-btn]', {
      opacity: 0,
      y: 24,
      scale: 0.4,
      duration: 0.5,
      ease: 'back.out(2.2)',
      stagger: 0.07,
    }, '-=0.35')

    /* ── 3. Nav columns cascade up with bounce ── */
    tl.from('[data-footer-col]', {
      opacity: 0,
      y: 48,
      duration: 0.65,
      ease: 'back.out(1.5)',
      stagger: 0.12,
    }, '-=0.3')

    /* ── 4. Funding bar fades up ── */
    tl.from('[data-footer-funding]', {
      opacity: 0,
      y: 20,
      duration: 0.55,
      ease: 'power2.out',
    }, '-=0.2')
  })

  return null
}
