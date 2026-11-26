# Kynestra repository rules

## Product labels

- Every newly created Kynestra product label must be added to this repository in the same change.
- Add or update the product in `website-assets/registry.json`, including its stable ID and `labelSvg` path.
- Generate the SVG with `node scripts/generate-label-assets.mjs`; do not hand-build a different layout.
- Standard labels must use format version 2: silver background, black Kynestra header, enlarged centered product name/strength/code, RUO disclaimer, and no QR code.
- COA URLs and verification lookup codes belong in the registry and website catalog, not on the product label.
- Preserve original PNG/PDF and COA copies in the designated persistent file location when available.
- Never add HGH to the catalog.
- Before committing, run `node scripts/generate-label-assets.mjs --check` and `node scripts/check-label-registry.mjs`.
