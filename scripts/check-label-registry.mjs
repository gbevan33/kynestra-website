import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('website-assets/registry.json','utf8'));
if(manifest.schemaVersion!==1||!Array.isArray(manifest.products)) throw Error('Invalid registry schema');
const ids=new Set();
for(const p of manifest.products){
 for(const key of ['id','name','strength','labelSvg','coaUrl','originalPngLibrary','printPdfLibrary']){
  if(typeof p[key]!=='string'||!p[key].trim()) throw Error(`${p.id||'unknown'}: missing ${key}`);
 }
 if(ids.has(p.id)) throw Error('Duplicate ID: '+p.id);ids.add(p.id);
 if(!fs.existsSync(p.labelSvg)) throw Error('Missing website asset: '+p.labelSvg);
 const u=new URL(p.coaUrl);if(!['https:'].includes(u.protocol)) throw Error('Non-HTTPS COA URL for '+p.id);
 if(p.inventoryLotMatched!==true && p.websitePublished===true) throw Error('Unverified lot published: '+p.id);
 if(p.name.toLowerCase()==='hgh') throw Error('HGH is excluded');
}
console.log('Label registry OK:',manifest.products.length,'stored product entries;',manifest.backlog?.length||0,'backlog entries.');
