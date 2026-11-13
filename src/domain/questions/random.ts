import type { Random } from './types';
export const seededRandom = (initial:number):Random => { let seed=initial;return ()=>((seed=(Math.imul(1664525,seed)+1013904223)>>>0)/4294967296); };
export function shuffle<T>(items:readonly T[],random:Random=Math.random):T[]{
 const result=items.slice();for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;
}
export function distractors<T>(list:readonly T[],value:(item:T)=>string,correct:string,count:number,random:Random,exclude?:(item:T)=>boolean):T[]{
 const seen=new Set([correct]),out:T[]=[];for(const item of shuffle(list,random)){if(exclude?.(item))continue;const v=value(item);if(seen.has(v))continue;seen.add(v);out.push(item);if(out.length>=count)break;}return out;
}
