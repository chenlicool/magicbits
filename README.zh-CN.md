# MagicBits — ScatterBoard 白板散布生成器

> ✨ 选中源组件，一键生成随机排布的白板布局。

🌐 [English](./README.md) | **中文**

---

**MagicBits** 是一个 [Figma](https://figma.com) 插件，可将你选中的组件、画板、形状等元素一键生成动态随机的 **ScatterBoard** 白板布局。适合灵感板、贴纸排版、组件样式对比和视觉探索。

![Figma plugin version](https://img.shields.io/badge/Figma-1.0.0-7C4DFF?style=flat-square)
![License](https://img.shields.io/github/license/chenlicool/magicbits?style=flat-square)
![Network](https://img.shields.io/badge/network-offline-brightgreen?style=flat-square)
[![Figma Community](https://img.shields.io/badge/Figma_Community-MagicBits-FF9800?style=flat-square)](https://www.figma.com/community/plugin/1644375627139509918)

---

## ✨ 功能特点

- **11 种布局模式** — 随机散布、网格排列、黄金螺旋、同心圆环、瀑布流、六角网格、爆炸辐射、有机分布、引力簇、蛇形走位、漩涡
- **随时重排** — 选中已有画板调整参数，无需重新生成副本，位置/旋转/层级重新计算
- **完整参数控制** — 副本数、缩放范围、旋转角度、画布尺寸、抖动偏移、重叠避免、图层顺序
- **双语界面** — 简体中文 + English，自动检测浏览器语言，面板内一键切换
- **完全离线** — 在 Figma 文件内本地运行，无网络访问
- **快捷重排按钮** — 画布右键菜单即可快速重排

---

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

---

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

---

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

---

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

---

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

---

## 🌐 国际化

MagicBits 支持 **简体中文** 和 **English**。插件会自动检测你的浏览器语言，也可以在面板顶部的按钮手动切换。

---

## 🔒 隐私与安全

MagicBits **不收集、不存储、不传输** 任何数据。插件完全在 Figma 文件本地运行，无网络访问。

- 清单声明: `"networkAccess": { "allowedDomains": ["none"] }`
- [隐私政策](./publishing/privacy-policy.md)
- [数据安全](./publishing/data-security.md)

---

## 📄 许可证

[MIT](./LICENSE)

---

## 💬 支持

- [支持说明](./publishing/support.md)
- 报告问题: [GitHub Issues](https://github.com/chenlicool/magicbits/issues)
- 联系邮箱: chenlicool@foxmail.com

---

*Leah ❤️ 制作*
