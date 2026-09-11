'use client'

/**
 * CursorStitch — a running-stitch trail that follows the mouse.
 * The drawn point eases toward the real cursor position each frame
 * (rather than snapping straight to it), which is what gives the
 * trail its lagging, fluid feel instead of a rigid 1:1 trace.
 * Points decay after ~1.6s. Consecutive segments are drawn as a
 * quadratic curve through their midpoints so the trail reads as one
 * smooth thread rather than straight facets.
 */
import { useEffect, useRef } from 'react'
import styles from './CursorStitch.module.css'

const TRAIL_MS = 1600
const EASE = 0.1            // lower = more lag / fluidity, higher = snappier
const STEP_PX = 8           // resample spacing along the eased path
const MAX_STEPS_PER_MOVE = 60 // safety cap for huge jumps (e.g. window blur/refocus)
const DASH_SPEED = 0.7      // marching-ants speed (lower = slower)
const STITCH_COLOR = '191, 0, 0' // --color-brand-accent as rgb

export default function CursorStitch() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    let points = []
    let rafId = null
    let dashPhase = 0

    let targetX = 0
    let targetY = 0
    let smoothX = 0
    let smoothY = 0
    let hasTarget = false
    let hasSmoothed = false

    function pushPoint(x, y, t) {
      points.push({ x, y, t })
    }

    function onMove(e) {
      targetX = e.clientX
      targetY = e.clientY
      if (!hasTarget) {
        hasTarget = true
        smoothX = targetX
        smoothY = targetY
        hasSmoothed = true
      }
      if (rafId === null) rafId = requestAnimationFrame(draw)
    }

    function draw() {
      rafId = null
      const now = performance.now()

      if (hasSmoothed) {
        const prevX = smoothX
        const prevY = smoothY

        // Ease the drawn point toward the real cursor — this lag is
        // what makes the trail feel fluid rather than rigidly traced.
        smoothX += (targetX - smoothX) * EASE
        smoothY += (targetY - smoothY) * EASE

        const dx = smoothX - prevX
        const dy = smoothY - prevY
        const dist = Math.hypot(dx, dy)

        if (dist > 0.05) {
          const steps = Math.min(Math.floor(dist / STEP_PX), MAX_STEPS_PER_MOVE)
          for (let i = 1; i <= steps; i++) {
            const f = i / (steps + 1)
            pushPoint(prevX + dx * f, prevY + dy * f, now)
          }
          pushPoint(smoothX, smoothY, now)
        }
      }

      points = points.filter(p => now - p.t < TRAIL_MS)

      ctx.clearRect(0, 0, width, height)

      if (points.length > 2) {
        dashPhase = (dashPhase + DASH_SPEED) % 20
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.setLineDash([6, 14])

        // Smooth piecewise curve: each segment runs between the
        // midpoints of its neighbours, curving through the shared point.
        for (let i = 1; i < points.length - 1; i++) {
          const p0 = points[i - 1]
          const p1 = points[i]
          const p2 = points[i + 1]
          const age = now - p1.t
          const alpha = Math.max(0, 1 - age / TRAIL_MS)
          if (alpha <= 0) continue

          const midA = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 }
          const midB = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }

          ctx.beginPath()
          ctx.lineDashOffset = -(i * STEP_PX + dashPhase)
          ctx.strokeStyle = `rgba(${STITCH_COLOR}, ${alpha * 0.6})`
          ctx.lineWidth = 1.5
          ctx.moveTo(midA.x, midA.y)
          ctx.quadraticCurveTo(p1.x, p1.y, midB.x, midB.y)
          ctx.stroke()
        }
      }

      const stillEasing = hasSmoothed && Math.hypot(targetX - smoothX, targetY - smoothY) > 0.1
      if (points.length > 0 || stillEasing) rafId = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
