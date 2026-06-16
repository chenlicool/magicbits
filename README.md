# MagicBits — ScatterBoard

> ✨ Turn selected layers into playful scatterboard layouts in seconds.

**MagicBits** is a [Figma](https://figma.com) plugin that transforms your selected components, frames, and shapes into dynamic, randomized **ScatterBoard** layouts. Great for moodboards, sticker sheets, component variety checks, and visual exploration.

![Figma plugin version](https://img.shields.io/badge/Figma-1.0.0-7C4DFF?style=flat-square)
![License](https://img.shields.io/github/license/chenlicool/magicbits?style=flat-square)
![Language](https://img.shields.io/badge/languages-JavaScript%20%7C%20HTML-ff69b4?style=flat-square)
![Network](https://img.shields.io/badge/network-offline-brightgreen?style=flat-square)
[![Figma Community](https://img.shields.io/badge/Figma_Community-MagicBits-FF9800?style=flat-square)](https://www.figma.com/community/plugin/1644375627139509918)

---

## ✨ Features

- **11 layout modes** — Random scatter, Grid, Golden spiral, Concentric rings, Masonry, Hex grid, Starburst, Organic, Clusters, Zigzag, Vortex
- **Reroll anytime** — Select an existing ScatterBoard and adjust parameters without duplicating layers
- **Full parameter control** — Copy count, scale range, rotation, canvas size, jitter, overlap avoidance, layer order
- **Bilingual UI** — English & Chinese, auto-detects browser language with in-panel toggle
- **Fully offline** — Runs locally in your Figma file, no network access required
- **Relaunch buttons** — Quick reroll right from the canvas context menu

---

## 🚀 Quick Start

### Install from Figma Community

1. Open the [MagicBits Figma Community page](https://www.figma.com/community/plugin/1644375627139509918)
2. Click **"Install"**
3. In Figma Desktop, right-click on canvas → **Plugins** → **MagicBits**

### Or load locally for development

```bash
git clone https://github.com/chenlicool/magicbits.git
cd magicbits
npm install
npm run build
```

Then in Figma Desktop:
1. Plugins → **Development** → **Import plugin from manifest**
2. Select `manifest.json`

---

## 📖 Usage

### Generate a new ScatterBoard

1. Select one or more **source layers** on the canvas (Component, Frame, Group, Text, Vector, Shape, Instance…)
2. Run **MagicBits** via Plugins menu
3. Choose a **layout mode** and tune the parameters
4. Click **Generate ScatterBoard**

### Reroll an existing board

1. Select an existing ScatterBoard frame on the canvas
2. Switch to the **Reroll** tab in the plugin panel
3. Adjust mode and parameters (scale will NOT change — only position, rotation, and layer order update)
4. Click **Reroll**

### Relaunch from canvas

After generating a board, right-click it and use the context menu buttons:
- **🎯 随机重排** / **Random reroll** — rerolls with random scatter mode
- **📐 网格重排** / **Grid reroll** — rerolls with grid mode

---

## 📐 Layout Modes

| Mode | Icon | Description |
|------|------|-------------|
| Random scatter | 🎯 | Purely random x/y positions in a circular distribution |
| Grid | 📐 | Row & column grid with adjustable jitter offset |
| Golden spiral | 🌀 | Fibonacci spiral (137.5° golden angle) distribution |
| Concentric rings | ⭕ | Circular rings expanding outward from center |
| Masonry | 🌊 | Pinterest-style waterfall layout |
| Hex grid | 🔷 | Honeycomb hexagonal grid |
| Starburst | 💥 | Radiating explosion from center |
| Organic | 🌿 | Sine-wave noise-based natural distribution |
| Clusters | 🧲 | Multi-attractor clustered grouping |
| Zigzag | 🐍 | Serpentine zigzag (alternating row direction) |
| Vortex | 🌪️ | Involute spiral with progressive rotation |

---

## ⚙️ Parameters

| Parameter | Range | Default | Description |
|-----------|-------|---------|-------------|
| Copies per source | 1–50 | 1 | Number of instances generated per source layer |
| Scale min | 10%–200% | 50% | Minimum random scale factor |
| Scale max | 10%–200% | 150% | Maximum random scale factor |
| Rotation | 0°–±180° | ±15° | Maximum random rotation applied |
| Canvas width | 200–10000 | 1440 | ScatterBoard frame width (px) |
| Canvas height | 200–10000 | 900 | ScatterBoard frame height (px) |
| Grid columns | 0–20 | Auto (0) | Fixed column count (0 = auto-calculate) |
| Jitter X | 0–200px | 40px | Horizontal jitter (grid mode) |
| Jitter Y | 0–200px | 40px | Vertical jitter (grid mode) |
| Avoid overlap | On/Off | Off | Push apart overlapping items |
| Overlap gap | 0–100px | 20px | Minimum gap between items |
| Randomize Z-depth | On/Off | Off | Randomize layer stacking order |

---

## 🛠️ Development

```bash
# Build & validate
npm run build

# Render publishing assets (screenshots, icons)
npm run render:assets

# Validate release readiness
npm run validate:release
```

### Project structure

```
magicbits/
├── manifest.json         # Figma plugin manifest
├── code.js               # Plugin logic (Figma sandbox)
├── ui.html               # Plugin user interface
├── package.json          # Dependencies & scripts
├── scripts/              # Build & publishing scripts
├── publishing/           # Figma Community release materials
│   ├── listing.md
│   ├── privacy-policy.md
│   ├── support.md
│   ├── data-security.md
│   └── review-checklist.md
└── .github/              # Issue & PR templates
```

---

## 🌐 i18n

MagicBits supports **English** and **Chinese (Simplified)**. The plugin detects your browser language automatically, and you can toggle languages with the button in the plugin panel header.

---

## 🔒 Privacy & Security

MagicBits **does not** collect, store, or transmit any data. It runs entirely inside your Figma file with no network access.

- [Privacy Policy](./publishing/privacy-policy.md)
- [Data Security](./publishing/data-security.md)
- Manifest: `"networkAccess": { "allowedDomains": ["none"] }`

---

## 📄 License

[MIT](./LICENSE)

---

## 💬 Support

- [Support guide](./publishing/support.md)
- Report issues: [GitHub Issues](https://github.com/chenlicool/magicbits/issues)
- Contact: chenlicool@foxmail.com

---

*Made with ❤️ by Leah*
