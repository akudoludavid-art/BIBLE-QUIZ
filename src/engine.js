/* Bible Mastery v14: pure selection and validation, shared by browser and tests. */
(function(root){
'use strict';
const levels=['beginner','intermediate','advanced','mastery'];
const key='bibleMasteryHistory_v14';
const canonical=s=>String(s).normalize('NFKC').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
function shuffle(a,rng=Math.random){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
const aliasGroups=[['joram son of ahab','jehoram son of ahab'],['simon peter','peter','cephas'],['tabitha','dorcas'],['jehosheba','jehoshabeath'],['beth el','bethel'],['abijam king of judah','abijah king of judah']];
function resolveIdentity(label){const normalized=canonical(label);return aliasGroups.find(g=>g.includes(normalized))?.[0]||normalized;}
function validate(q){if(!q||typeof q!=="object")return ["invalid record"];const errors=[];for(const f of ['id','knowledgePointId','equivalenceGroup','eventGroup','stem','primaryCategory','era','difficulty','explanation','testamentScope'])if(!q[f])errors.push('missing '+f);
 if(!levels.includes(q.difficulty))errors.push('difficulty');
 if(!Array.isArray(q.options)||q.options.length!==4||q.options.some(o=>!o||typeof o.id!=='string'||typeof o.label!=='string'||!o.label))errors.push('four options');
 else {if(new Set(q.options.map(o=>o.id)).size!==4||new Set(q.options.map(o=>resolveIdentity(o.label))).size!==4)errors.push('duplicate options');if(q.options.filter(o=>o.id===q.correctOptionId).length!==1)errors.push('answer identity');}
 if(!q.references?.length||!q.bookCoverage?.length)errors.push('references');
 if(q.editorialStatus!=='approved'||q.provenance?.proofStatus!=='passage-reviewed')errors.push('not reviewed');return errors;}
function eligible(bank,mode){return bank.filter(q=>q.editorialStatus==='approved'&&(mode==='hard'?levels.indexOf(q.difficulty)>=2:mode==='ot'?q.testamentScope==='OT':mode==='nt'?q.testamentScope==='NT':true));}
function history(raw){let x;try{x=typeof raw==='string'?JSON.parse(raw):raw;}catch{}const h={version:14,session:0,items:{}};
 if(!x||x.version!==14||!x.items||typeof x.items!=='object')return h;
 h.session=Number.isSafeInteger(x.session)&&x.session>=0?x.session:0;
 for(const [id,r] of Object.entries(x.items)){if(!r||typeof r!=='object'||['__proto__','constructor','prototype'].includes(id))continue;const z={};for(const f of ['attempts','correct','incorrect','exposures','lastSeenSession','lastSeenAt','streak'])z[f]=Number.isFinite(r[f])&&r[f]>=0?r[f]:0;z.lastAnsweredCorrectly=r.lastAnsweredCorrectly===true;h.items[id]=z;}return h;}
function weight(q,h,session){const s=h.items[q.id];if(!s)return 3;const age=Math.max(0,session-s.lastSeenSession),cool=age<=1?.08:age<=2?.3:1;const missed=s.incorrect>0&&!s.lastAnsweredCorrectly&&age>1?1.55:1;return Math.max(.01,cool*missed*(1+Math.min(age,30)/12)/(1+Math.log1p(s.exposures)*.12));}
function select(pool,count,h=history(),rng=Math.random){let remaining=pool.slice(),chosen=[],groups=new Set(),events=new Set(),cats={},books={},eras={};
 while(chosen.length<count&&remaining.length){let candidates=remaining.filter(q=>!groups.has(q.equivalenceGroup)&&!events.has(q.eventGroup));if(!candidates.length)break;
 // Flexible least-filled categories; there is no fixed category ordering or minimum inventory.
 const min=Math.min(...candidates.map(q=>cats[q.primaryCategory]||0));candidates=candidates.filter(q=>(cats[q.primaryCategory]||0)===min);
 const ws=candidates.map(q=>weight(q,h,h.session+1)/((1+(books[q.bookCoverage[0]]||0)*.6)*(1+(eras[q.era]||0)*.25)));
 let t=rng()*ws.reduce((a,b)=>a+b,0),index=0;while(index<ws.length-1&&t>=ws[index])t-=ws[index++];const q=candidates[index];chosen.push(q);groups.add(q.equivalenceGroup);events.add(q.eventGroup);cats[q.primaryCategory]=(cats[q.primaryCategory]||0)+1;books[q.bookCoverage[0]]=(books[q.bookCoverage[0]]||0)+1;eras[q.era]=(eras[q.era]||0)+1;remaining=remaining.filter(x=>x.id!==q.id);
 }return shuffle(chosen,rng);}
function seen(h,q,at=Date.now()){const r=h.items[q.id]||(h.items[q.id]={attempts:0,correct:0,incorrect:0,exposures:0,streak:0});r.exposures++;r.lastSeenSession=h.session;r.lastSeenAt=at;}
function answered(h,q,ok){const r=h.items[q.id];if(!r)throw Error('Answer requires exposure');r.attempts++;r[ok?'correct':'incorrect']++;r.lastAnsweredCorrectly=!!ok;r.streak=ok?r.streak+1:0;}
// Evidence-based authoring helper. Only candidates already reviewed as wrong are rankable.
function rankDistractors(answer,candidates,excluded=[],difficulty='advanced'){return candidates.filter(c=>c.id!==answer.id&&!excluded.includes(c.id)&&c.reviewedWrong&&c.type===answer.type&&!(c.aliases||[]).includes(answer.id)&&(!answer.gender||!c.gender||answer.gender===c.gender)).map(c=>({...c,similarity:(c.role===answer.role&&c.role?4:0)+(c.era===answer.era&&c.era?3:0)+(c.place===answer.place&&c.place?3:0)+(c.event===answer.event&&c.event?4:0)})).filter(c=>c.similarity>0).sort((a,b)=>b.similarity-a.similarity);}
const api={resolveIdentity,levels,key,canonical,shuffle,validate,eligible,history,weight,select,seen,answered,rankDistractors};root.MasteryEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
