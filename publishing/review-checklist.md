# MagicBits Review Checklist

Run this checklist before submitting to Figma Community.

## Account and Submission

- [ ] Figma Desktop app installed.
- [ ] Two-factor authentication enabled on the publishing account.
- [ ] Plugin imported from `manifest.json` in Figma Desktop.
- [ ] Manifest has the final Figma-assigned plugin id before publishing updates.
- [ ] Support contact added.
- [ ] Community category set to `Design tools`.
- [ ] Comments preference chosen.
- [ ] Pricing left off unless you are approved for paid Community resources.

## Local Build

- [ ] `npm install` completed.
- [ ] `npm run build` passes.
- [ ] `node --check code.js` passes.
- [ ] `manifest.json` points to `code.js` and `ui.html`.
- [ ] `icon.png` is 128x128.
- [ ] Community thumbnail is 1920x1080.
- [ ] Carousel images are 1920x1080.

## Functional Test Matrix

- [ ] Figma Design file: no selection shows a clear prompt.
- [ ] Figma Design file: one shape generates a ScatterBoard.
- [ ] Figma Design file: multiple selected layers generate copies.
- [ ] Figma Design file: component selection creates instances.
- [ ] Random layout works.
- [ ] Grid layout works with auto columns.
- [ ] Grid layout works with manual columns and jitter.
- [ ] Spiral, circle, masonry, hex grid, starburst, organic, clusters, zigzag, and vortex modes run without errors.
- [ ] Avoid overlap can be enabled without freezing on a moderate board.
- [ ] Random layer order works.
- [ ] Selecting an existing ScatterBoard enables reroll mode.
- [ ] Reroll rearranges existing children without creating new copies.
- [ ] Relaunch buttons on a generated ScatterBoard trigger random/grid reroll.
- [ ] English/Chinese language toggle updates all visible UI text.
- [ ] Large copy count is acceptable, or the listing describes the performance limit.

## Listing Accuracy

- [ ] Listing description matches shipped functionality.
- [ ] Screenshots match the current UI and output.
- [ ] Privacy policy says no network access and no external storage.
- [ ] Data security answers match the manifest and implementation.
