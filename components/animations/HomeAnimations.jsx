'use client'

/**
 * HomeAnimations
 * Drop this into app/page.js — it returns null but drives all GSAP
 * animations on the homepage via data attributes.
 *
 * Data attributes used in section components:
 *   data-hero-eyebrow  — hero eyebrow label (entrance)
 *   data-hero-line     — each headline box  (entrance, staggered)
 *   data-reveal        — any element that fades up on scroll
 *   data-stagger       — container whose [data-stagger-item] children stagger in
 *   data-stagger-item  — individual child inside a stagger container
 */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function HomeAnimations() {
  useGSAP(() => {
    // Respect user's motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* ── 1. Hero entrance sequence ─────────────────────────────
       Eyebrow first, then headline boxes slide in from the left. */
    const eyebrow  = document.querySelector('[data-hero-eyebrow]')
    const lines    = document.querySelectorAll('[data-hero-line]')
    const sub      = document.querySelector('[data-hero-sub]')
    const actions  = document.querySelector('[data-hero-actions]')

    const heroTl = gsap.timeline({ delay: 0.4 })

    if (eyebrow) {
      heroTl.from(eyebrow, {
        opacity: 0,
        y: 18,
        duration: 0.55,
        ease: 'power3.out',
      })
    }

    if (lines.length) {
      heroTl.from(lines, {
        opacity: 0,
        x: -120,
        duration: 1.125,
        ease: 'power3.out',
        stagger: 0.14,
      }, eyebrow ? '-=0.25' : 0)
    }

    if (sub) {
      heroTl.from(sub, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.5')
    }

    if (actions) {
      heroTl.from(actions, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.35')
    }

    /* ── 2. Scroll — individual fade-up reveals ────────────────
       Used on section titles, eyebrows, descriptions, cards.    */
    document.querySelectorAll('[data-reveal]').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 36,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    })

    /* ── 3. Scroll — staggered child reveals ───────────────────
       Container has [data-stagger], children have [data-stagger-item]. */
    document.querySelectorAll('[data-stagger]').forEach(container => {
      const items = container.querySelectorAll('[data-stagger-item]')
      if (!items.length) return

      const isLogoGrid = container.hasAttribute('data-logos')

      if (isLogoGrid) {
        // Logo grid — scale up from 0.85 + fade, no Y movement
        gsap.from(items, {
          opacity: 0,
          scale: 0.85,
          transformOrigin: '50% 50%',
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            once: true,
          },
        })
      } else {
        // All other stagger containers — fade up
        gsap.from(items, {
          opacity: 0,
          y: 40,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            once: true,
          },
        })
      }
    })

  })

  return null
}
