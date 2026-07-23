# Hero Video

Place your hero background video here as `hero.mp4`.

## Specs
- **Filename:** `hero.mp4`
- **Format:** MP4 (H.264)
- **Resolution:** 1920×1080 minimum (1920×1080 or 3840×2160 for 4K)
- **Duration:** 15–30 seconds looping (shorter = faster load)
- **Audio:** None — video plays muted
- **Size:** Aim for under 8MB. Use Handbrake or similar to compress.

## Tips
- The video will have a dark gradient overlay applied in CSS (~55–72% opacity).
  Avoid very dark or very light footage — mid-tones with movement work best.
- Good content: textile/fabric close-ups, production line, hands at work.
- Fallback: if the file is missing or fails to load, the section shows a solid dark
  background (`#111111`) which looks clean.

## How to swap
Replace this file with your video:
`public/videos/hero.mp4`

No code changes needed — the HeroSection component references `/videos/hero.mp4` automatically.
