// Semantic port of original MasteryEngine. Selection weights are intentionally unchanged.
import type { Difficulty,Mode,Question,QuizHistory,QuestionStats,Random } from './types';
import {shuffle} from './random';
export const levels:Difficulty[]=['beginner','intermediate','advanced','mastery'];
export const historyKey='bibleMasteryHistory_v14';
export const canonical=(s:string):string=>String(s).normalize('NFKC').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const aliasGroups=[['joram son of ahab','jehoram son of ahab'],['simon peter','peter','cephas'],['tabitha','dorcas'],['jehosheba','jehoshabeath'],['beth el','bethel'],['abijam king of judah','abijah king of judah']];
export const resolveIdentity=(label:string):string=>{const n=canonical(label);return aliasGroups.find(g=>g.includes(n))?.[0]||n;};
export const eligible=(bank:readonly Question[],mode:Mode):Question[]=>bank.filter(q=>q.editorialStatus==='approved'&&(mode==='hard'?levels.indexOf(q.difficulty)>=2:mode==='ot'?q.testamentScope==='OT':mode==='nt'?q.testamentScope==='NT':true));
export const isRecord=(v:unknown):v is Record<string,unknown>=>v!==null&&typeof v==='object'&&!Array.isArray(v);
export function history(raw?:unknown):QuizHistory{
 let x:unknown;try{x=typeof raw==='string'?JSON.parse(raw):raw;}catch{ /* Preserve source's recoverable empty state. */ }
 const h:QuizHistory={version:14,session:0,items:{}};if(!isRecord(x)||x.version!==14||!isRecord(x.items))return h;
 h.session=typeof x.session==='number'&&Number.isSafeInteger(x.session)&&x.session>=0?x.session:0;
 for(const [id,r] of Object.entries(x.items)){if(!isRecord(r)||['__proto__','constructor','prototype'].includes(id))continue;
  const number=(key:string)=>typeof r[key]==='number'&&Number.isFinite(r[key])&&r[key]>=0?r[key]:0;
  h.items[id]={attempts:number('attempts'),correct:number('correct'),incorrect:number('incorrect'),exposures:number('exposures'),lastSeenSession:number('lastSeenSession'),lastSeenAt:number('lastSeenAt'),streak:number('streak'),lastAnsweredCorrectly:r.lastAnsweredCorrectly===true};
 }return h;
}
export function weight(q:Question,h:QuizHistory,session:number):number{const s=h.items[q.id];if(!s)return 3;const age=Math.max(0,session-(s.lastSeenSession??0)),cool=age<=1?.08:age<=2?.3:1,missed=s.incorrect>0&&!s.lastAnsweredCorrectly&&age>1?1.55:1;return Math.max(.01,cool*missed*(1+Math.min(age,30)/12)/(1+Math.log1p(s.exposures)*.12));}
export function select(pool:readonly Question[],count:number,h:QuizHistory=history(),random:Random=Math.random):Question[]{
 let remaining=pool.slice();const chosen:Question[]=[],groups=new Set<string>(),events=new Set<string>(),cats:Record<string,number>={},books:Record<string,number>={},eras:Record<string,number>={};
 while(chosen.length<count&&remaining.length){let candidates=remaining.filter(q=>!groups.has(q.equivalenceGroup)&&!events.has(q.eventGroup));if(!candidates.length)break;
  const min=Math.min(...candidates.map(q=>cats[q.primaryCategory]||0));candidates=candidates.filter(q=>(cats[q.primaryCategory]||0)===min);
  const ws=candidates.map(q=>weight(q,h,h.session+1)/((1+(books[q.bookCoverage[0]]||0)*.6)*(1+(eras[q.era]||0)*.25)));
  let t=random()*ws.reduce((a,b)=>a+b,0),index=0;while(index<ws.length-1&&t>=ws[index])t-=ws[index++];const q=candidates[index];chosen.push(q);groups.add(q.equivalenceGroup);events.add(q.eventGroup);cats[q.primaryCategory]=(cats[q.primaryCategory]||0)+1;books[q.bookCoverage[0]]=(books[q.bookCoverage[0]]||0)+1;eras[q.era]=(eras[q.era]||0)+1;remaining=remaining.filter(x=>x.id!==q.id);
 }return shuffle(chosen,random);
}
export function seen(h:QuizHistory,q:Pick<Question,'id'>,at:number):void{const r:QuestionStats=h.items[q.id]||(h.items[q.id]={attempts:0,correct:0,incorrect:0,exposures:0,streak:0});r.exposures++;r.lastSeenSession=h.session;r.lastSeenAt=at;}
export function answered(h:QuizHistory,q:Pick<Question,'id'>,ok:boolean):void{const r=h.items[q.id];if(!r)throw Error('Answer requires exposure');r.attempts++;r[ok?'correct':'incorrect']++;r.lastAnsweredCorrectly=ok;r.streak=ok?r.streak+1:0;}
export function validate(q:Question):string[]{const errors:string[]=[];for(const key of ['id','knowledgePointId','equivalenceGroup','eventGroup','stem','primaryCategory','era','difficulty','explanation','testamentScope'] as const)if(!q[key])errors.push('missing '+key);if(!levels.includes(q.difficulty))errors.push('difficulty');if(q.options.length!==4)errors.push('four options');if(new Set(q.options.map(o=>o.id)).size!==4||new Set(q.options.map(o=>resolveIdentity(o.label))).size!==4)errors.push('duplicate options');if(q.options.filter(o=>o.id===q.correctOptionId).length!==1)errors.push('answer identity');if(!q.references.length||!q.bookCoverage.length)errors.push('references');if(q.editorialStatus!=='approved'||q.provenance.proofStatus!=='passage-reviewed')errors.push('not reviewed');return errors;}
