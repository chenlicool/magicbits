# Contributing to MagicBits

Thanks for your interest in contributing to MagicBits! 🎉

This document outlines how to set up the development environment, code style guidelines, and the pull request process.

---

## 🚀 Development Setup

```bash
git clone https://github.com/chenlicool/magicbits.git
cd magicbits
npm install
```

There is no build step for the plugin code — `code.js` is vanilla JavaScript with no transpilation. The `npm run build` command runs validation checks only.

### Development workflow

1. Make changes to `code.js` (plugin logic) or `ui.html` (plugin UI)
2. In Figma Desktop: Plugins → **Development** → **Import plugin from manifest** → select `manifest.json`
3. Edit and reload: make changes, then run **Plugins → Run Last Plugin** to test

### Validation

```bash
npm run build
# Runs: node --check code.js && node scripts/validate-release.mjs
```

```bash
npm run validate:release
# Runs manifest checks, icon dimensions, publishing docs completeness
```

---

## 📝 Code Style

- **JavaScript**: ES5-compatible (Figma plugin sandbox), avoid arrow functions and `const`/`let`
- **HTML**: Minimal vanilla JS, no framework
- **CSS**: Custom properties for theming, no preprocessors
- **Formatting**: 2-space indentation, semicolons required

### Plugin data

When saving configuration to Figma node plugin data, use the key `scatterboard-config` and store `JSON.stringify`-ed config objects. See `code.js` for examples.

### i18n

UI strings are maintained in both `code.js` and `ui.html` under parallel `zh`/`en` objects. When adding new text:
1. Add entries to both language objects
2. Add `data-i18n` attribute in the HTML element
3. Verify the UI renders correctly in both languages

---

## 🔧 Pull Request Process

1. **Fork** the repo and create a branch from `main`
2. **Make your changes** following the code style above
3. **Run validation**: `npm run build`
4. **Test in Figma**: load the plugin and verify your changes
5. **Submit a PR** with a clear description of what you changed and why

### PR title format

Use conventional commits:

```
feat: add new layout mode
fix: handle edge case with empty selection
docs: update README with new screenshots
i18n: add German translation
chore: update validation script
```

---

## 🐛 Reporting Issues

- Bug reports: [Open a Bug Report](https://github.com/chenlicool/magicbits/issues/new?template=bug_report.md)
- Feature requests: [Open a Feature Request](https://github.com/chenlicool/magicbits/issues/new?template=feature_request.md)

---

## 🌐 Translations

To contribute a translation:
1. Add your language key to the `messages` object in `ui.html`
2. Add matching `MSG` object in `code.js`
3. Add the language detection in `detectInitialLang()` if needed

---

## 📜 Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) — we expect all contributors to follow it.

---

*Questions? Contact chenlicool@foxmail.com*
