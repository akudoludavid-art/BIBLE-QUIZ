import type {Random} from '../questions/types';
export const words=(text:string):string[]=>text.split(/\s+/).filter(Boolean);
// Preserve legacy comparison, not storage normalization. Original Unicode remains untouched.
export const norm=(word:string):string=>word.toLowerCase().replace(/’/g,"'").replace(/[^a-z0-9'-]/g,'');
export const normaliseReference=(s:string):string=>s.toLowerCase().replace(/[–—]/g,'-').replace(/[^a-z0-9:-]/g,'').replace(/^psalm(?!s)/,'psalms');
const stop=new Set('the a an and or but of to in on for with by as at is are was be that which who it he she they his her their him them not i ye thou thee thy thine my me we us our you your all unto shall will have hath from this these those'.split(' '));
export function pickBlanks(ws:string[],level:number,random:Random=Math.random):Set<number>{const k=Math.max(1,Math.round(ws.length*[.2,.4,.6,.85][level-1]));return new Set(ws.map((w,i)=>({i,s:(stop.has(norm(w))?0:norm(w).length>=4?3:1)+random()*(level>=3?2.5:1.2)})).sort((a,b)=>b.s-a.s).slice(0,k).map(x=>x.i));}
export type DiffKind='ok'|'miss'|'extra'|'moved'|'sim';
export type DiffOp=[DiffKind,string,string?];
export interface TextDiff{ops:DiffOp[];acc:number;omit:number;cnt:(kind:DiffKind)=>number}
export function diff(target:string,typed:string):TextDiff{
 const tw=words(target),T=tw.map(norm),uw=words(typed),U=uw.map(norm),n=T.length,m=U.length;
 const D:number[][]=Array.from({length:n+1},()=>new Array<number>(m+1).fill(0));
 for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)D[i][j]=T[i]===U[j]?D[i+1][j+1]+1:Math.max(D[i+1][j],D[i][j+1]);
 const ops:DiffOp[]=[];let i=0,j=0;while(i<n||j<m){if(i<n&&j<m&&T[i]===U[j]){ops.push(['ok',tw[i]]);i++;j++;}else if(i<n&&(j>=m||D[i+1][j]>=D[i][j+1])){ops.push(['miss',tw[i]]);i++;}else{ops.push(['extra',uw[j]]);j++;}}
 const ex=new Set(ops.filter(o=>o[0]==='extra').map(o=>norm(o[1])));
 for(let k=0;k<ops.length;k++){const o=ops[k],nx=ops[k+1];if(o[0]==='miss'&&nx&&nx[0]==='extra'){const a=norm(o[1]),b=norm(nx[1]);if(a.slice(0,3)===b.slice(0,3)&&Math.abs(a.length-b.length)<=3){ops.splice(k,2,['sim',o[1],nx[1]]);continue;}}if(o[0]==='miss'&&ex.has(norm(o[1])))o[0]='moved';}
 let run=0,omit=0,c=0;ops.forEach(o=>{if(o[0]==='miss'){if(++run===3)omit++;}else run=0;if(o[0]==='ok')c++;});return {ops,acc:n?c/Math.max(n,m||1):0,omit,cnt:kind=>ops.filter(o=>o[0]===kind).length};
}
export const isLong=(text:string):boolean=>text.length>220||text.split(/\n/).length>3||words(text).length>45;
export const firstLetterCue=(text:string):string=>words(text).map(w=>w.replace(/^([^A-Za-z0-9]*[A-Za-z0-9])([A-Za-z0-9'’]*)/,(_m,a:string,b:string)=>a+'_'.repeat(b.length))).join(' ');
