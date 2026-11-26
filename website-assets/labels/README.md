# Kynestra website label assets

These SVG files are generated website renditions of the standard 40 × 20 mm Kynestra label.

## Standard format — version 2

- Silver background
- Black `Kynestra Biosciences` header
- Enlarged, centered product name
- Enlarged, centered labeled strength
- Centered internal Kynestra product ID
- Research-use-only disclaimer
- No QR code or COA URL on the label

COA links, laboratory details, and verification lookup codes are maintained in `../registry.json` and displayed through the website catalog.

Do not edit individual SVGs manually. Add or update the registry record and run:

```sh
node scripts/generate-label-assets.mjs
```

Validate before committing:

```sh
node scripts/generate-label-assets.mjs --check
node scripts/check-label-registry.mjs
```

Every new label and its registry update must be included in the same repository change. Original PNG/PDF files and supplied COA copies remain preserved in the designated persistent file location when available. A stored COA source is not a claim that an inventory lot has been matched.
