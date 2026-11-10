/* Local-only storage. Existing v1 and v2 keys are retained. */
const Storage14=(()=>{
 const blocked=new Set(['__proto__','prototype','constructor']);
 function safeParse(text){return JSON.parse(text,(k,v)=>{if(blocked.has(k))throw Error('Unsafe backup key');return v;});}
 function commit(changes){const before={};try{for(const k of Object.keys(changes))before[k]=localStorage.getItem(k);for(const [k,v] of Object.entries(changes))localStorage.setItem(k,v);return true;}catch(e){for(const [k,v] of Object.entries(before)){try{if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}catch{}}alert('Changes could not be saved. Browser storage may be full or unavailable. Export a backup before closing this page.');return false;}}
 function mergeBackup(o,current,custom){if(!o||!o.memo||!o.memo.items||Array.isArray(o.memo.items)||typeof o.memo.items!=='object')throw Error('Invalid memorisation backup');
 for(const [id,r] of Object.entries(o.memo.items)){if(blocked.has(id)||!r||typeof r!=='object'||!Number.isInteger(r.box)||r.box< -1||r.box>6)throw Error('Invalid learning record');}
 if(o.custom!==undefined&&!Array.isArray(o.custom))throw Error('Invalid custom passages');
 const merged=new Map(custom.map(x=>[x.id,x]));const items={...current.items};
 for(const raw of o.custom||[]){if(!raw||typeof raw.id!=='string'||!raw.id.startsWith('U|')||['book','verse','text'].some(k=>typeof raw[k]!=='string'||!raw[k].trim()))throw Error('Invalid custom passage');let id=raw.id;
 const same=(a,b)=>a.book===b.book&&a.verse===b.verse&&a.text===b.text;
 if(merged.has(id)&&!same(merged.get(id),raw)){const prior=[...merged.values()].find(x=>x.id.startsWith(id+'|restored-')&&same(x,raw));id=prior?.id||(id+'|restored-'+Date.now()+'-'+merged.size);if(o.memo.items[raw.id]&&!items[id])items[id]=o.memo.items[raw.id];}merged.set(id,{...raw,id});}
 // Keep existing progress on conflicts; restore missing progress. Conflicting passage gets separate ID.
 for(const [id,r] of Object.entries(o.memo.items))if(!items[id])items[id]=r;
 return{memo:{...current,...o.memo,items},custom:[...merged.values()]};}
 return{commit,safeParse,mergeBackup};
})();
