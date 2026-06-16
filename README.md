# MagicBits — ScatterBoard

> ✨ Turn selected layers into playful scatterboard layouts in seconds.
> ✨ 选中源组件，一键生成随机排布的白板布局。

**MagicBits** is a [Figma](https://figma.com) plugin / Figma 插件 that transforms your selected components, frames, and shapes into dynamic, randomized **ScatterBoard** layouts. Great for moodboards, sticker sheets, component variety checks, and visual exploration.

![Figma plugin version](https://img.shields.io/badge/Figma-1.0.0-7C4DFF?style=flat-square)
![License](https://img.shields.io/github/license/chenlicool/magicbits?style=flat-square)
![Language](https://img.shields.io/badge/languages-JavaScript%20%7C%20HTML-ff69b4?style=flat-square)
![Network](https://img.shields.io/badge/network-offline-brightgreen?style=flat-square)
[![Figma Community](https://img.shields.io/badge/Figma_Community-MagicBits-FF9800?style=flat-square)](https://www.figma.com/community/plugin/1644375627139509918)

---

## ✨ Features / 功能

**EN**

- **11 layout modes** — Random scatter, Grid, Golden spiral, Concentric rings, Masonry, Hex grid, Starburst, Organic, Clusters, Zigzag, Vortex
- **Reroll anytime** — Select an existing ScatterBoard and adjust parameters without duplicating layers
- **Full parameter control** — Copy count, scale range, rotation, canvas size, jitter, overlap avoidance, layer order
- **Bilingual UI** — English & Chinese, auto-detects browser language with in-panel toggle
- **Fully offline** — Runs locally in your Figma file, no network access required
- **Relaunch buttons** — Quick reroll right from the canvas context menu

**中文**

- **11 种布局模式** — 随机散布、网格排列、黄金螺旋、同心圆环、瀑布流、六角网格、爆炸辐射、有机分布、引力簇、蛇形走位、漩涡
- **随时重排** — 选中已有画板调整参数，无需重新生成副本
- **完整参数控制** — 副本数、缩放范围、旋转角度、画布尺寸、抖动偏移、重叠避免、图层顺序
- **双语界面** — 简体中文 + English，自动检测浏览器语言，面板内一键切换
- **完全离线** — 在 Figma 文件内本地运行，无需网络访问
- **快捷重排按钮** — 画布右键菜单即可快速重排

---

## 🚀 Quick Start / 快速开始

### Install from Figma Community / 从 Figma Community 安装

1. Open the [MagicBits Figma Community page](https://www.figma.com/community/plugin/1644375627139509918) / 打开 [MagicBits Figma Community 页面](https://www.figma.com/community/plugin/1644375627139509918)
2. Click **"Install"** / 点击 **"安装"**
3. In Figma Desktop, right-click on canvas → **Plugins** → **MagicBits**

### Or load locally for development / 本地开发加载

```bash
git clone https://github.com/chenlicool/magicbits.git
cd magicbits
npm install
npm run build
```

然后在 Figma Desktop 中：Plugins → **Development** → **Import plugin from manifest** → 选择 `manifest.json`

---

## 📖 Usage / 使用说明

### Generate a new ScatterBoard / 生成新画板

1. Select one or more **source layers** on the canvas (Component, Frame, Group, Text, Vector, Shape, Instance…)
2. Run **MagicBits** via Plugins menu
3. Choose a **layout mode** and tune the parameters
4. Click **Generate ScatterBoard**

1. 在画布上选中一个或多个**源图层**（组件、画板、编组、文本、矢量、形状、实例等）
2. 通过插件菜单运行 **MagicBits**
3. 选择**布局模式**并调整参数
4. 点击 **生成 ScatterBoard**

### Reroll an existing board / 重排已有画板

1. Select an existing ScatterBoard frame on the canvas
2. Switch to the **Reroll** tab in the plugin panel
3. Adjust mode and parameters (scale will NOT change — only position, rotation, and layer order update)
4. Click **Reroll**

1. 选中画布上的 ScatterBoard 画板
2. 切换到插件面板的 **重排** 标签页
3. 调整模式和参数（缩放不变，只更新位置、旋转和图层顺序）
4. 点击 **重排**

### Relaunch from canvas / 快捷重排

After generating a board, right-click it and use the context menu buttons / 生成后右键画板可使用快捷按钮：

- 🎯 **随机重排** / Random reroll
- 📐 **网格重排** / Grid reroll

---

## 📐 Layout Modes / 布局模式大全

| Mode / 模式 | Icon | Description / 说明 |
|-------------|------|--------------------|
| Random scatter / 随机散布 | 🎯 | Purely random x/y positions in a circular distribution / 圆形范围内完全随机位置 |
| Grid / 网格排列 | 📐 | Row & column grid with adjustable jitter offset / 行列网格 + 可调抖动偏移 |
| Golden spiral / 黄金螺旋 | 🌀 | Fibonacci spiral (137.5° golden angle) / 斐波那契螺旋（137.5°黄金角） |
| Concentric rings / 同心圆环 | ⭕ | Circular rings expanding outward from center / 从中心向外扩散的圆环 |
| Masonry / 瀑布流 | 🌊 | Pinterest-style waterfall layout / Pinterest 风格瀑布流 |
| Hex grid / 六角网格 | 🔷 | Honeycomb hexagonal grid / 蜂巢六角网格 |
| Starburst / 爆炸辐射 | 💥 | Radiating explosion from center / 从中心辐射爆炸式分布 |
| Organic / 有机分布 | 🌿 | Sine-wave noise-based natural distribution / 正弦波噪声自然分布 |
| Clusters / 引力簇 | 🧲 | Multi-attractor clustered grouping / 多吸引点聚集分组 |
| Zigzag / 蛇形走位 | 🐍 | Serpentine zigzag (alternating row direction) / 蛇形曲折排列（行方向交替） |
| Vortex / 漩涡 | 🌪️ | Involute spiral with progressive rotation / 渐开螺旋带递进旋转 |

---

## ⚙️ Parameters / 参数说明

| Parameter / 参数 | Range / 范围 | Default / 默认 | Description / 说明 |
|-----------------|-------------|---------------|-------------------|
| Copies per source / 每组件副本数 | 1–50 | 1 | Number of instances generated per source layer / 每个源生成的副本数量 |
| Scale min / 最小缩放 | 10%–200% | 50% | Minimum random scale factor / 最小随机缩放比例 |
| Scale max / 最大缩放 | 10%–200% | 150% | Maximum random scale factor / 最大随机缩放比例 |
| Rotation / 旋转 | 0°–±180° | ±15° | Maximum random rotation applied / 最大随机旋转角度 |
| Canvas width / 画布宽 | 200–10000 | 1440 | ScatterBoard frame width (px) |
| Canvas height / 画布高 | 200–10000 | 900 | ScatterBoard frame height (px) |
| Grid columns / 网格列数 | 0–20 | Auto (0) | Fixed column count (0 = auto-calculate) / 固定列数（0 = 自动计算） |
| Jitter X / X轴抖动 | 0–200px | 40px | Horizontal jitter (grid mode) / 水平抖动（网格模式） |
| Jitter Y / Y轴抖动 | 0–200px | 40px | Vertical jitter (grid mode) / 垂直抖动（网格模式） |
| Avoid overlap / 避免重叠 | On/Off | Off | Push apart overlapping items / 推开重叠的元素 |
| Overlap gap / 重叠间距 | 0–100px | 20px | Minimum gap between items / 元素之间的最小间距 |
| Randomize Z-depth / 打乱层级 | On/Off | Off | Randomize layer stacking order / 随机排列图层上下顺序 |

---

## 🛠️ Development / 开发

```bash
# Build & validate / 构建验证
npm run build

# Render publishing assets / 生成发布素材
npm run render:assets

# Validate release readiness / 发布前检查
npm run validate:release
```

### Project structure / 项目结构

```
magicbits/
├── manifest.json         # Figma plugin manifest / 插件清单
├── code.js               # Plugin logic / 主逻辑（Figma 沙箱）
├── ui.html               # Plugin UI / 插件界面
├── package.json          # Dependencies & scripts / 依赖与脚本
├── scripts/              # Build & publishing scripts / 构建与发布脚本
├── publishing/           # Figma Community release materials / 发布材料
│   ├── listing.md        # Community listing copy / 发布文案
│   ├── privacy-policy.md # Privacy policy / 隐私政策
│   ├── support.md        # Support guide / 支持说明
│   ├── data-security.md  # Data security / 数据安全
│   └── review-checklist.md
└── .github/              # Issue & PR templates / Issue/PR 模板
```

---

## 🌐 i18n / 国际化

MagicBits supports **English** and **Chinese (Simplified)**. The plugin detects your browser language automatically, and you can toggle languages with the button in the plugin panel header.

MagicBits 支持 **简体中文** 和 **English**。插件会自动检测你的浏览器语言，也可以在面板顶部的按钮手动切换。

---

## 🔒 Privacy & Security / 隐私与安全

MagicBits **does not** collect, store, or transmit any data. It runs entirely inside your Figma file with no network access.

MagicBits **不收集、不存储、不传输** 任何数据。插件完全在 Figma 文件本地运行，无网络访问。

- Manifest / 清单: `"networkAccess": { "allowedDomains": ["none"] }`
- [Privacy Policy / 隐私政策](./publishing/privacy-policy.md)
- [Data Security / 数据安全](./publishing/data-security.md)

---

## 📄 License / 许可证

[MIT](./LICENSE)

---

## 💬 Support / 支持

- [Support guide / 支持说明](./publishing/support.md)
- Report issues / 报告问题: [GitHub Issues](https://github.com/chenlicool/magicbits/issues)
- Contact / 联系: chenlicool@foxmail.com

---

*Made with ❤️ by Leah*
