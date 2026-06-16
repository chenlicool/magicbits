# Changelog

All notable changes to MagicBits will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-06-04

### Added

- **11 layout modes** for generating ScatterBoards:
  - 🎯 Random scatter — purely random circular distribution
  - 📐 Grid — row/column grid with adjustable jitter
  - 🌀 Golden spiral — Fibonacci spiral (137.5° golden angle)
  - ⭕ Concentric rings — rings expanding outward from center
  - 🌊 Masonry — Pinterest-style waterfall layout
  - 🔷 Hex grid — honeycomb hexagonal grid
  - 💥 Starburst — radiating explosion from center
  - 🌿 Organic — sine-wave noise-based distribution
  - 🧲 Clusters — multi-attractor clustered grouping
  - 🐍 Zigzag — serpentine zigzag with alternating row direction
  - 🌪️ Vortex — involute spiral with progressive rotation
- **Reroll** feature — select an existing ScatterBoard and adjust parameters without duplicating layers
- **Full parameter controls**:
  - Copies per source (1–50)
  - Scale range (10%–200%)
  - Rotation (±0°–±180°)
  - Canvas size (200–10000px)
  - Grid columns & jitter (grid mode)
  - Overlap avoidance with adjustable gap
  - Random Z-depth (layer order shuffle)
- **Relaunch buttons** — right-click a ScatterBoard on canvas for quick reroll
- **Bilingual UI** — English & Chinese with auto language detection and in-panel toggle
- **Persistent config** — layout parameters saved as plugin data for reroll support
- **Collision detection** — push-apart algorithm for overlap avoidance
- **Offline operation** — no network access required

### Technical

- Manifest declares `"networkAccess": { "allowedDomains": ["none"] }`
- Plugin data stored under `scatterboard-config` key
- Figma API 1.0.0 with `documentAccess: "dynamic-page"`
- Vanilla JavaScript (ES5-compatible), no npm dependencies for runtime
- Validation scripts for release readiness checks

[1.0.0]: https://github.com/chenlicool/magicbits/releases/tag/v1.0.0
