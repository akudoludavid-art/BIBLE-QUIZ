
/* ===== SCRIPTURE MEMORISATION ===== */
(function(){
const SK="bibleMemo_v1", CUSTOM_KEY="bibleCustomScriptures_v1",DAY=864e5,DAYS=[0,1,3,7,14,30,60];
const PV=[["Psalms","23:1-6",["The LORD is my shepherd; I shall not want.","He maketh me to lie down in green pastures: he leadeth me beside the still waters.","He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.","Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.","Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.","Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever."]],
["Psalms","1:1-3",["Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.","But his delight is in the law of the LORD; and in his law doth he meditate day and night.","And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper."]],
["Philippians","4:6-7",["Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.","And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."]],
["Romans","8:38-39",["For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,","Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."]],
["Isaiah","40:30-31",["Even the youths shall faint and be weary, and the young men shall utterly fall:","But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint."]],
["John","3:16-17",["For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.","For God sent not his Son into the world to condemn the world; but that the world through him might be saved."]]];
const TOP={"Faith":/faith|believ|trust/i,"Prayer":/pray|supplication|call(eth|ed)? (up)?on/i,"Salvation":/sav(ed|iour|eth)|everlasting|eternal|redeem|perish/i,"Wisdom":/wisdom|understanding|knowledge|instruct/i,"Holiness":/holy|holiness|righteous|sanctif|clean/i,"Love":/love|charity/i,"Grace":/grace|mercy|forgive/i,"God's promises":/promis|will never|shall not|shall be saved|shall direct|shall renew|shall not want/i,"Fear and courage":/fear|afraid|courage|dismayed|be strong/i,"Temptation":/tempt|overcome|resist|flee/i,"The Holy Spirit":/spirit/i,"Christ":/christ|jesus|lamb of god|only begotten|the way, the truth/i,"Christian living":/walk|conversation|renew|transform|whatsoever ye do|be ye/i,"Evangelism":/gospel|preach|witness|go ye|nations/i,"Spiritual warfare":/armour|devil|wrestle|principalities|stand against/i,"God's character":/God is|LORD is|merciful|gracious|faithful|almighty/i};
const LIB=SCRIPTURES.map(x=>({id:x.book+"|"+x.ref,ref:x.book+" "+x.ref,book:x.book,vs:[x.text]})).concat(PV.map(p=>({id:"P|"+p[0]+" "+p[1],ref:p[0]+" "+p[1],book:p[0],vs:p[2],pass:1})));
LIB.forEach(x=>{x.text=x.vs.join(" ");x.nt=NTBOOKS.has(x.book);x.tp=Object.keys(TOP).filter(k=>TOP[k].test(x.text));if(!x.tp.length)x.tp=["Other"];});
const BY=new Map(LIB.map(x=>[x.id,x]));
let CUSTOM=[];
function prepareCustom(x){
 const book=String(x.book||"").trim(),ref=String(x.verse||"").trim(),body=String(x.text||"").trim();
 if(!book||!ref||!body)return null;
 const id=String(x.id||("U|"+Date.now()+"|"+Math.random().toString(36).slice(2)));
 const item={id,book,ref:book+" "+ref,verse:ref,vs:[body],text:body,nt:NTBOOKS.has(book),custom:true};
 item.tp=Object.keys(TOP).filter(k=>TOP[k].test(body));if(!item.tp.length)item.tp=["Other"];
 return item;
}
function reloadCustom(){
 CUSTOM.forEach(x=>{BY.delete(x.id);const i=LIB.findIndex(y=>y.id===x.id);if(i>=0)LIB.splice(i,1);});CUSTOM=[];
 let saved=[];try{saved=JSON.parse(localStorage.getItem(CUSTOM_KEY)||"[]");}catch(e){}
 if(!Array.isArray(saved))saved=[];
 saved.forEach(raw=>{const item=prepareCustom(raw);if(item&&!BY.has(item.id)){CUSTOM.push(item);LIB.push(item);BY.set(item.id,item);}});
}
function persistCustom(){try{localStorage.setItem(CUSTOM_KEY,JSON.stringify(CUSTOM.map(x=>({id:x.id,book:x.book,verse:x.verse,text:x.text}))));return true;}catch(e){alert("Unable to save scripture. Check browser storage availability.");return false;}}
reloadCustom();
let S;function load(){if(S)return;try{S=JSON.parse(localStorage.getItem(SK));}catch(e){}if(!S||!S.items)S={items:{}};}
function save(){try{localStorage.setItem(SK,JSON.stringify(S));}catch(e){}}
const now=()=>Date.now(),R=id=>S.items[id],allMemoIds=()=>Object.keys(S.items).filter(i=>BY.has(i)),ids=()=>allMemoIds().filter(i=>R(i).active!==false);
const st=id=>{const r=R(id);return !r?"Not Started":r.active===false?"Paused":r.box<0?"Learning":r.box<5?"Reviewing":"Mastered";};
// Legacy v11 items without an active flag remain active automatically.
window.MemoIds=()=>{load();return new Set(ids());};
const STOP=new Set("the a an and or but of to in on for with by as at is are was be that which who it he she they his her their him them not i ye thou thee thy thine my me we us our you your all unto shall will have hath from this these those".split(" "));
const words=t=>t.split(/\s+/).filter(Boolean),norm=w=>w.toLowerCase().replace(/’/g,"'").replace(/[^a-z0-9'-]/g,"");
const nref=s=>s.toLowerCase().replace(/[–—]/g,"-").replace(/[^a-z0-9:-]/g,"").replace(/^psalm(?!s)/,"psalms");
function pickBlanks(ws,L){const k=Math.max(1,Math.round(ws.length*[.2,.4,.6,.85][L-1]));
 return new Set(ws.map((w,i)=>({i,s:(STOP.has(norm(w))?0:norm(w).length>=4?3:1)+Math.random()*(L>=3?2.5:1.2)})).sort((a,b)=>b.s-a.s).slice(0,k).map(x=>x.i));}
function diff(target,typed){
 const tw=words(target),T=tw.map(norm),uw=words(typed),U=uw.map(norm),n=T.length,m=U.length;
 const D=Array.from({length:n+1},()=>new Array(m+1).fill(0));
 for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)D[i][j]=T[i]===U[j]?D[i+1][j+1]+1:Math.max(D[i+1][j],D[i][j+1]);
 const ops=[];let i=0,j=0;
 while(i<n||j<m){if(i<n&&j<m&&T[i]===U[j]){ops.push(["ok",tw[i]]);i++;j++;}else if(i<n&&(j>=m||D[i+1][j]>=D[i][j+1])){ops.push(["miss",tw[i]]);i++;}else{ops.push(["extra",uw[j]]);j++;}}
 const ex=new Set(ops.filter(o=>o[0]==="extra").map(o=>norm(o[1])));
 for(let k=0;k<ops.length;k++){const o=ops[k],nx=ops[k+1];
  if(o[0]==="miss"&&nx&&nx[0]==="extra"){const a=norm(o[1]),b=norm(nx[1]);if(a.slice(0,3)===b.slice(0,3)&&Math.abs(a.length-b.length)<=3){ops.splice(k,2,["sim",o[1],nx[1]]);continue;}}
  if(o[0]==="miss"&&ex.has(norm(o[1])))o[0]="moved";}
 let run=0,omit=0,c=0;ops.forEach(o=>{if(o[0]==="miss"){if(++run===3)omit++;}else run=0;if(o[0]==="ok")c++;});
 return {ops,acc:n?c/Math.max(n,m||1):0,omit,cnt:k=>ops.filter(o=>o[0]===k).length};
}
const $=id=>document.getElementById(id);
function H(t,c,x,f){const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;if(f)e.onclick=f;return e;}
function put(...n){const b=$("memoBody");b.innerHTML="";n.flat().forEach(x=>b.appendChild(x));}
const B=(t,f,c)=>H("button",c||"primary",t,f),row=(...k)=>{const d=H("div","controls");d.style.marginTop="16px";k.forEach(x=>d.appendChild(x));return d;};
function head(t,back){const d=H("div","topbar");d.appendChild(H("h2","",t));d.appendChild(B("Back",back||home,"secondary"));return d;}
const P=(t,c)=>{const p=H("p",c||"",t);p.style.whiteSpace="pre-wrap";return p;};
const refEl=t=>{const d=H("div","book",t);d.style.cssText="font-size:20px;margin:10px 0";return d;};
function passageText(it,forceExpand=false){
 const d=H("div","memo-passage"),text=it.text||"",long=text.length>220||text.split(/\n/).length>3||words(text).length>45;
 if(!long||forceExpand){d.appendChild(P(text,"small"));return d;}
 const details=H("details"),summary=H("summary","",text.replace(/\s+/g," ").slice(0,135).trim()+"…  Show full passage");
 const body=H("div","memo-full-text",text);details.appendChild(summary);details.appendChild(body);
 details.addEventListener("toggle",()=>{summary.textContent=details.open?"Hide full passage":text.replace(/\s+/g," ").slice(0,135).trim()+"…  Show full passage";});
 d.appendChild(details);return d;
}
function resume(id){load();if(!BY.has(id))return;const r=R(id);if(!r)return add(id);r.active=true;save();}
function pause(id,callback){load();const r=R(id);if(!r||r.active===false)return;
 r.active=false;save();(callback||activeScriptures)();
}
function openActive(id){load();if(!R(id)||R(id).active===false||!BY.has(id))return activeScriptures();
 if(R(id).box<0)ladder(id);else review([id]);
}
function learningNav(id){
 const selected=ids(),current=selected.indexOf(id),wrap=H("div","memo-active-nav");
 wrap.appendChild(H("div","memo-switch-label","Switch scripture · your learning stage is saved"));
 const choice=H("select");choice.setAttribute("aria-label","Jump to an active scripture");
 selected.forEach(k=>{const op=H("option","",BY.get(k).ref+(R(k).box<0?" — Learning":" — Review"));op.value=k;op.selected=k===id;choice.appendChild(op);});
 choice.onchange=()=>{if(choice.value!==id)openActive(choice.value);};wrap.appendChild(choice);
 const previous=selected[(current-1+selected.length)%selected.length],next=selected[(current+1)%selected.length];
 const buttons=row(B("← Previous",()=>openActive(previous),"secondary"),B("Active list",activeScriptures,"secondary"),B("Next →",()=>openActive(next),"secondary"));
 if(selected.length<2){buttons.firstChild.disabled=true;buttons.lastChild.disabled=true;}
 wrap.appendChild(buttons);$("memoBody").appendChild(wrap);
}
function stageText(id){const r=R(id),it=BY.get(id);if(!r||!it)return "";
 if(r.box>=0)return "Ready for spaced review";
 const steps=plan(it),n=Math.min((r.cs||0)+1,steps.length);
 return "Part "+n+" of "+steps.length+" · "+(r.cs||0?"Continue where you stopped":"Learning in progress");
}
function showDiff(res){const d=H("div","explanation show");d.style.lineHeight="1.9";
 res.ops.forEach(o=>{const s=H("span",o[0]==="ok"?"ok":o[0]==="miss"?"miss":o[0]==="extra"?"extra":o[0]==="moved"?"moved":"miss",o[0]==="sim"?o[1]+" (you: "+o[2]+")":o[0]==="miss"?"["+o[1]+"]":o[1]);d.appendChild(s);d.appendChild(document.createTextNode(" "));});
 const leg=H("div","small","Green correct · red [missing] · amber struck = extra · purple = misplaced · "+res.cnt("sim")+" similar · "+res.omit+" omitted phrase(s)");leg.style.marginTop="8px";d.appendChild(leg);return d;}
const cont=(cb,sc,label)=>row(B(label||"Continue",()=>cb(sc)));
/* ---- exercises: EX[name](item,text,cb(score 0..1),opts) ---- */
const EX={};
EX.read=(it,tx,cb,o)=>put(head(o.label),refEl(it.ref),P(tx,"question"),row(B("I've read it",()=>cb(1))));
EX.blank=(it,tx,cb,o)=>{const ws=words(tx),r=R(it.id),key=r?r.cs+":"+r.ls+":blank:"+(o.lvl||3):"",
  bl=(r?.draft?.key===key&&Array.isArray(r.draft.blankIndices))?new Set(r.draft.blankIndices):pickBlanks(ws,o.lvl||3),inp=[],p=H("div","question");p.style.cssText="font-size:20px;line-height:2.3";
 ws.forEach((w,i)=>{if(bl.has(i)){const e=document.createElement("input");e.size=Math.max(3,norm(w).length);e.autocapitalize="off";e.style.cssText="background:var(--field);color:#fff;border:1px solid #e6b85c;border-radius:8px;padding:3px 6px;font-size:17px";inp.push([e,w]);p.appendChild(e);p.appendChild(document.createTextNode(" "));}else p.appendChild(document.createTextNode(w+" "));});
 const r0=R(it.id);
  if(r0?.draft?.key===key)inp.forEach(([e],i)=>{e.value=r0.draft.values?.[i]||"";});
  inp.forEach(([e])=>e.addEventListener("input",()=>{const r=R(it.id);if(!r||r.active===false)return;r.draft={key,blankIndices:[...bl],values:inp.map(([x])=>x.value)};save();}));
  const out=H("div");put(head(o.label),refEl(it.ref),H("div","small","Fill the gaps — level "+(o.lvl||3)+"/4"),p,out,row(B("Check",function(){this.disabled=true;let c=0;inp.forEach(([e,w])=>{const ok=norm(e.value)===norm(w);if(ok)c++;else{e.value=w;}e.style.borderColor=ok?"#27d17f":"#ff5f6d";e.disabled=true;});const rr=R(it.id);if(rr){delete rr.draft;save();}const sc=c/inp.length;out.appendChild(H("p","",Math.round(sc*100)+"% correct"));out.appendChild(cont(cb,sc));})));};
function typed(mode){return (it,tx,cb,o)=>{const ws=words(tx);const cue=mode==="first"?ws.map(w=>w.replace(/^([^A-Za-z0-9]*[A-Za-z0-9])([A-Za-z0-9'’]*)/,(m,a,b)=>a+"_".repeat(b.length))).join(" "):mode==="prec"?ws.slice(0,3).join(" ")+" …":"";
 const ta=document.createElement("textarea");ta.rows=6;ta.style.cssText="width:100%;padding:12px;border-radius:14px;background:var(--field);color:#fff;border:1px solid rgba(255,255,255,.15);font-size:16px";ta.autocapitalize="off";
  const r0=R(it.id),key=r0?r0.cs+":"+r0.ls+":"+mode:"";
  if(r0?.draft?.key===key)ta.value=r0.draft.text||"";
 const ri=document.createElement("input");ri.placeholder="Reference (e.g. John 3:16)";ri.style.cssText="width:100%;padding:12px;border-radius:14px;background:var(--field);color:#fff;border:1px solid rgba(255,255,255,.15);margin-bottom:10px;font-size:16px";
  if(r0?.draft?.key===key)ri.value=r0.draft.ref||"";
  const storeDraft=()=>{const rr=R(it.id);if(!rr||rr.active===false)return;rr.draft={key,text:ta.value,ref:ri.value};save();};
  ta.addEventListener("input",storeDraft);ri.addEventListener("input",storeDraft);
 const out=H("div");const hint=mode==="first"?"Use the first-letter cues and type the verse.":mode==="prec"?"Word-for-word: type the reference and the complete text.":"Type the verse from memory.";
 put(head(o.label),mode==="prec"?H("div","small","Prompt"):refEl(it.ref),cue?P(cue,"question"):H("span"),H("div","small",hint),mode==="prec"?ri:H("span"),ta,out,row(B("Check",function(){this.disabled=true;
  const r=diff(tx,ta.value);const saved=R(it.id);if(saved){delete saved.draft;save();}let sc=r.acc,refOK=true;if(mode==="prec"){refOK=nref(ri.value)===nref(it.ref);if(!refOK)sc=Math.min(sc,.9);}
  const rc=R(it.id);if(rc){rc.tn=(rc.tn||0)+1;rc.ts=(rc.ts||0)+r.acc;rc.tb=Math.max(rc.tb||0,r.acc);save();}
  out.appendChild(showDiff(r));out.appendChild(H("p","","Accuracy "+Math.round(r.acc*100)+"%"+(mode==="prec"?(refOK?" · reference correct":" · reference should be "+it.ref):"")+". Accuracy is not mastery — verses only master through spaced reviews."));out.appendChild(cont(cb,sc));}),
 B("Show verse",()=>{out.appendChild(P(tx,"small"));},"secondary")));};}
EX.first=typed("first");EX.type=typed("type");EX.prec=typed("prec");
EX.ref=(it,tx,cb,o)=>{const same=shuffleA(LIB.filter(x=>x.id!==it.id&&x.book===it.book)),other=shuffleA(LIB.filter(x=>x.book!==it.book));
 const opts=shuffleA([it.ref,...[...same,...other].map(x=>x.ref).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3)]);
 const a=H("div","answers"),out=H("div");opts.forEach(r=>{const b=H("button","answer",r);b.onclick=()=>{a.querySelectorAll("button").forEach(x=>{x.disabled=true;if(x.textContent===it.ref)x.classList.add("correct");});if(r!==it.ref)b.classList.add("wrong");out.appendChild(cont(cb,r===it.ref?1:0));};a.appendChild(b);});
 put(head(o.label),H("div","small","Where is this found?"),P(tx,"question"),a,out);};
EX.recite=(it,tx,cb,o)=>{const out=H("div");put(head(o.label),refEl(it.ref),P("Recite it aloud, then reveal.","small"),out,row(B("Reveal Verse",function(){this.disabled=true;out.appendChild(P(tx,"question"));out.appendChild(row(B("Got It",()=>cb(1)),B("Almost",()=>cb(.8),"secondary"),B("Missed It",()=>cb(0),"secondary")));})));};
const shuffleA=a=>shuffle(a);
/* ---- learning ladder ---- */
const TH={read:1,blank:.8,first:.75,ref:1,type:.9,prec:.97},SN={read:"Read",blank:"Guided recall",first:"First letters",ref:"Reference",type:"Full recall",prec:"Precision"};
const plan=it=>{const p=[];for(let k=0;k<it.vs.length;k++){if(k)p.push([k,k]);p.push([0,k]);}return p;};
function add(id){load();if(!BY.has(id))return;
 if(!R(id)){S.items[id]={cs:0,ls:0,bl:1,fl:0,box:-1,due:0,diff:0,lapses:0,tn:0,ts:0,tb:0,up:0,added:now(),active:true};}
 else R(id).active=true;save();}
function ladder(id){load();if(!BY.has(id)||!R(id)||R(id).active===false)return activeScriptures();
 const it=BY.get(id),r=R(id),Pl=plan(it);if(r.cs>=Pl.length){if(r.box>=0)return review([id]);r.cs=Pl.length-1;r.ls=0;save();}
 const [a,b]=Pl[r.cs],tx=it.vs.slice(a,b+1).join(" "),fin=r.cs===Pl.length-1,stg=fin?["read","blank","first","ref","type","prec"]:["read","blank","type"],s=stg[r.ls];
 const label=(a===b?"Verse "+(a+1):"Verses "+(a+1)+"–"+(b+1))+" · part "+(r.cs+1)+"/"+Pl.length+" · "+SN[s];
 const after=sc=>{delete r.draft;if(sc<TH[s]){r.fl++;if(s==="blank")r.bl=Math.max(1,r.bl-1);save();return ladder(id);}
  if(s==="blank"&&r.bl<4){r.bl++;save();return ladder(id);}
  r.ls++;if(r.ls>=stg.length){r.ls=0;r.bl=1;r.cs++;}
  if(r.cs>=Pl.length){r.box=0;r.due=now()+6e5;r.up=now();save();return learned(it);}save();ladder(id);};
 it.id=id;EX[s](it,tx,after,{label,lvl:r.bl});learningNav(id);}
function learned(it){let ctx=H("span");const done=()=>put(head("Learned"),P(it.ref+" will return for review shortly, then after 1, 3, 7, 14 and 30 days.","question"),row(B("Active scriptures",activeScriptures),B("Memorisation home",home,"secondary")));
 if(it.pass)return done();const nt=it.nt,bs=shuffleA([...new Set(SCRIPTURES.filter(x=>NTBOOKS.has(x.book)===nt&&x.book!==it.book).map(x=>x.book))]).slice(0,3),a=H("div","answers"),out=H("div");
 shuffleA([it.book,...bs]).forEach(x=>{const b=H("button","answer",x);b.onclick=()=>{a.querySelectorAll("button").forEach(y=>{y.disabled=true;if(y.textContent===it.book)y.classList.add("correct");});if(x!==it.book)b.classList.add("wrong");out.appendChild(row(B("Finish",done)));};a.appendChild(b);});
 put(head("Context check"),refEl(it.ref),P("Which book contains this verse?","question"),a,out);}
/* ---- spaced repetition ---- */
function grade(id,g){const r=R(id),b0=r.box;
 if(g==="got"){r.box=Math.min(6,b0+1);r.diff=Math.max(0,r.diff-1);if(r.box>b0)r.up=now();}
 else if(g==="missed"){r.diff++;r.lapses++;r.box=b0>=5?2:Math.max(0,b0-1);}
 let d=g==="almost"?Math.max(.5,DAYS[r.box]*.5):DAYS[r.box];if(r.diff>=2&&d>1)d*=.6;
 r.due=now()+(d===0?6e5:d*DAY);save();}
const gOf=s=>s>=.95?"got":s>=.75?"almost":"missed";
const rank=id=>{const r=R(id),ov=(now()-r.due)/DAY;return (ov>=1?0:r.diff>=2?1:r.box<=1?2:3)*1e14+r.due;};
const dueList=()=>ids().filter(i=>R(i).box>=0&&R(i).due<=now()).sort((a,b)=>rank(a)-rank(b));
function revEx(id,cb,lab){const it=BY.get(id),r=R(id);it.id=id;const eff=r.box-(r.diff>=2?2:0),
 m=eff<=0?"blank":eff===1?"first":eff<4?"type":(((now()/DAY|0)+id.length)%2?"recite":"prec"),go=()=>{EX[m](it,it.text,cb,{label:lab+" · "+SN[m]||"",lvl:it.pass?2:3});learningNav(id);};
 if(r.diff>=2){put(head("Extra practice"),refEl(it.ref),P("This verse needs extra attention. Read it once more.","small"),P(it.text,"question"),row(B("Ready",go)));learningNav(id);}else if(m==="recite"){EX.recite(it,it.text,cb,{label:lab});learningNav(id);}else go();}
function review(ids0){const q=(ids0||dueList()).slice(0,10);if(!q.length)return put(head("Review Due"),P("Nothing is due right now.","question"));
 let i=0;const seen=new Set(),t={got:0,almost:0,missed:0};
 const step=()=>{if(i>=q.length)return put(head("Review complete"),P("Got It "+t.got+" · Almost "+t.almost+" · Missed "+t.missed+(t.missed?"\nMissed verses will come back sooner.":""),"question"),row(B("Active scriptures",activeScriptures),B("Memorisation home",home,"secondary")));
  const id=q[i];revEx(id,s=>{const g=gOf(s);grade(id,g);t[g]++;if(g==="missed"&&!seen.has(id)){seen.add(id);q.push(id);}i++;step();},"Review "+(i+1)+"/"+q.length);};step();}
/* ---- views ---- */
function listRows(arr,act,full){const w=H("div");arr.forEach(id=>{
 const it=BY.get(id),r=R(id);if(!it)return;const d=H("div","memo-row");
 d.appendChild(H("b","book",it.ref));const status=H("span","pill",st(id));status.style.marginLeft="8px";d.appendChild(status);
 d.appendChild(passageText(it));if(r&&r.active!==false)d.appendChild(H("div","small",stageText(id)));
 d.appendChild(H("div","small","Topics: "+it.tp.join(", ")));
 const a=act(id,it,r);if(a&&a.length)d.appendChild(row(...a));w.appendChild(d);
});return w;}
function pauseButton(id,back){return B("Remove from active",()=>pause(id,back),"secondary");}
// The active list, paused list, learning queue and mastered verses live in ONE workspace.
let workspaceSection="active",workspaceStatus="All";
function activeScriptures(){
 load();const active=ids(),paused=allMemoIds().filter(id=>R(id).active===false),learning=active.filter(i=>R(i).box<0),due=dueList();
 const masteredCount=active.filter(id=>st(id)==="Mastered").length;
 const overview=H("div","memo-overview");
 [active.length+" active",learning.length+" learning",due.length+" due",masteredCount+" mastered"].forEach(x=>overview.appendChild(H("span","pill",x)));
 const selectors=H("div","memo-filterbar"),sectionToggle=(text,section,count)=>{
  const b=H("button","memo-chip",text+" ("+count+")",()=>{workspaceSection=section;activeScriptures();});
  b.setAttribute("aria-pressed",String(workspaceSection===section));return b;
 };
 selectors.appendChild(sectionToggle("Active","active",active.length));selectors.appendChild(sectionToggle("Paused","paused",paused.length));
 const filter=H("label","memo-filter-label"),select=document.createElement("select");
 if(workspaceSection==="active"){
  filter.appendChild(H("span","","Show"));
  ["All","Learning","Reviewing","Mastered"].forEach(value=>{const opt=H("option","",value==="All"?"All active scriptures":value);opt.value=value;opt.selected=workspaceStatus===value;select.appendChild(opt);});
  select.setAttribute("aria-label","Filter scriptures by learning progress");select.onchange=()=>{workspaceStatus=select.value;activeScriptures();};filter.appendChild(select);
 }
 const shown=workspaceSection==="paused"?paused:active.filter(id=>workspaceStatus==="All"||st(id)===workspaceStatus);
 const items=shown.length?listRows(shown,(id)=>workspaceSection==="paused"?
  [B("Resume",()=>{resume(id);workspaceSection="active";activeScriptures();}),B("Resume & learn",()=>{resume(id);workspaceSection="active";openActive(id);},"secondary")]:
  [B(R(id).box<0?"Continue learning":"Practise",()=>openActive(id)),pauseButton(id,activeScriptures)]):
  P(workspaceSection==="paused"?"No paused scriptures. Passages removed from active study will appear here, with their progress preserved.":
  workspaceStatus!=="All"?"There are no active scriptures in this stage yet. Change the filter to see other passages.":
  "Your active list is empty. Add a scripture from the library to begin memorising.","small");
 const tools=row(B("+ Add scriptures",openLibrary,"primary"));
 if(due.length&&workspaceSection==="active")tools.appendChild(B("Review "+due.length+" due",()=>review(),"secondary"));
 put(head("My Memorisation"),P("Learn, pause, resume and review from one place. Every passage keeps its own progress.","small"),overview,tools,selectors,filter,items);
}
function pausedScriptures(){workspaceSection="paused";activeScriptures();}
function sel(opts,cur,f,label){const e=document.createElement("select");if(label)e.setAttribute("aria-label",label);e.style.cssText="padding:10px;border-radius:12px;background:var(--field);color:#fff;border:1px solid rgba(255,255,255,.15);margin:0 8px 8px 0";opts.forEach(o=>{const x=document.createElement("option");x.textContent=o;x.value=o;if(o===cur)x.selected=true;e.appendChild(x);});e.onchange=()=>f(e.value);return e;}
const F={t:"All",tp:"All",bk:"All",q:"",s:"All",n:30,source:"All"};
function openLibrary(){F.t="All";F.tp="All";F.bk="All";F.s="All";F.source="All";F.q="";F.n=30;lib();}
function lib(){
 load();const books=["All",...new Set(LIB.map(x=>x.book))];
 const matches=()=>LIB.filter(x=>(F.t==="All"||(F.t==="New Testament")===x.nt)
  &&(F.tp==="All"||x.tp.includes(F.tp))&&(F.bk==="All"||x.book===F.bk)
  &&(F.s==="All"||st(x.id)===F.s)&&(F.source==="All"||x.custom)
  &&(x.ref+" "+x.text).toLowerCase().includes(F.q.toLowerCase()));
 const q=H("input","field");q.value=F.q;q.placeholder="Search book, reference, or scripture words…";
 q.setAttribute("aria-label","Search Scripture Library");q.style.marginBottom="12px";
 const list=H("div"),count=H("div","small"),more=H("div");
 const draw=()=>{
  const matching=matches();count.textContent=matching.length+" passages found";list.replaceChildren();more.replaceChildren();
  if(!matching.length){list.appendChild(P("No matching scriptures. Try clearing a filter or add your own passage.","small"));return;}
  list.appendChild(listRows(matching.slice(0,F.n).map(x=>x.id),(id,it)=>{
   const actions=[];
   if(R(id)?.active===false){actions.push(B("Resume",()=>{resume(id);draw();}));}
   else if(R(id)){actions.push(B(st(id)==="Learning"?"Continue":"Practise",()=>openActive(id)));actions.push(pauseButton(id,draw));}
   else actions.push(B("+ Memorise",()=>{add(id);draw();}));
   if(it.custom){actions.push(B("Edit",()=>scriptureEditor(id),"secondary"));actions.push(B("Delete",()=>removeCustom(id),"secondary"));}
   return actions;
  }));
  if(matching.length>F.n)more.appendChild(row(B("Show more",()=>{F.n+=30;draw();},"secondary")));
 };
 q.addEventListener("input",()=>{F.q=q.value;F.n=30;draw();});
 const tools=H("div","memo-library-tools");
 tools.appendChild(B("+ Paste New Scripture",()=>scriptureEditor(null)));
 tools.appendChild(B("My added passages",()=>{F.source="My additions";F.n=30;lib();},"secondary"));
 if(F.source!=="All")tools.appendChild(B("Show all",()=>{F.source="All";F.n=30;lib();},"secondary"));
 const filters=H("div","memo-library-filter"),update=(field)=>v=>{F[field]=v;F.n=30;lib();};
 filters.appendChild(sel(["All","Old Testament","New Testament"],F.t,update("t"),"Testament"));
 filters.appendChild(sel(["All",...Object.keys(TOP),"Other"],F.tp,update("tp"),"Scripture topic"));
 filters.appendChild(sel(books,F.bk,update("bk"),"Bible book"));
 filters.appendChild(sel(["All","Not Started","Learning","Reviewing","Mastered","Paused"],F.s,update("s"),"Memorisation status"));
 const source=H("div","small",F.source==="All"?"Showing the full Scripture library, including passages you added.":"Showing only passages you pasted into the app. You can edit or delete these below.");
 source.style.margin="0 0 8px";
 draw();put(head("Scripture Library"),P("Browse verses, add them to memorisation, or paste and manage passages from your own Bible.","small"),tools,q,source,filters,count,list,more);
}
function scriptureEditor(id){
 load();const old=id?BY.get(id):null;
 const form=H("form");form.style.cssText="display:grid;gap:14px";
 const field=(title,value,multi)=>{const wrap=H("label");wrap.style.cssText="display:grid;gap:6px;color:var(--muted);font-size:14px";wrap.appendChild(H("span","",title));const el=H(multi?"textarea":"input","field");if(multi){el.rows=9;el.style.resize="vertical";}el.value=value||"";wrap.appendChild(el);form.appendChild(wrap);return el;};
 const book=field("Bible book (e.g. John)",old?.book),verse=field("Chapter and verse (e.g. 3:16 or 3:16-18)",old?.verse),body=field("Scripture text — paste directly from your Bible",old?.text,true);
 const note=P("Paste any Bible translation. Longer passages can include multiple verses and line breaks. Your original wording will be preserved.","small");
 const saveBtn=B(old?"Save changes":"Save scripture",()=>{});saveBtn.type="submit";form.appendChild(saveBtn);
 form.onsubmit=e=>{e.preventDefault();const b=book.value.trim(),v=verse.value.trim(),t=body.value.trim();if(!b||!v||!t){alert("Enter the Bible book, reference and scripture text.");return;}
 const duplicate=LIB.some(x=>x.id!==id&&x.book.toLowerCase()===b.toLowerCase()&&(x.verse||x.ref.replace(x.book+" ","")).toLowerCase()===v.toLowerCase()&&!x.custom);
 if(duplicate&&!old&&!confirm("This reference is already in the built-in library. Add your own version as a separate passage?"))return;
 if(old){
 const changed=old.book!==b||old.verse!==v||old.text!==t;
 if(changed&&R(id)&&!confirm("This scripture is in your memorisation history. Changing its text or reference will restart its learning exercises, but keep it on your active or paused list. Continue?"))return;
 old.book=b;old.verse=v;old.ref=b+" "+v;old.text=t;old.vs=[t];old.nt=NTBOOKS.has(b);old.tp=Object.keys(TOP).filter(k=>TOP[k].test(t));if(!old.tp.length)old.tp=["Other"];
 if(changed&&R(id)){const wasActive=R(id).active!==false,added=R(id).added;S.items[id]={cs:0,ls:0,bl:1,fl:0,box:-1,due:0,diff:0,lapses:0,tn:0,ts:0,tb:0,up:0,added,active:wasActive};save();}
 }else{const item=prepareCustom({book:b,verse:v,text:t});CUSTOM.push(item);LIB.push(item);BY.set(item.id,item);}
 if(persistCustom()){F.source="My additions";F.q="";F.n=30;lib();}};
 put(head(old?"Edit Scripture":"Add New Scripture",lib),note,form);
}
function removeCustom(id){load();const item=BY.get(id);if(!item||!item.custom)return;
 if(!confirm("Delete "+item.ref+"? Its memorisation progress will also be removed. This cannot be undone."))return;
 CUSTOM=CUSTOM.filter(x=>x.id!==id);LIB.splice(LIB.findIndex(x=>x.id===id),1);BY.delete(id);delete S.items[id];save();persistCustom();lib();}
function progress(){load();const L=ids(),learn=L.filter(i=>st(i)==="Learning"),hard=L.filter(i=>R(i).diff>=2),up=L.filter(i=>R(i).up>now()-7*DAY&&R(i).box>=1).slice(0,5),cur=learn.filter(i=>BY.get(i).pass);
 const box=H("textarea");box.rows=4;box.style.cssText="width:100%;padding:10px;border-radius:12px;background:var(--field);color:#fff;border:1px solid rgba(255,255,255,.15);font-size:12px";
 const rot=(()=>{try{return localStorage.getItem("bibleQuizRotation_v2");}catch(e){return null;}})();
 const line=(t,a)=>{const d=H("div");d.style.margin="10px 0";d.appendChild(H("b","",t));if(a)d.appendChild(H("div","small",a));return d;};
 put(head("Memorisation Progress"),line("Learning: "+learn.length+" · Due: "+dueList().length+" · Mastered: "+L.filter(i=>st(i)==="Mastered").length),
  line("Current passage progress",cur.length?cur.map(i=>{const p=plan(BY.get(i));return BY.get(i).ref+" — part "+(R(i).cs+1)+" of "+p.length;}).join("\n"):"None in progress"),
  line("Difficult verses",hard.length?hard.map(i=>BY.get(i).ref).join(", "):"None — they will be flagged automatically"),
  line("Recent improvements",up.length?up.map(i=>BY.get(i).ref+" → "+st(i)).join(", "):"Nothing yet"),
  line("Backup","Copy this text to save your custom scriptures, memorisation progress and quiz rotation; paste it below to restore."),
  (box.value=JSON.stringify({v:2,memo:S,rot,custom:CUSTOM.map(x=>({id:x.id,book:x.book,verse:x.verse,text:x.text}))}),box),row(B("Restore from pasted text",()=>{const t=H("textarea");t.rows=4;t.placeholder="Paste backup here";t.style.cssText=box.style.cssText;const go=B("Restore",()=>{try{const o=JSON.parse(t.value);if(!o.memo||!o.memo.items)throw 0;if(Array.isArray(o.custom)){CUSTOM.forEach(x=>{BY.delete(x.id);const i=LIB.findIndex(y=>y.id===x.id);if(i>=0)LIB.splice(i,1);});CUSTOM=o.custom.map(prepareCustom).filter(Boolean);persistCustom();reloadCustom();}S=o.memo;save();if(o.rot)localStorage.setItem("bibleQuizRotation_v2",o.rot);Rotation.reset();home();}catch(e){alert("That backup could not be read.");}});put(head("Restore backup",progress),t,row(go));},"secondary")));}
function home(){
 load();const active=ids(),learning=active.filter(i=>R(i).box<0),d=dueList().length,paused=allMemoIds().length-active.length;
 const overview=H("div","memo-overview");
 [active.length+" active",paused+" paused",d+" due"].forEach(x=>overview.appendChild(H("span","pill",x)));
 const g=H("div","grid memo-hub"),mk=(title,subtitle,action,icon)=>{
  const b=H("button","mode action");b.innerHTML='<span class="mIcon"><svg class="ic"><use href="#i-'+icon+'"/></svg></span><span class="mText"></span>';
  const desc=b.querySelector(".mText");desc.appendChild(H("b","",title));desc.appendChild(H("span","muted",subtitle));b.onclick=action;g.appendChild(b);
 };
 mk("My Memorisation","Active, paused, learning and mastered scriptures together.",()=>{workspaceSection="active";workspaceStatus="All";activeScriptures();},"mark");
 mk("Scripture Library","Find verses, paste new passages, edit or delete your saved scriptures.",openLibrary,"book");
 mk("Progress & Backup","Track progress, export and restore your saved study data.",progress,"chart");
 const quick=H("div","memo-callout");
 if(d){quick.appendChild(H("b","",d+" scripture"+(d===1?" is":"s are")+" ready for review"));quick.appendChild(row(B("Review due scriptures",()=>review())));}
 else if(learning.length){quick.appendChild(H("b","","Pick up where you left off"));quick.appendChild(row(B("Continue "+BY.get(learning[0]).ref,()=>openActive(learning[0]))));}
 else if(active.length){quick.appendChild(H("b","","Your scriptures are ready whenever you are"));quick.appendChild(row(B("Open my memorisation",()=>{workspaceSection="active";activeScriptures();})));}
 else{quick.appendChild(H("b","","Start with your first scripture"));quick.appendChild(row(B("Browse Scripture Library",openLibrary)));}
 put(head("Scripture Memorisation",()=>showAny("home")),P("Learn → Recall → Review. Everything is organised into three sections.","small"),overview,quick,g);
}
window.memoOpen=()=>{showAny("memo");home();};
$("memoBtn").onclick=window.memoOpen;
})();
