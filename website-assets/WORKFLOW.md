# Kynestra label + COA preservation workflow

The canonical, versioned **website index** is `website-assets/registry.json` in this GitHub repository. Each product has a stable internal ID and asset URLs. Original 40x20mm PNG and print PDF files are also preserved in **ChatGPT Library** at `/Kynestra Biosciences/Website Assets/Labels/`. GitHub assets are not the same thing as Library backups.

## For every new label
1. Create the silver background / black Kynestra header, correct strength/code, QR, and RUO disclaimer.
2. Save the original PNG and 40x20mm PDF to the persistent Library folder; verify upload results.
3. Add an SVG or other website-compatible image to `website-assets/labels/<slug>.svg` (or .png), with versioned paths when necessary.
4. Add/update the product entry in `registry.json`, including its QR target, COA URL, print path, filename, date, and verification state.
5. Run the repository label registry check; confirm the referenced file exists. Review the QR destination manually.
6. Only after a real inventory lot has been checked against the COA, change `inventoryLotMatched` to true; publication requires a separate explicit approval and catalog/deployment update.

## For every replacement or new COA
- Preserve the prior COA (do not overwrite historical copies); add source file or permanent source link; record testing laboratory, sample/accession/lot, date, and source URL.
- Confirm the actual lot on hand matches the report before setting `inventoryLotMatched` true.
- Update the label QR only if its destination is changing; save a new image/print file version and update the registry paths.
- Check link access from a browser without Drive login if the website must expose it publicly.

## Important limitation
A label or file created inside a ChatGPT chat is **not automatically synced** into GitHub. An upload/write step must actually run for each new file. This workflow and the GitHub validation action check repository changes, not new attachments or Drive files outside GitHub. No autonomous surveillance of new uploads is configured.

## Current known limits
- Current website product catalog is separately defined in `script.js`; registry changes alone do not publish products.
- SVG label QR art uses an external QR image service; it must load over the network.
- Existing catalog inventory is not yet migrated, and entries in registry backlog are not confirmed stored assets.
- Never include HGH in the Kynestra catalog.
