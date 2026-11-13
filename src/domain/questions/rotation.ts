import type {Random} from './types';
import {shuffle} from './random';
import {isRecord} from './selection';
export interface RotationBag{remaining:string[];seen:string[];recent:string[];inflight:string[]}
export interface RotationState{bags:Record<string,RotationBag>}
export const rotationKey='bibleQuizRotation_v2';
export function rotationState(raw?:unknown):RotationState{
 let x=raw;try{if(typeof raw==='string')x=JSON.parse(raw);}catch{x=null;}
 const state:RotationState={bags:{}};
 const arr=(v:unknown):string[]=>Array.isArray(v)?v.filter((s):s is string=>typeof s==='string'):[];
 if(isRecord(x)&&isRecord(x.bags))for(const [key,b] of Object.entries(x.bags)){if(!isRecord(b)||['__proto__','constructor','prototype'].includes(key))continue;state.bags[key]={remaining:arr(b.remaining),seen:arr(b.seen),recent:arr(b.recent),inflight:arr(b.inflight)};}
 return state;
}
// Stateful algorithm with injected state/RNG; no DOM, storage, clock or network access.
export class Rotation {
 constructor(readonly state:RotationState=rotationState(),private random:Random=Math.random){}
 peek(key:string):RotationBag{return this.state.bags[key]||(this.state.bags[key]={remaining:[],seen:[],recent:[],inflight:[]});}
 private sync(bag:RotationBag,ids:string[]):void{const valid=new Set(ids),rem=new Set<string>(),seen=new Set<string>();bag.remaining=bag.remaining.filter(i=>valid.has(i)&&!rem.has(i)&&rem.add(i));bag.seen=bag.seen.filter(i=>valid.has(i)&&!rem.has(i)&&!seen.has(i)&&seen.add(i));bag.recent=bag.recent.filter(i=>valid.has(i));bag.inflight=bag.inflight.filter(i=>valid.has(i));ids.filter(i=>!rem.has(i)&&!seen.has(i)).forEach(i=>bag.remaining.splice(Math.floor(this.random()*(bag.remaining.length+1)),0,i));}
 private releaseBag(bag:RotationBag):void{const back=bag.inflight;bag.inflight=[];back.slice().reverse().forEach(id=>{const si=bag.seen.indexOf(id);if(si>=0){bag.seen.splice(si,1);if(!bag.remaining.includes(id))bag.remaining.unshift(id);}const ri=bag.recent.lastIndexOf(id);if(ri>=0)bag.recent.splice(ri,1);});}
 draw(key:string,ids:string[],count:number,groupOf?:((id:string)=>string)|null,avoidGroups?:string[]):string[]{
  const bag=this.peek(key);this.releaseBag(bag);this.sync(bag,ids);const n=ids.length;count=Math.max(0,Math.min(count,n));if(groupOf&&new Set(ids.map(groupOf)).size<count)groupOf=null;
  const picked:string[]=[],pickedSet=new Set<string>(),groups=new Set(groupOf&&avoidGroups?avoidGroups:[]),leftover:string[]=[];let deferred:string[]=[],rebuilds=0;
  while(picked.length<count&&rebuilds<=4){if(!bag.remaining.length){rebuilds++;const owed=deferred.concat(leftover.splice(0));deferred=[];const owedSet=new Set(owed),win=Math.min(count,Math.floor(n/2)),avoid=new Set(bag.recent.slice(-win)),rest=ids.filter(i=>!owedSet.has(i)&&!pickedSet.has(i)),fresh=shuffle(rest.filter(i=>!avoid.has(i)),this.random),stale=shuffle(rest.filter(i=>avoid.has(i)),this.random);bag.remaining=owed.concat(fresh,stale,shuffle(picked,this.random));bag.seen=[];if(!bag.remaining.length)break;}
   const id=bag.remaining.shift();if(id===undefined)break;if(pickedSet.has(id)){leftover.push(id);continue;}if(groupOf&&rebuilds<2&&groups.has(groupOf(id))){deferred.push(id);continue;}picked.push(id);pickedSet.add(id);if(groupOf)groups.add(groupOf(id));bag.seen.push(id);
  }bag.remaining=deferred.concat(bag.remaining,leftover);bag.inflight=picked.slice();bag.recent=bag.recent.concat(picked).slice(-60);return picked;
 }
 markShown(key:string,id:string):void{const bag=this.peek(key),i=bag.inflight.indexOf(id);if(i>=0)bag.inflight.splice(i,1);}
 release(key:string):void{this.releaseBag(this.peek(key));}
}
