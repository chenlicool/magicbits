# MagicBits Privacy Policy

Effective date: 2026-06-04

MagicBits does not collect, store, transmit, sell, or share personal data.

The plugin runs locally inside Figma or FigJam. It reads the layers you select only to duplicate and arrange them in the current file. It does not send your file content, layer names, text content, account information, or usage activity to any external server.

MagicBits declares no network access in its plugin manifest:

```json
{
  "networkAccess": {
    "allowedDomains": ["none"]
  }
}
```

The plugin may store layout settings as plugin data on ScatterBoard frames inside your own Figma file so that those boards can be rerolled later. This data remains in the file and is not transmitted by MagicBits.

For support or privacy questions, contact chenlicool@foxmail.com.
