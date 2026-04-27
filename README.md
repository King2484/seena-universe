# Seena Universe

A high-performance, heavily animated website for **Raiyas** (Coffee Shop), **Seena Studios** (Reformer Pilates), and **The Canvas** (Art Studio) — three spaces, one soul.

## Stack

| Tool | Role |
|---|---|
| **Next.js 14** (App Router) | Framework |
| **TypeScript** | Language |
| **Tailwind CSS** | Utility styling |
| **GSAP + ScrollTrigger** | All animations & scroll mechanics |
| **Three.js** | Golden nebula particle hero |
| **Lenis** | Buttery smooth scroll |

## Setup

```bash
# 1. Install
npm install

# 2. Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scroll Architecture

```
400vh scroll wrapper
  └── sticky 100vh container
        ├── #raiyas   (z-index: 1) — Dark, Three.js particle hero
        ├── #seena    (z-index: 2) — Cream, arch motifs, pilates
        └── #canvas   (z-index: 3) — Near-black, ink SVG, art studio
```

### Section reveal timing

| Section | Reveal starts | Reveal ends |
|---|---|---|
| Seena  | 100vh scroll | 175vh scroll |
| Canvas | 250vh scroll | 325vh scroll |

Each reveal uses a `clipPath: inset(100% → 0%)` wipe, scrubbed with GSAP ScrollTrigger.

## Customisation

### Replace placeholders

| Item | File |
|---|---|
| Brand name | `components/Navigation.tsx` → `"Seena"` |
| Art studio name | `components/sections/ArtStudioSection.tsx` → `"The Canvas"` |
| Copy / taglines | Within each section component |
| Stats (pilates) | `STATS` array in `SeenaSection.tsx` |

### Colours

All tokens live in `tailwind.config.ts` and `app/globals.css`:
```
--cream: #F5ECD7
--sand:  #EDE0C4
--oak:   #C4935A
--gold:  #D4AA70
--moss:  #2D4A2F
```

### Scroll timing

Adjust the vh multipliers in `app/page.tsx`:
```ts
// Seena reveal
start: `${vh * 1.0}px top`,   // ← when reveal begins
end:   `${vh * 1.75}px top`,  // ← when reveal completes
```

### Three.js particles

`components/three/ParticleHero.tsx` — tweak:
- `COUNT` — particle density
- `palette` — colours array
- `vel[i3+1]` — upward drift speed
- `sz[i]` — particle size distribution

## Typography

- **Display:** Cormorant Garamond (Google Fonts)
- **Body:** Outfit (Google Fonts)

## Notes

- Custom cursor hides on touch devices automatically
- Three.js canvas is dynamically imported (`ssr: false`)
- GSAP context used throughout for clean cleanup
- Lenis is synced with ScrollTrigger via `gsap.ticker`
