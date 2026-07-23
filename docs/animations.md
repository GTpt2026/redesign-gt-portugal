# Animations — GSAP

This guide covers how GSAP is used in the GT Portugal site.

> **Status:** Not yet integrated. This document will be updated as animations are built.

---

## What GSAP does

GSAP (GreenSock Animation Platform) is the animation library. It handles scroll-triggered animations — elements fading in, sliding up, or counting up as the user scrolls down the page.

---

## Planned animations

| Section | Animation |
|---|---|
| Hero headline | Fade in + slide up on load |
| Stats | Numbers count up when scrolled into view |
| Cards (Textiles, Footwear, Homeware) | Staggered fade in on scroll |
| Testimonials | Fade in on scroll |
| Section headings | Slide up on scroll |

---

## Setup steps (when ready to integrate)

### 1. Install GSAP
```bash
npm install gsap
```

### 2. Register ScrollTrigger
ScrollTrigger is the GSAP plugin that fires animations based on scroll position.
It must be registered once before use:
```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

### 3. Usage pattern in Next.js

Because Next.js renders on the server first, GSAP must only run in the browser.
Always initialise inside `useEffect` and clean up on unmount:

```jsx
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%'
        }
      })
    }, ref)

    return () => ctx.revert() // clean up on unmount
  }, [])

  return <div ref={ref}>...</div>
}
```

### Key rules
- Always add `'use client'` at the top of any component using GSAP
- Always clean up with `ctx.revert()` to avoid memory leaks
- Never read `.width` or `.height` from elements before the component has mounted
