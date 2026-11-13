import {content} from '../../data/content';
import {ntBooks} from '../questions/scripture';
import {shuffle} from '../questions/random';
import type {Passage,Random} from '../questions/types';
import type {CustomScripture,MemoState} from './types';
import {rank,status} from './scheduler';
export function topicsFor(text:string):string[]{const found=Object.entries(content.memorisation.topics).filter(([,rx])=>new RegExp(rx.source,rx.flags).test(text)).map(([key])=>key);return found.length?found:['Other'];}
export function prepareCustom(raw:CustomScripture):Passage|null{const book=raw.book.trim(),verse=raw.verse.trim(),text=raw.text;if(!book||!verse||!text.trim())return null;return {id:raw.id,book,verse,ref:book+' '+verse,vs:[text],text,nt:ntBooks.has(book),custom:true,tp:topicsFor(text)};}
export function makeLibrary(custom:readonly CustomScripture[]):Passage[]{const library=content.memorisation.library.slice(),ids=new Set(library.map(x=>x.id));for(const raw of custom){const p=prepareCustom(raw);if(p&&!ids.has(p.id)){library.push(p);ids.add(p.id);}}return library;}
export function allMemoIds(state:MemoState,library:readonly Passage[]):string[]{const ids=new Set(library.map(x=>x.id));return Object.keys(state.items).filter(id=>ids.has(id));}
export const activeIds=(s:MemoState,lib:readonly Passage[]):string[]=>allMemoIds(s,lib).filter(id=>s.items[id].active!==false);
export const dueIds=(s:MemoState,lib:readonly Passage[],at:number):string[]=>activeIds(s,lib).filter(id=>s.items[id].box>=0&&s.items[id].due<=at).sort((a,b)=>rank(s.items[a],at)-rank(s.items[b],at));
export interface LibraryFilters {t:string;tp:string;bk:string;q:string;s:string;n:number;source:string}
export const initialFilters=():LibraryFilters=>({t:'All',tp:'All',bk:'All',q:'',s:'All',n:30,source:'All'});
export const filterLibrary=(lib:readonly Passage[],s:MemoState,f:LibraryFilters):Passage[]=>lib.filter(x=>(f.t==='All'||(f.t==='New Testament')===x.nt)&&(f.tp==='All'||x.tp.includes(f.tp))&&(f.bk==='All'||x.book===f.bk)&&(f.s==='All'||status(s.items[x.id])===f.s)&&(f.source==='All'||x.custom)&&(x.ref+' '+x.text).toLowerCase().includes(f.q.toLowerCase()));
export function referenceOptions(it:Passage,lib:readonly Passage[],random:Random):string[]{const same=shuffle(lib.filter(x=>x.id!==it.id&&x.book===it.book),random),other=shuffle(lib.filter(x=>x.book!==it.book),random);return shuffle([it.ref,...[...same,...other].map(x=>x.ref).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3)],random);}
export function contextOptions(it:Passage,random:Random):string[]{const books=shuffle([...new Set(content.scriptures.filter(x=>ntBooks.has(x.book)===it.nt&&x.book!==it.book).map(x=>x.book))],random).slice(0,3);return shuffle([it.book,...books],random);}
