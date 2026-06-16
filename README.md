# MagicBits — ScatterBoard

> ✨ Turn selected layers into playful scatterboard layouts in seconds.
> ✨ 选中源组件，一键生成随机排布的白板布局。

<style>
.lang-toggle { display: flex; gap: 8px; margin: 12px 0; }
.lang-toggle label { padding: 4px 14px; border-radius: 20px; cursor: pointer; font-size: 13px; font-weight: 600; border: 2px solid #d0d7de; color: #656d76; transition: all 0.15s; }
.lang-toggle label:hover { border-color: #7C4DFF; color: #7C4DFF; }
#en:checked ~ .lang-toggle label[for="en"],
#zh:checked ~ .lang-toggle label[for="zh"] { background: #7C4DFF; color: #fff; border-color: #7C4DFF; }
.lang-en, .lang-zh { display: none; }
#en:checked ~ .lang-en { display: block; }
#zh:checked ~ .lang-zh { display: block; }
</style>

<input type="radio" name="lang" id="en" checked hidden>
<input type="radio" name="lang" id="zh" hidden>

<div class="lang-toggle">
  <label for="en">English</label>
  <label for="zh">中文</label>
</div>

---

<div class="lang-en">

**MagicBits** is a [Figma](https://figma.com) plugin that transforms your selected components, frames, and shapes into dynamic, randomized **ScatterBoard** layouts. Great for moodboards, sticker sheets, component variety checks, and visual exploration.

![Figma plugin version](https://img.shields.io/badge/Figma-1.0.0-7C4DFF?style=flat-square)
![License](https://img.shields.io/github/license/chenlicool/magicbits?style=flat-square)
![Language](https://img.shields.io/badge/languages-JavaScript%20%7C%20HTML-ff69b4?style=flat-square)
![Network](https://img.shields.io/badge/network-offline-brightgreen?style=flat-square)
[![Figma Community](https://img.shields.io/badge/Figma_Community-MagicBits-FF9800?style=flat-square)](https://www.figma.com/community/plugin/1644375627139509918)

## ✨ Features

- **11 layout modes** — Random scatter, Grid, Golden spiral, Concentric rings, Masonry, Hex grid, Starburst, Organic, Clusters, Zigzag, Vortex
- **Reroll anytime** — Select an existing ScatterBoard and adjust parameters without duplicating layers
- **Full parameter control** — Copy count, scale range, rotation, canvas size, jitter, overlap avoidance, layer order
- **Bilingual UI** — English & Chinese, auto-detects browser language with in-panel toggle
- **Fully offline** — Runs locally in your Figma file, no network access required
- **Relaunch buttons** — Quick reroll right from the canvas context menu

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

Then in Figma Desktop: Plugins → **Development** → **Import plugin from manifest** → select `manifest.json`

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
- 🎯 **Random reroll**
- 📐 **Grid reroll**

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

## 🌐 i18n

MagicBits supports **English** and **Chinese (Simplified)**. The plugin detects your browser language automatically, and you can toggle languages with the button in the plugin panel header.

## 🔒 Privacy & Security

MagicBits **does not** collect, store, or transmit any data. It runs entirely inside your Figma file with no network access.

- Manifest: `"networkAccess": { "allowedDomains": ["none"] }`
- [Privacy Policy](./publishing/privacy-policy.md)
- [Data Security](./publishing/data-security.md)

## 📄 License

[MIT](./LICENSE)

## 💬 Support

- [Support guide](./publishing/support.md)
- Report issues: [GitHub Issues](https://github.com/chenlicool/magicbits/issues)
- Contact: chenlicool@foxmail.com

---

*Made with ❤️ by Leah*

</div>

<div class="lang-zh">

**MagicBits** 是一个 [Figma](https://figma.com) 插件，可将你选中的组件、画板、形状等元素一键生成动态随机的 **ScatterBoard** 白板布局。适合灵感板、贴纸排版、组件样式对比和视觉探索。

![Figma plugin version](https://img.shields.io/badge/Figma-1.0.0-7C4DFF?style=flat-square)
![License](https://img.shields.io/github/license/chenlicool/magicbits?style=flat-square)
![Network](https://img.shields.io/badge/network-offline-brightgreen?style=flat-square)
[![Figma Community](https://img.shields.io/badge/Figma_Community-MagicBits-FF9800?style=flat-square)](https://www.figma.com/community/plugin/1644375627139509918)

## ✨ 功能特点

- **11 种布局模式** — 随机散布、网格排列、黄金螺旋、同心圆环、瀑布流、六角网格、爆炸辐射、有机分布、引力簇、蛇形走位、漩涡
- **随时重排** — 选中已有画板调整参数，无需重新生成副本
- **完整参数控制** — 副本数、缩放范围、旋转角度、画布尺寸、抖动偏移、重叠避免、图层顺序
- **双语界面** — 简体中文 + English，自动检测浏览器语言，面板内一键切换
- **完全离线** — 在 Figma 文件内本地运行，无需网络访问
- **快捷重排按钮** — 画布右键菜单即可快速重排

## 🚀 快速开始

### 从 Figma Community 安装

1. 打开 [MagicBits Figma Community 页面](https://www.figma.com/community/plugin/1644375627139509918)
2. 点击 **安装**
3. 在 Figma Desktop 中：右键画布 → **插件** → **MagicBits**

### 本地开发加载

```bash
git clone https://github.com/chenlicool/magicbits.git
cd magicbits
npm install
npm run build
```

然后在 Figma Desktop 中：Plugins → **Development** → **Import plugin from manifest** → 选择 `manifest.json`

## 📖 使用说明

### 生成新画板

1. 在画布上选中一个或多个**源图层**（组件、画板、编组、文本、矢量、形状、实例等）
2. 通过插件菜单运行 **MagicBits**
3. 选择**布局模式**并调整参数
4. 点击 **生成 ScatterBoard**

### 重排已有画板

1. 选中画布上的 ScatterBoard 画板
2. 切换到插件面板的 **重排** 标签页
3. 调整模式和参数（缩放不变，只更新位置、旋转和图层顺序）
4. 点击 **重排**

### 快捷重排

生成后右键画板可使用快捷按钮：
- 🎯 **随机重排**
- 📐 **网格重排**

## 📐 布局模式大全

| 模式 | 图标 | 说明 |
|------|------|------|
| 随机散布 | 🎯 | 圆形范围内完全随机位置 |
| 网格排列 | 📐 | 行列网格 + 可调抖动偏移 |
| 黄金螺旋 | 🌀 | 斐波那契螺旋（137.5°黄金角）分布 |
| 同心圆环 | ⭕ | 从中心向外扩散的圆环排列 |
| 瀑布流 | 🌊 | Pinterest 风格瀑布流 |
| 六角网格 | 🔷 | 蜂巢六角形网格 |
| 爆炸辐射 | 💥 | 从中心向外辐射爆炸式分布 |
| 有机分布 | 🌿 | 正弦波噪声自然分布 |
| 引力簇 | 🧲 | 多吸引点聚集分组 |
| 蛇形走位 | 🐍 | 蛇形曲折排列（行方向交替） |
| 漩涡 | 🌪️ | 渐开螺旋带递进旋转 |

## ⚙️ 参数说明

| 参数 | 范围 | 默认值 | 说明 |
|------|------|--------|------|
| 每组件副本数 | 1–50 | 1 | 每个源图层生成的副本数量 |
| 最小缩放 | 10%–200% | 50% | 最小随机缩放比例 |
| 最大缩放 | 10%–200% | 150% | 最大随机缩放比例 |
| 旋转角度 | 0°–±180° | ±15° | 最大随机旋转角度 |
| 画布宽度 | 200–10000 | 1440 | ScatterBoard 画板宽度（px） |
| 画布高度 | 200–10000 | 900 | ScatterBoard 画板高度（px） |
| 网格列数 | 0–20 | 自动(0) | 固定列数（0 = 自动计算） |
| X轴抖动 | 0–200px | 40px | 水平抖动（网格模式） |
| Y轴抖动 | 0–200px | 40px | 垂直抖动（网格模式） |
| 避免重叠 | 开/关 | 关 | 推开重叠的元素 |
| 重叠间距 | 0–100px | 20px | 元素之间的最小间距 |
| 随机打乱层级 | 开/关 | 关 | 随机排列图层上下顺序 |

## 🛠️ 开发

```bash
# 构建验证
npm run build

# 生成发布素材（截图、图标）
npm run render:assets

# 发布前检查
npm run validate:release
```

### 项目结构

```
magicbits/
├── manifest.json         # Figma 插件清单
├── code.js               # 主逻辑（Figma 沙箱）
├── ui.html               # 插件界面
├── package.json          # 依赖与脚本
├── scripts/              # 构建与发布脚本
├── publishing/           # Figma Community 发布材料
│   ├── listing.md        # 发布文案
│   ├── privacy-policy.md # 隐私政策
│   ├── support.md        # 支持说明
│   ├── data-security.md  # 数据安全
│   └── review-checklist.md
└── .github/              # Issue/PR 模板
```

## 🌐 国际化

MagicBits 支持 **简体中文** 和 **English**。插件会自动检测你的浏览器语言，也可以在面板顶部的按钮手动切换。

## 🔒 隐私与安全

MagicBits **不收集、不存储、不传输** 任何数据。插件完全在 Figma 文件本地运行，无网络访问。

- 清单声明: `"networkAccess": { "allowedDomains": ["none"] }`
- [隐私政策](./publishing/privacy-policy.md)
- [数据安全](./publishing/data-security.md)

## 📄 许可证

[MIT](./LICENSE)

## 💬 支持

- [支持说明](./publishing/support.md)
- 报告问题: [GitHub Issues](https://github.com/chenlicool/magicbits/issues)
- 联系邮箱: chenlicool@foxmail.com

---

*Leah ❤️ 制作*

</div>
