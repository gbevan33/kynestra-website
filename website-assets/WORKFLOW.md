# Kynestra label + COA preservation workflow

The canonical, versioned **website index** is `website-assets/registry.json` in this GitHub repository. Each product has a stable internal ID and asset URLs. Original 40x20mm PNG and print PDF files are also preserved in **ChatGPT Library** at `/Kynestra Biosciences/Website Assets/Labels/`. GitHub assets are not the same thing as Library backups.

## For every new label
1. Add or update the product record in `registry.json`, including its stable ID and `labelSvg` path. COA information remains in the registry/catalog and is not printed as a QR code.
2. Run `node scripts/generate-label-assets.mjs` to create the standard version 2 label: silver background, black Kynestra header, enlarged centered product name/strength/code, RUO disclaimer, and no QR code.
3. Confirm the generated SVG is present at `website-assets/labels/<slug>.svg` and include it in the same repository commit as the registry change.
4. Save the original PNG and 40x20mm PDF to the persistent Library folder; verify upload results.
5. Run `node scripts/generate-label-assets.mjs --check` and `node scripts/check-label-registry.mjs`.
6. Review the catalog COA destination and lookup code separately from the label artwork.
7. Only after a real inventory lot has been checked against the COA, change `inventoryLotMatched` to true; publication requires a separate explicit approval and catalog/deployment update.

## For every replacement or new COA
- Preserve the prior COA (do not overwrite historical copies); add source file or permanent source link; record testing laboratory, sample/accession/lot, date, and source URL.
- Confirm the actual lot on hand matches the report before setting `inventoryLotMatched` true.
- Update the registry/catalog COA destination and lookup information without changing the no-QR label artwork unless the product identity, strength, or internal code changes.
- Check link access from a browser without Drive login if the website must expose it publicly.

## Important limitation
A label or file created inside a ChatGPT chat is **not automatically synced** into GitHub. An upload/write step must actually run for each new file. This workflow and the GitHub validation action check repository changes, not new attachments or Drive files outside GitHub. No autonomous surveillance of new uploads is configured.

## Current known limits
- The customer catalog now reads catalog-visible products from `registry.json`; adding a record does not make it visible unless `catalogVisible` is explicitly set to `true`.
- `websitePublished` remains the stricter ordering state and requires a matched inventory lot, an approved positive price, and `available: true`.
- Retatrutide 15 mg now has a repository label and remains in the backlog until its public HTTPS COA destination is added.
- The inquiry form uses an email-draft fallback until a production POST endpoint is configured in `index.html`.
- Never include HGH in the Kynestra catalog.
