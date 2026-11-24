import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('website-assets/registry.json','utf8'));
if(manifest.schemaVersion!==1||!Array.isArray(manifest.products)) throw Error('Invalid registry schema');
const ids=new Set();let partial=0;
for(const p of manifest.products){
 for(const key of ['id','name','strength','labelSvg','coaUrl','status','catalogDescription','productImage']){
  if(typeof p[key]!=='string'||!p[key].trim()) throw Error(`${p.id||'unknown'}: missing ${key}`);
 }
 if(ids.has(p.id)) throw Error('Duplicate ID: '+p.id);ids.add(p.id);
 if(!fs.existsSync(p.labelSvg)) throw Error('Missing website asset: '+p.labelSvg);
 if(!fs.existsSync(p.productImage)) throw Error('Missing product image: '+p.id);
 if(new URL(p.coaUrl).protocol!=='https:') throw Error('Non-HTTPS COA URL: '+p.id);
 if(p.inventoryLotMatched!==true&&p.websitePublished===true) throw Error('Unverified lot published: '+p.id);
 if(typeof p.catalogVisible!=='boolean') throw Error('Missing catalog visibility: '+p.id);
 if(typeof p.available!=='boolean'||typeof p.inquiryOnly!=='boolean') throw Error('Missing availability state: '+p.id);
 if(p.priceUsd!==null&&(!Number.isFinite(p.priceUsd)||p.priceUsd<=0)) throw Error('Invalid price: '+p.id);
 if(p.websitePublished===true){
  if(p.available!==true) throw Error('Published product unavailable: '+p.id);
  if(!Number.isFinite(p.priceUsd)||p.priceUsd<=0) throw Error('Published product missing price: '+p.id);
 }
 if(/\bHGH\b/i.test(p.name)) throw Error('HGH excluded');
 if(p.status==='assets_saved_batch_unverified'){
  if(!p.originalPngLibrary||!p.printPdfLibrary)throw Error('Archived originals missing: '+p.id);
 }else if(p.status==='website_rendition_saved_original_missing')partial++;
 else throw Error('Unknown migration status: '+p.id);
}
console.log('Label registry OK:',manifest.products.length,'products;',partial,'awaiting archival originals.');
