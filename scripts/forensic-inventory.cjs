/* Read-only AST inventory. Run with acorn/acorn-walk installed in the toolchain. */
const fs=require('node:fs'), crypto=require('node:crypto');
const acorn=require(process.env.BM_ACORN||'acorn'), walk=require(process.env.BM_ACORN_WALK||'acorn-walk');
const sources=['legacy/original/Bible_Mastery_Quiz_v14_Ultra.html','legacy/original/Bible_Mastery_Quiz_v13_Simplified_Memorisation.html'];
const all=[];
for(const file of sources){
 const html=fs.readFileSync(file,'utf8');
 const out={file,sha256:crypto.createHash('sha256').update(html).digest('hex'),bytes:Buffer.byteLength(html),sections:[],domIds:[],symbols:[],uses:[],styles:[],externalAssets:[],scripts:[]};
 const line=offset=>html.slice(0,offset).split('\n').length;
 for(const m of html.matchAll(/<section\b[^>]*id="([^"]+)"[^>]*>/g))out.sections.push({id:m[1],line:line(m.index)});
 for(const m of html.matchAll(/\bid="([^"]+)"/g))out.domIds.push({id:m[1],line:line(m.index)});
 for(const m of html.matchAll(/<symbol\b[^>]*>/g))out.symbols.push({tag:m[0],line:line(m.index)});
 for(const m of html.matchAll(/<use\b[^>]*>/g))out.uses.push({tag:m[0],line:line(m.index)});
 for(const m of html.matchAll(/<(?:script|link|img)\b[^>]*(?:src|href)="([^"]+)"[^>]*>/g))out.externalAssets.push({tag:m[0],line:line(m.index)});
 for(const m of html.matchAll(/<style>([\s\S]*?)<\/style>/g))out.styles.push({line:line(m.index),sha256:crypto.createHash('sha256').update(m[1]).digest('hex'),bytes:Buffer.byteLength(m[1]),media:[...m[1].matchAll(/@media[^\{]+/g)].map(x=>x[0]),animations:[...m[1].matchAll(/@keyframes\s+([^\{]+)/g)].map(x=>x[1])});
 for(const [i,m] of [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].entries()){
  const code=m[1],offset=line(m.index),ast=acorn.parse(code,{ecmaVersion:'latest',locations:true});
  const s={index:i,line:offset,bytes:Buffer.byteLength(code),functions:[],declarations:[],events:[],calls:[],mutations:[],persistence:[],timers:[],htmlWrites:[]};
  const loc=n=>offset+n.loc.start.line-1, text=n=>code.slice(n.start,n.end);
  walk.ancestor(ast,{
   FunctionDeclaration(n){s.functions.push({name:n.id.name,line:loc(n),endLine:offset+n.loc.end.line-1});},
   VariableDeclarator(n,anc){s.declarations.push({name:text(n.id),kind:n.init?.type,line:loc(n),scope:anc.filter(x=>/Function/.test(x.type)).map(x=>x.id?.name||'<callback>')});},
   AssignmentExpression(n){const x=text(n.left);if(/\.on\w+$/.test(x))s.events.push({target:x,line:loc(n),handler:text(n.right).slice(0,160)});if(/innerHTML/.test(x))s.htmlWrites.push({target:x,line:loc(n),source:text(n.right).slice(0,240)});s.mutations.push({target:x,line:loc(n)});},
   CallExpression(n,anc){const name=text(n.callee),f=[...anc].reverse().find(x=>x.type==='FunctionDeclaration');s.calls.push({caller:f?.id.name||'<top-level or callback>',callee:name,line:loc(n)});if(/addEventListener/.test(name))s.events.push({target:name,line:loc(n),event:n.arguments[0]?.value});if(/Storage|indexedDB|\.commit|\.setItem|\.getItem|\.removeItem/.test(name))s.persistence.push({call:text(n).slice(0,300),line:loc(n)});if(/(?:setInterval|setTimeout|clearInterval|clearTimeout|requestAnimationFrame)/.test(name))s.timers.push({call:text(n).slice(0,200),line:loc(n)});}
  });out.scripts.push(s);
 }
 all.push(out);
}
fs.writeFileSync('docs/evidence/phase0/source-inventory.json',JSON.stringify(all,null,2)+'\n');
console.log(all.map(x=>({file:x.file,scripts:x.scripts.length,sections:x.sections.length,symbols:x.symbols.length,ids:x.domIds.length,functions:x.scripts.reduce((n,s)=>n+s.functions.length,0),events:x.scripts.reduce((n,s)=>n+s.events.length,0)})));
