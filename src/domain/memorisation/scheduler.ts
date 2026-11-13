import type {Passage} from '../questions/types';
import type {Exercise,Grade,MemoRecord} from './types';
export const DAY=864e5,DAYS=[0,1,3,7,14,30,60];
export const thresholds:Record<Exercise,number>={read:1,blank:.8,first:.75,ref:1,type:.9,prec:.97,recite:0};
export const stageNames:Record<Exercise,string>={read:'Read',blank:'Guided recall',first:'First letters',ref:'Reference',type:'Full recall',prec:'Precision',recite:'Recite'};
export function initialRecord(at:number):MemoRecord{return {cs:0,ls:0,bl:1,fl:0,box:-1,due:0,diff:0,lapses:0,tn:0,ts:0,tb:0,up:0,added:at,active:true};}
export function plan(item:Pick<Passage,'vs'>):[number,number][]{const p:[number,number][]=[];for(let k=0;k<item.vs.length;k++){if(k)p.push([k,k]);p.push([0,k]);}return p;}
export function stage(item:Passage,r:MemoRecord){const parts=plan(item),[a,b]=parts[Math.min(r.cs,parts.length-1)],stages:Exercise[]=r.cs===parts.length-1?['read','blank','first','ref','type','prec']:['read','blank','type'];return {a,b,text:item.vs.slice(a,b+1).join(' '),exercise:stages[r.ls],parts,stages};}
export function advance(item:Passage,record:MemoRecord,score:number,at:number):MemoRecord{
 const r={...record};delete r.draft;const {exercise,stages,parts}=stage(item,r);
 if(score<thresholds[exercise]){r.fl++;if(exercise==='blank')r.bl=Math.max(1,r.bl-1);return r;}
 if(exercise==='blank'&&r.bl<4){r.bl++;return r;}
 r.ls++;if(r.ls>=stages.length){r.ls=0;r.bl=1;r.cs++;}if(r.cs>=parts.length){r.box=0;r.due=at+6e5;r.up=at;}return r;
}
export const gradeOf=(score:number):Grade=>score>=.95?'got':score>=.75?'almost':'missed';
export function grade(record:MemoRecord,g:Grade,at:number):MemoRecord{const r={...record},b0=r.box;if(g==='got'){r.box=Math.min(6,b0+1);r.diff=Math.max(0,r.diff-1);if(r.box>b0)r.up=at;}else if(g==='missed'){r.diff++;r.lapses++;r.box=b0>=5?2:Math.max(0,b0-1);}let d=g==='almost'?Math.max(.5,DAYS[r.box]*.5):DAYS[r.box];if(r.diff>=2&&d>1)d*=.6;r.due=at+(d===0?6e5:d*DAY);return r;}
export const rank=(r:MemoRecord,at:number):number=>{const overdue=(at-r.due)/DAY;return (overdue>=1?0:r.diff>=2?1:r.box<=1?2:3)*1e14+r.due;};
export function reviewExercise(id:string,r:MemoRecord,at:number):Exercise{const eff=r.box-(r.diff>=2?2:0);return eff<=0?'blank':eff===1?'first':eff<4?'type':(((at/DAY|0)+id.length)%2?'recite':'prec');}
export const status=(r?:MemoRecord):string=>!r?'Not Started':r.active===false?'Paused':r.box<0?'Learning':r.box<5?'Reviewing':'Mastered';
