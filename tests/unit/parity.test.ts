import {describe,it,expect} from 'vitest';
import fs from 'node:fs';
import vm from 'node:vm';
import {content} from '../../src/data/content';
import * as selection from '../../src/domain/questions/selection';
import {seededRandom,shuffle} from '../../src/domain/questions/random';
import {Rotation} from '../../src/domain/questions/rotation';
import {buildScripture,scripturePlan} from '../../src/domain/questions/scripture';
import {diff,pickBlanks,words,normaliseReference} from '../../src/domain/memorisation/text';
import {advance,grade,initialRecord,plan,rank,reviewExercise} from '../../src/domain/memorisation/scheduler';
import {presentMain,transition,type Session} from '../../src/domain/quiz/session';
import type {Mode,Question,QuizHistory} from '../../src/domain/questions/types';
import type {MemoRecord} from '../../src/domain/memorisation/types';
const original=fs.readFileSync('legacy/original/Bible_Mastery_Quiz_v14_Ultra.html','utf8');
const blocks=[...original.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const clean=<T>(value:T):T=>JSON.parse(JSON.stringify(value));
function baselineSelection(){const c=vm.createContext({});vm.runInContext(blocks[0].slice(0,blocks[0].indexOf('/* Local-only storage.')),c);return vm.runInContext('MasteryEngine',c) as typeof selection & {shuffle:typeof shuffle};}
function baselineRotation(seed:number){const memory=new Map<string,string>(),math=Object.create(Math) as Math;math.random=seededRandom(seed);const c=vm.createContext({Math:math,localStorage:{getItem:(k:string)=>memory.get(k)||null,setItem:(k:string,v:string)=>memory.set(k,v)}});const s=blocks[1];vm.runInContext(s.slice(s.indexOf('function shuffle('),s.indexOf('// Pick n distractors')),c);return vm.runInContext('Rotation',c) as Pick<Rotation,'draw'|'markShown'|'release'|'peek'>;}
function memoOracle(seed=7){const s=blocks[3],math=Object.create(Math) as Math;math.random=seededRandom(seed);const c=vm.createContext({Math:math,Date,Map,Set});
 const extract=(name:string)=>{const start=s.indexOf('function '+name+'(');let depth=0,end=s.indexOf('{',start);const begin=end;do{if(s[end]==='{')depth++;if(s[end]==='}')depth--;end++;}while(depth&&end<s.length);if(begin<0)throw Error(name);return s.slice(start,end);};
 vm.runInContext(`const DAY=864e5,DAYS=[0,1,3,7,14,30,60];let item;let record;let captured;const R=()=>record,now=()=>1000000000000,save=()=>{},load=()=>{},learningNav=()=>{},learned=()=>{},review=()=>{},activeScriptures=()=>{};const BY={has:()=>true,get:()=>item};const EX=new Proxy({}, {get:()=> (_it,_tx,cb)=>captured=cb});`+s.slice(s.indexOf('const STOP='),s.indexOf('const $='))+s.slice(s.indexOf('const TH='),s.indexOf('function add('))+extract('grade')+extract('ladder')+s.slice(s.indexOf('const gOf='),s.indexOf('const dueList=')),c);
 return {run:(code:string,values:Record<string,unknown>={})=>{Object.assign(c,values);return vm.runInContext(code,c);}};
}
describe('exact source reconciliation',()=>{
 it('retains every field from browser-captured original data',()=>{expect(content).toEqual(JSON.parse(fs.readFileSync('tests/fixtures/legacy/source-data-v14.json','utf8')));expect(content.questions).toHaveLength(289);expect(content.memorisation.library).toHaveLength(121);});
 it('keeps all semantic answer identities and categories',()=>{for(const q of content.questions)expect(selection.validate(q),q.id).toEqual([]);expect(new Set(content.questions.map(q=>q.id)).size).toBe(289);});
 it('preserves every generated template output with the source RNG sequence',()=>{const expected=JSON.parse(fs.readFileSync('tests/fixtures/legacy/scripture-generated-seed447.json','utf8')) as {id:string}[];const random=seededRandom(447);expect(expected.map(q=>buildScripture(q.id,random))).toEqual(expected);});
});
describe('main selector and exposure parity',()=>{
 for(const mode of ['ot','nt','mixed','hard'] as Mode[])it(mode+' 250 seeded sessions match original exactly',()=>{
  const old=baselineSelection(),random=seededRandom(35),oldRandom=seededRandom(35),h=selection.history(),oh=old.history();
  for(let i=0;i<250;i++){
   const actual=selection.select(selection.eligible(content.questions,mode),20,h,random),expected=old.select(old.eligible(content.questions,mode),20,oh,oldRandom);
   expect(actual.map(q=>q.id)).toEqual(clean(expected.map(q=>q.id)));expect(new Set(actual.map(q=>q.equivalenceGroup)).size).toBe(20);h.session++;oh.session++;
   actual.forEach(q=>{selection.seen(h,q,1000+i);selection.answered(h,q,i%3!==0);old.seen(oh,q,1000+i);old.answered(oh,q,i%3!==0);});expect(h).toEqual(clean(oh));
  }
 });
 it('canonicalizes aliases only for distractor validation, without merging records',()=>{expect(selection.resolveIdentity('Cephas')).toBe(selection.resolveIdentity('Peter'));expect(selection.resolveIdentity('Joram of Israel')).not.toBe(selection.resolveIdentity('Jehoram of Judah'));});
 it('keeps valid items recurrent and answer shuffling equivalent',()=>{const o=baselineSelection();for(const seed of [1,2,337,9855])expect(shuffle(content.questions[0].options,seededRandom(seed))).toEqual(clean(o.shuffle(content.questions[0].options,seededRandom(seed))));const h=selection.history();selection.seen(h,content.questions[0],100);selection.answered(h,content.questions[0],true);expect(selection.weight(content.questions[0],h,10)).toBeGreaterThan(0);});
 it('does not count selecting as seeing or invent historical outcomes',()=>{const h=selection.history();selection.select(content.questions,20,h,seededRandom(1));expect(h.items).toEqual({});expect(selection.history('{broken')).toEqual({version:14,session:0,items:{}});});
});
describe('Scripture rotation parity',()=>{
 for(const mode of ['all','parables','miracles','book'] as const)it(mode+' 100 interrupted and completed rounds match original',()=>{
  const old=baselineRotation(899),actual=new Rotation(undefined,seededRandom(899)),p=scripturePlan(mode,'Genesis',new Set());
  for(let i=0;i<100;i++){const a=actual.draw(p.key,p.ids,p.count,p.group),e=old.draw(p.key,p.ids,p.count,p.group);expect(a).toEqual(clean(e));a.slice(0,i%2?3:a.length).forEach(id=>{actual.markShown(p.key,id);old.markShown(p.key,id)});if(i%2){actual.release(p.key);old.release(p.key);}expect(actual.peek(p.key)).toEqual(clean(old.peek(p.key)));}
 });
 it('retains small pool and memorised built-in scope semantics',()=>{expect(scripturePlan('book','Philemon',new Set()).count).toBe(5);expect(scripturePlan('memo','Genesis',new Set(['John|3:16','P|John 3:16-17','U|x'])).ids).toHaveLength(3);});
});
describe('memorisation text and scheduling parity',()=>{
 it('retains exact normalization and diff for every built-in passage and word mutations',()=>{const o=memoOracle();for(const it of content.memorisation.library){for(const text of [it.text,words(it.text).slice(1).join(' '),words(it.text).reverse().join(' '),it.text+' extra']){const actual=diff(it.text,text),expected=o.run('diff(target,typed)',{target:it.text,typed:text});expect(clean(actual)).toEqual(clean(expected));}expect(normaliseReference(it.ref)).toEqual(o.run('nref(reference)',{reference:it.ref}));}});
 it('retains four blank levels for every built-in passage under seeded random',()=>{const o=memoOracle(7),random=seededRandom(7);for(const it of content.memorisation.library)for(const level of [1,2,3,4])expect([...pickBlanks(words(it.text),level,random)]).toEqual([...o.run('pickBlanks(ws,level)',{ws:words(it.text),level})]);});
 it('preserves every compound learning plan',()=>{const o=memoOracle();for(const it of content.memorisation.library)expect(plan(it)).toEqual(clean(o.run('plan(passage)',{passage:it})));});
 it('preserves advancement, failure and cumulative learning transitions',()=>{
  const o=memoOracle();for(const item of [content.memorisation.library[0],content.memorisation.library[115]]){let r=initialRecord(1);for(let step=0;step<300&&r.box<0;step++){const sc=step%7===0?0:1,expected=o.run('item=sourceItem;record=sourceRecord;ladder(item.id);captured(score);record',{sourceItem:clean(item),sourceRecord:clean(r),score:sc});r=advance(item,r,sc,1000000000000);expect(r).toEqual(clean(expected));}expect(r.box).toBe(0);}
 });
 it('preserves got/almost/missed schedule at all boxes and difficulties',()=>{const o=memoOracle();for(let box=0;box<=6;box++)for(let difficulty=0;difficulty<=4;difficulty++)for(const g of ['got','almost','missed'] as const){const r={...initialRecord(1),box,diff:difficulty};const expected=o.run('record=sourceRecord;grade("id",g);record',{sourceRecord:clean(r),g});expect(grade(r,g,1000000000000)).toEqual(clean(expected));expect(rank(r,1000000000000)).toBe(o.run('record=sourceRecord;rank("id")',{sourceRecord:r}));expect(['blank','first','type','recite','prec']).toContain(reviewExercise('John|3:16',r,1000000000000));}});
});
describe('pure session transitions',()=>{
 it('awards one point and rejects duplicate/stale actions',()=>{const q=presentMain(content.questions[0],seededRandom(9)),s:Session={id:'s',questions:[q],index:0,score:0,startedAt:0,status:'active'};const action={type:'answer',sessionId:'s',questionId:q.id,optionId:q.correctOptionId} as const;const a=transition(s,action);expect(a.score).toBe(1);expect(transition(a,action)).toBe(a);expect(transition(s,{...action,sessionId:'stale'})).toBe(s);expect(transition(s,{type:'next',sessionId:'s',at:1})).toBe(s);const done=transition(a,{type:'next',sessionId:'s',at:10});expect(done.status).toBe('completed');expect(transition(done,action)).toBe(done);});
});
// These assignments are compile-time contracts, not generated biblical records.
const questions:Question[]=content.questions;const h:QuizHistory=selection.history();const memo:MemoRecord=initialRecord(0);void questions;void h;void memo;
