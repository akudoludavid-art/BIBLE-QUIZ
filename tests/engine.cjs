const assert=require('node:assert/strict'),fs=require('fs'),E=require('../src/engine');
const bank=require('../src/bank.json');let checks=0;const check=(c,msg)=>{assert(c,msg);checks++};
function rng(seed){return ()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296}}
check(E.validate(null).includes('invalid record'),'bad pack row');
check(bank.length===new Set(bank.map(q=>q.id)).size,'unique ids');
for(const q of bank){check(E.validate(q).length===0,q.id+E.validate(q));check(Object.keys(q.whyDistractorsAreWrong).length===3,'contrasts');}
check(E.validate({...bank[0],options:[{id:'1',label:'Peter'},{id:'2',label:'Cephas'},{id:'3',label:'James'},{id:'4',label:'John'}],correctOptionId:'1'}).includes('duplicate options'),'alias collision');
check(JSON.stringify(E.history('{broken'))===JSON.stringify(E.history()),'corrupt history');
const report={};let selections=0;
for(const mode of ['ot','nt','mixed','hard']){const pool=E.eligible(bank,mode),h=E.history(),r=rng(12001);let minimum=Infinity,seen=new Set(),repeat=0,prev=new Set(),maxCategory=0;
 for(let i=0;i<2500;i++){const qs=E.select(pool,20,h,r);selections++;h.session++;check(qs.length===20,'real session length');check(new Set(qs.map(q=>q.id)).size===qs.length,'ids');check(new Set(qs.map(q=>q.equivalenceGroup)).size===qs.length,'equivalence');check(new Set(qs.map(q=>q.eventGroup)).size===qs.length,'event');const counts={};for(const q of qs){seen.add(q.id);repeat+=prev.has(q.id)?1:0;counts[q.primaryCategory]=(counts[q.primaryCategory]||0)+1;E.seen(h,q,i);E.answered(h,q,i%3!==0);}minimum=Math.min(minimum,Object.keys(counts).length);maxCategory=Math.max(maxCategory,...Object.values(counts));prev=new Set(qs.map(q=>q.id));}
 check(seen.size===pool.length,'all eligible questions recur and not starved');report[mode]={pool:pool.length,seen:seen.size,sessions:2500,minimumCategories:minimum,maxCategory,adjacentRepeatRate:repeat/50000};
}
// Synthetic pools: empty, undersized, skewed categories and shared events.
for(const n of [0,1,3,9,20,50]){const pool=Array.from({length:n},(_,i)=>({...bank[0],id:'s'+i,equivalenceGroup:'g'+i,eventGroup:'e'+i,primaryCategory:'c'+i%5}));const h=E.history(),r=rng(n+1);for(let i=0;i<1700;i++){const q=E.select(pool,20,h,r);check(q.length===Math.min(n,20),'tiny pool');check(new Set(q.map(x=>x.id)).size===q.length,'tiny ids');h.session++;q.forEach(x=>E.seen(h,x));}selections+=1700;}
const h=E.history();h.session=9;E.seen(h,bank[0]);E.answered(h,bank[0],false);let cold=E.weight(bank[0],h,10),spaced=E.weight(bank[0],h,13);check(spaced>cold*5,'cooldown');let wrong=spaced;h.items[bank[0].id].lastAnsweredCorrectly=true;check(wrong>E.weight(bank[0],h,13),'missed boost');check(E.weight(bank[0],h,13)>0,'correct remains eligible');
const positions=new Set();for(let i=0;i<100;i++)positions.add(E.shuffle(bank[0].options,rng(i*10001)).findIndex(o=>o.id===bank[0].correctOptionId));check(positions.size===4,'all answer positions');
const selected=E.select(bank,20,E.history(),rng(1));check(E.history().items[selected[0].id]===undefined,'selection pure');
const ranked=E.rankDistractors({id:'king',type:'person',role:'king',gender:'male',era:'monarchy'},[{id:'queen',type:'person',gender:'female',role:'king',reviewedWrong:true},{id:'other-king',type:'person',gender:'male',role:'king',era:'monarchy',reviewedWrong:true},{id:'unreviewed',type:'person',role:'king'}]);check(ranked.length===1&&ranked[0].id==='other-king','candidate constraints');
fs.writeFileSync('qa/engine-results.json',JSON.stringify({checks,selections,report,answerPositions:[...positions],status:'PASS'},null,2));console.log({checks,selections,report});
