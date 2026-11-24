# Kynestra Biosciences research catalog

Static, responsive research-use-only catalog with product records, website label assets, supplied documentation links, and a product-specific inquiry flow.

## Source of truth

- `website-assets/registry.json` — product identity, catalog display fields, documentation sources, pricing readiness, and verification state
- `website-assets/labels/` — website-compatible Kynestra label assets
- `script.js` — renders catalog-visible registry products and prepares inquiries
- `scripts/check-label-registry.mjs` — validates catalog and publication requirements

The catalog displays records where `catalogVisible` is `true`. This is an informational listing state, not a claim that an inventory lot has been matched or that a product is ready for ordering.

`websitePublished: true` is reserved for products that have:

- a matched inventory lot;
- an approved positive price;
- `available: true`; and
- complete catalog and image fields.

## Inquiry delivery

The form supports a JSON POST endpoint through the `data-endpoint` attribute on `#inquiry`. Until an endpoint is configured, it opens a prepared email draft to `kynestrabio@gmail.com`.

## Validation

Run:

```sh
node scripts/check-label-registry.mjs
```

The same check runs automatically in GitHub Actions when catalog registry or label assets change.

## Cloudflare Pages

Framework preset: None. Build command: blank. Output directory: `/`.

Before enabling ordering or payment collection, approve pricing, match inventory lots to their COAs, configure reliable inquiry delivery, and complete legal/compliance review. HGH is intentionally excluded.
