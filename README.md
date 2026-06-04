# MagicBits — ScatterBoard

Figma 插件：选中源组件，一键生成随机比例/旋转/排布的白板布局。

## 安装 & 发布前检查

```bash
cd figma-plugin
npm install
npm run render:assets
npm run build
```

`npm run build` 会检查 `code.js` 语法、manifest、图标尺寸、发布文档和 Community 图片尺寸。

## 在 Figma 中加载

1. 打开 Figma Desktop
2. Plugins → Development → Import plugin from manifest
3. 选择 `figma-plugin/manifest.json`

## 使用方式

1. 在画布上选中一个或多个**源组件**（Component / Frame / Group 等）
2. 运行 **MagicBits** 插件
3. 调整参数（副本数、缩放范围、旋转角度、布局模式）
4. 点击 **生成 ScatterBoard**

## 布局模式

| 模式 | 说明 |
|------|------|
| 🎯 随机散布 | 纯随机 x/y 位置 |
| 📐 网格排列 | 行列网格 + 可调抖动偏移 |

## 发布材料

发布用文案和审核材料在 `publishing/`：

- `listing.md`：Community 页面名称、tagline、描述、关键词、更新说明
- `privacy-policy.md`：隐私政策草稿
- `support.md`：支持说明和已知限制
- `data-security.md`：Figma Data security 问卷草稿
- `review-checklist.md`：提交审核前测试清单
- `assets/`：1920×1080 主缩略图和轮播图

## 项目结构

```
figma-plugin/
├── manifest.json   # Figma 插件清单
├── code.js         # 主逻辑（Figma 沙箱）
├── ui.html         # 插件 UI 面板
├── package.json    # 依赖
├── scripts/        # 发布素材生成和校验脚本
└── publishing/     # Community 发布材料
```
