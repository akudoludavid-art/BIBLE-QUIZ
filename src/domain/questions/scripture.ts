import {content} from '../../data/content';
import type {GeneratedQuestion,Random,Scripture,ScriptureMode} from './types';
import {distractors,shuffle} from './random';
export const ntBooks=new Set(content.ntBooks);
export const allBooks=[...new Set(content.scriptures.map(x=>x.book))];
export const scriptureModes:Record<ScriptureMode,string>={all:'All Scripture',ot:'Old Testament',nt:'New Testament',book:'Book Practice',parables:'Parables of Christ',miracles:'Miracles of Christ',memo:'My Memorised Verses'};
export function scripturePool(mode:ScriptureMode,book:string,activeIds:ReadonlySet<string>):Scripture[]{
 if(mode==='book')return content.scriptures.filter(x=>x.book===book);
 if(mode==='ot')return content.scriptures.filter(x=>!ntBooks.has(x.book));
 if(mode==='nt')return content.scriptures.filter(x=>ntBooks.has(x.book));
 if(mode==='memo')return content.scriptures.filter(x=>activeIds.has(x.book+'|'+x.ref));
 return content.scriptures;
}
export function scripturePlan(mode:ScriptureMode,book:string,activeIds:ReadonlySet<string>){
 if(mode==='parables')return {key:'scr:parables',ids:content.parables.flatMap(p=>['name','ref'].map(k=>`P|${p.name}|${k}`)),count:20,group:(id:string)=>id.split('|').slice(0,2).join('|')};
 if(mode==='miracles')return {key:'scr:miracles',ids:content.miracles.flatMap(p=>['name','ref'].map(k=>`M|${p.name}|${k}`)),count:20,group:(id:string)=>id.split('|').slice(0,2).join('|')};
 const pool=scripturePool(mode,book,activeIds);return {key:'scr:'+mode+(mode==='book'?':'+book:''),ids:pool.flatMap(p=>['book','ref','fill'].map(k=>`S|${p.book}|${p.ref}|${k}`)),count:mode==='book'?Math.min(10,Math.max(5,pool.length*2)):20,group:(id:string)=>id.split('|').slice(0,3).join('|')};
}
export function buildScripture(id:string,random:Random=Math.random):GeneratedQuestion{
 const parts=id.split('|'),tag=parts[0];
 if(tag==='P'){
  const p=content.parables.find(x=>x.name===parts[1]);if(!p)throw Error('Unknown parable ID '+id);const exp=`${p.name} — ${p.ref}. ${p.theme}`;
  if(parts[2]==='name'){const o=distractors(content.parables,x=>x.name,p.name,3,random,x=>x.ref===p.ref);return {id,q:`Which parable is found at ${p.ref}?`,ans:p.name,opts:shuffle([p.name,...o.map(x=>x.name)],random),exp};}
  const o=distractors(content.parables,x=>x.ref,p.ref,3,random);return {id,q:`Which reference contains the parable “${p.name}”?`,ans:p.ref,opts:shuffle([p.ref,...o.map(x=>x.ref)],random),exp};
 }
 if(tag==='M'){
  const p=content.miracles.find(x=>x.name===parts[1]);if(!p)throw Error('Unknown miracle ID '+id);const exp=`${p.name} — ${p.ref}.`;
  if(parts[2]==='ref'){const o=distractors(content.miracles,x=>x.ref,p.ref,3,random);return {id,q:`Where is this miracle recorded: ${p.name}?`,ans:p.ref,opts:shuffle([p.ref,...o.map(x=>x.ref)],random),exp};}
  const o=distractors(content.miracles,x=>x.name,p.name,3,random,x=>x.ref===p.ref);return {id,q:`Which miracle is recorded at ${p.ref}?`,ans:p.name,opts:shuffle([p.name,...o.map(x=>x.name)],random),exp};
 }
 const p=content.scriptures.find(x=>x.book===parts[1]&&x.ref===parts[2]);if(!p)throw Error('Unknown Scripture ID '+id);
 const kind=parts[3],global=content.scriptures.filter(x=>x.book!==p.book),exp=`${p.book} ${p.ref} (KJV): “${p.text}”`;
 if(kind==='book'){const o=distractors(global,x=>x.book,p.book,3,random);return {id,q:`“${p.text}”\n\nWhich book is this KJV passage from?`,ans:p.book,opts:shuffle([p.book,...o.map(x=>x.book)],random),exp};}
 if(kind==='ref'){const value=(x:Scripture)=>`${x.book} ${x.ref}`,o=distractors(global,value,value(p),3,random);return {id,q:`Which reference matches this KJV passage?\n\n“${p.text}”`,ans:value(p),opts:shuffle([value(p),...o.map(value)],random),exp};}
 if(kind!=='fill')throw Error('Unknown Scripture form '+kind);
 const words=p.text.split(' '),cut=Math.min(words.length-1,Math.max(2,Math.floor(words.length*.72))),lead=words.slice(0,cut).join(' '),tail=words.slice(cut).join(' '),tl=Math.max(2,words.length-cut),value=(x:Scripture)=>x.text.split(' ').slice(-tl).join(' '),o=distractors(global,value,tail,3,random);
 return {id,q:`Complete the KJV wording:\n\n“${lead} …”`,ans:tail,opts:shuffle([tail,...o.map(value)],random),exp};
}
