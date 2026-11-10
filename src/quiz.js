const Engine=MasteryEngine;
const BANK=QUESTION_BANK.filter(q=>Engine.validate(q).length===0);
let quizHistory;
try{quizHistory=Engine.history(localStorage.getItem(Engine.key));}catch{quizHistory=Engine.history();}
// The old bag has no answer results. Import only confirmed displayed exposures.
try{if(!localStorage.getItem(Engine.key)){const old=JSON.parse(localStorage.getItem('bibleQuizRotation_v2')||'{}');for(const bag of Object.values(old.bags||{})){for(const oldId of bag.seen||[]){if((bag.inflight||[]).includes(oldId))continue;const id=LEGACY_EQUIVALENCES[oldId]||oldId;const q=BANK.find(q=>q.id===id);if(q&&!quizHistory.items[id]){Engine.seen(quizHistory,q,0);quizHistory.items[id].lastSeenSession=0;}}}}}catch{} 
let activeKey='',factKey=''; // v2 scripture rotation remains independent.
function persistHistory(){Storage14.commit({[Engine.key]:JSON.stringify(quizHistory)});}
function start(){
 const candidates=Engine.eligible(BANK,selectedMode);quiz=Engine.select(candidates,20,quizHistory);
 if(!quiz.length){alert('No reviewed questions are available for this mode. Your Scripture Library is still available.');return;}
 quizHistory.session++;idx=0;score=0;locked=false;startTime=Date.now();
 clearInterval(tick);tick=setInterval(updateTimer,1000);updateTimer();showAny('quiz');
 document.getElementById('modePill').textContent=modeNames[selectedMode];
 document.getElementById('qtotal').textContent=quiz.length;
 document.getElementById('score').textContent=0;render();
}
function render(){
 locked=false;const q=quiz[idx];Engine.seen(quizHistory,q);persistHistory();
 document.getElementById('qlvl').textContent=q.difficulty[0].toUpperCase()+q.difficulty.slice(1)+' · '+q.primaryCategory;
 document.getElementById('qnum').textContent=idx+1;
 document.getElementById('bar').style.width=(idx/quiz.length*100)+'%';
 const heading=document.getElementById('question');heading.textContent=q.stem;heading.tabIndex=-1;heading.focus();
 const a=document.getElementById('answers');a.replaceChildren();
 Engine.shuffle(q.options).forEach(opt=>{const b=document.createElement('button');b.className='answer';b.textContent=opt.label;b.onclick=()=>answer(b,opt.id);a.append(b);});
 const e=document.getElementById('explanation');e.replaceChildren();e.classList.remove('show');e.setAttribute('aria-live','polite');
 document.getElementById('nextBtn').classList.add('hidden');
}
function answer(btn,optionId){
 if(locked)return;locked=true;const q=quiz[idx],ok=optionId===q.correctOptionId;
 Engine.answered(quizHistory,q,ok);persistHistory();
 const correct=q.options.find(o=>o.id===q.correctOptionId);
 document.querySelectorAll('#answers .answer').forEach(b=>{b.disabled=true;if(b.textContent===correct.label)b.classList.add('correct');});
 if(ok){score++;document.getElementById('score').textContent=score;burst(45);}else btn.classList.add('wrong');
 const e=document.getElementById('explanation');
 const result=document.createElement('strong');result.textContent=ok?'Correct. ':'Not quite. Correct answer: '+correct.label+'. ';e.append(result);
 const reason=document.createElement('span');reason.textContent=q.explanation;e.append(reason);
 const refs=document.createElement('p');refs.className='book';refs.textContent=q.references.join('; ')+' · Evidence: ASV (1901)';e.append(refs);
 if(['advanced','mastery'].includes(q.difficulty)){
  const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Why these alternatives differ';details.append(summary);
  for(const o of q.options.filter(o=>o.id!==q.correctOptionId)){const p=document.createElement('p');p.textContent=o.label+' — '+q.whyDistractorsAreWrong[o.id];details.append(p);}e.append(details);
 }
 e.classList.add('show');document.getElementById('nextBtn').classList.remove('hidden');
}
