from content import *
from collections import Counter
import html
p=ROOT
legacy=json.loads((p/'qa/legacy-data.json').read_text())
# Each legacy record has a permanent source ID, retained separately from edited copy.
legacy_ids={r[6]:'F|'+r[6] for r in legacy['FACT_ROWS']}
legacy_ids.update({r[1]:'A|'+r[1] for r in legacy['AB']})
raw=list(rows())
for line in (p/'src/legacy-reviewed.tsv').read_text().splitlines():
 if line.strip():raw.append(line.split('|'))
# Pending historical identification: do not silently approve an extra-biblical full name.
raw=[r for r in raw if r[0]!='herod']
legacy_equivalences=json.loads((p/'src/legacy-equivalences.json').read_text())
notes=json.loads((p/'src/review-overrides.json').read_text()) if (p/'src/review-overrides.json').exists() else {}
registry_path=p/'src/option-identities.json'
registry=json.loads(registry_path.read_text()) if registry_path.exists() else {}
bank=[];ledger=[]
for id,refs,cat,level,stem,opts,why in raw:
 id=id.strip();ev=passage(refs);books=list(dict.fromkeys(re.sub(r' \d+:.*','',x['reference']) for x in ev));labels=opts.split(';')
 qid=legacy_ids.get(id,'bible-q-'+id)
 if qid not in registry:registry[qid]=[qid+':'+re.sub('[^a-z0-9]+','-',label.lower()).strip('-') for label in labels]
 choices=[{'id':oid,'label':label} for oid,label in zip(registry[qid],labels)]
 scope='CROSS' if any(BOOKS.index(b)<39 for b in books) and any(BOOKS.index(b)>=39 for b in books) else 'OT' if BOOKS.index(books[0])<39 else 'NT'
 n=BOOKS.index(books[0]);era='Patriarchs and Torah' if n<5 else 'Conquest and monarchy' if n<14 else 'Exile, poetry and prophets' if n<39 else 'Jesus and apostles'
 q={'id':qid,'knowledgePointId':notes.get(id,{}).get('knowledgePointId','fact:'+id),'equivalenceGroup':notes.get(id,{}).get('knowledgePointId','fact:'+id),'eventGroup':notes.get(id,{}).get('eventGroup','event:'+id),'stem':stem,'options':choices,'correctOptionId':choices[0]['id'],'primaryCategory':cat,'secondaryCategories':[],'difficulty':level,'difficultyRationale':{'beginner':'Familiar narrative or explicit image, one direct fact.','intermediate':'Specific context or relationship among related alternatives.','advanced':'Precise role, location, legal detail or less familiar identity.','mastery':'Discriminates accounts, identities or linked passages; see explanation.'}[level],'testamentScope':scope,'bookCoverage':books,'era':era,'references':refs.split(';'),'explanation':why,'whyDistractorsAreWrong':{o['id']:notes.get(id,{}).get('contrasts',{}).get(o['label'],'The account identifies '+labels[0]+', rather than '+o['label']+', for the detail asked. See the explanation and cited passage.') for o in choices[1:]},'provenance':{'edition':'ASV (1901)','proofStatus':'passage-reviewed','source':'scrollmapper/bible_databases','revision':(p/'qa/sources/revision.txt').read_text().strip()},'editorialStatus':'approved','origin':'legacy-repaired' if id in legacy_ids else 'new','questionType':'single-choice','contextWarnings':notes.get(id,{}).get('warnings',[])}
 q['legacySourceIds']=[old for old,target in legacy_equivalences.items() if target==qid]
 if q['legacySourceIds']:q['origin']='legacy-repaired'
 bank.append(q);ledger.append({**q,'evidence':ev,'reviewScope':'Passage and options reviewed by implementing assistant; independent human editorial review outstanding.'})
registry_path.write_text(json.dumps(registry,ensure_ascii=False,indent=2))
assert len({q['id'] for q in bank})==len(bank)
assert all(len(q['options'])==4 and len(set(o['label'] for o in q['options']))==4 for q in bank)
(p/'src/bank.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2))
(p/'Bible_Mastery_v14_Source_Ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2))
(p/'qa/verse-index.json').write_text(json.dumps({b:{str(c):max(v) for c,v in chapters.items()} for b,chapters in INDEX.items()}))
h=(p/'original/Bible_Mastery_Quiz_v13_Simplified_Memorisation.html').read_text()
blocks=re.findall(r'<script>(.*?)</script>',h,re.S)
main=blocks[0]
main=main[:main.index('function pool(){')]+(p/'src/quiz.js').read_text()+main[main.index('document.getElementById("nextBtn").onclick'):]
main=main.replace('DATA.length+" characters • "+FACTS.length+" multi-step questions"','DATA.length+" study characters • "+BANK.length+" reviewed quiz questions"')
main=main.replace('document.querySelectorAll(".mode").forEach','document.querySelectorAll(".mode[data-mode]").forEach')
main=main.replace('function burst(n=80){','function burst(n=80){\n if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;')
main=main.replace('function show(id){["home","quiz","result","study"].forEach(x=>document.getElementById(x).classList.toggle("hidden",x!==id));}','function show(id){showAny(id);}')
# Safe even if a future study pack contains markup-like strings.
main=main.replace('${x.n}','${escapeText(x.n)}').replace('${x.book}','${escapeText(x.book)}').replace('${x.kids}','${escapeText(x.kids)}').replace('${x.story}','${escapeText(x.story)}').replace('${x.text}','${escapeText(x.text)}').replace('${x.ref}','${escapeText(x.ref)}')
# Correct verified legacy study wording, retaining all character records.
main=main.replace('destroyed Ahab\'s dynasty and killed Jezebel','destroyed Ahab\'s dynasty and ordered Jezebel thrown down by the eunuchs')

main=main.replace('A son is not named in his story; he is linked genealogically to Eliam','Eliam is named as his son (2 Samuel 23:34)')
main=main.replace('Jonathan, Abinadab/Ishvi, Malchi-shua, Ish-bosheth; Merab and Michal','Jonathan, Ishvi, Malchi-shua (1 Samuel 14:49); Abinadab (1 Samuel 31:2); Ish-bosheth; Merab and Michal')
main=main.replace('"n":"Othniel","kids":"None clearly named"','"n":"Othniel","kids":"Hathath (1 Chronicles 4:13)"')
main=main.replace('Ahaziah, Joram/Jehoram, Athaliah','Ahaziah and Joram/Jehoram; Athaliah is called Ahab\'s daughter, but her mother is not named')
memo=blocks[2]
memo=memo.replace('body=String(x.text||"").trim()','body=String(x.text||"")').replace('if(!book||!ref||!body)return null','if(!book||!ref||!body.trim())return null')
memo=memo.replace('t=body.value.trim();if(!b||!v||!t)','t=body.value;if(!b||!v||!t.trim())')
memo=memo.replace('function save(){try{localStorage.setItem(SK,JSON.stringify(S));}catch(e){}}','function save(){return Storage14.commit({[SK]:JSON.stringify(S)});}')
memo=memo.replace('function persistCustom(){try{localStorage.setItem(CUSTOM_KEY,JSON.stringify(CUSTOM.map(x=>({id:x.id,book:x.book,verse:x.verse,text:x.text}))));return true;}catch(e){alert("Unable to save scripture. Check browser storage availability.");return false;}}','function persistCustom(){return Storage14.commit({[CUSTOM_KEY]:JSON.stringify(CUSTOM.map(x=>({id:x.id,book:x.book,verse:x.verse,text:x.text}))),[SK]:JSON.stringify(S)});}')
# Custom editor/delete changes commit both keys together; memory rolls back if persistence fails.
memo=memo.replace('const changed=old.book!==b','const changed=old.book!==b')
memo=memo.replace('form.onsubmit=e=>{e.preventDefault();','form.onsubmit=e=>{e.preventDefault();const beforeMemo=JSON.stringify(S);')
memo=memo.replace('added,active:wasActive};save();','added,active:wasActive};')
memo=memo.replace('if(persistCustom()){F.source="My additions";F.q="";F.n=30;lib();}','if(persistCustom()){F.source="My additions";F.q="";F.n=30;lib();}else{S=JSON.parse(beforeMemo);reloadCustom();}')
memo=memo.replace('CUSTOM=CUSTOM.filter(x=>x.id!==id);','const beforeMemo=JSON.stringify(S);CUSTOM=CUSTOM.filter(x=>x.id!==id);')
memo=memo.replace('delete S.items[id];save();persistCustom();lib();','delete S.items[id];if(!persistCustom()){S=JSON.parse(beforeMemo);reloadCustom();}lib();')
memo=memo.replace('{v:2,memo:S,rot,custom:','{v:3,memo:S,rot,quizHistory,custom:')
a=memo.index('const o=JSON.parse(t.value);');b=memo.index('}catch(e){alert("That backup could not be read.");}',a)
memo=memo[:a]+'''const o=Storage14.safeParse(t.value);
 const currentCustom=CUSTOM.map(x=>({id:x.id,book:x.book,verse:x.verse,text:x.text}));
 const merged=Storage14.mergeBackup(o,S,currentCustom);
 const mergedHistory=Engine.history(o.quizHistory);for(const [id,r] of Object.entries(quizHistory.items)){if(!mergedHistory.items[id]||r.attempts>=mergedHistory.items[id].attempts)mergedHistory.items[id]=r;}mergedHistory.session=Math.max(mergedHistory.session,quizHistory.session);
 const changes={[SK]:JSON.stringify(merged.memo),[CUSTOM_KEY]:JSON.stringify(merged.custom),[Engine.key]:JSON.stringify(mergedHistory)};
 // Preserve an existing v2 rotation; old backup rotation is restored only if no current rotation exists.
 if(o.rot&&!localStorage.getItem('bibleQuizRotation_v2')){const old=Storage14.safeParse(o.rot);if(!old||typeof old.bags!=='object')throw Error('Invalid rotation');changes.bibleQuizRotation_v2=o.rot;}
 if(!Storage14.commit(changes))return;S=merged.memo;quizHistory=mergedHistory;reloadCustom();Rotation.reset();home();''' +memo[b:]
memo=memo.replace('paste it below to restore.','paste it below to merge a backup. Existing progress is kept on conflicts; conflicting custom passages are retained separately. Progress is local to this browser.')
# Accessible names for controls created by exercises.
memo=memo.replace('e.autocapitalize="off";','e.setAttribute("aria-label","Missing word "+(i+1));e.autocapitalize="off";')
memo=memo.replace('ta.rows=6;','ta.setAttribute("aria-label","Your recalled scripture");ta.rows=6;')
memo=memo.replace('const box=H("textarea");','const box=H("textarea");box.setAttribute("aria-label","Exported backup");')
memo=memo.replace('t.placeholder="Paste backup here"','t.setAttribute("aria-label","Paste backup here");t.placeholder="Paste backup here"')
# Remove replacing start layer altogether. Only confirmation helper remains.
arch='''function twoTap(id,label,go){const b=document.getElementById(id),text=b.innerHTML;let timer;b.onclick=()=>{if(b.dataset.arm){clearTimeout(timer);delete b.dataset.arm;b.innerHTML=text;go();return;}b.dataset.arm=1;b.innerHTML=label;timer=setTimeout(()=>{delete b.dataset.arm;b.innerHTML=text;},3000);};}
twoTap('stopBtn','Tap again to stop &amp; lose progress',()=>{clearInterval(tick);showAny('home');});
twoTap('sStopBtn','Tap again to stop this session',()=>{Rotation.release(sKey);showAny('scriptureHome');});'''
for old,new in zip(blocks,[main,arch,memo,blocks[3].replace('if(e.metaKey||','if(e.target.isContentEditable||e.metaKey||')]):h=h.replace('<script>'+old+'</script>','<script>'+new+'</script>')
pre=(p/'src/engine.js').read_text()+'\n'+(p/'src/storage.js').read_text()+'''\nfunction escapeText(t){return String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}\n'''
pre+='const KNOWLEDGE_GRAPH='+json.dumps(json.loads((p/'src/graph.json').read_text()),ensure_ascii=False)+';\n'
pre+='const LEGACY_EQUIVALENCES='+json.dumps(legacy_equivalences)+';\n'
pre+='const QUESTION_BANK='+json.dumps(bank,ensure_ascii=False).replace('</','<\\/')+';\n'
h=h.replace('<script>','<script>'+pre+'</script>\n<script>',1)
h=h.replace('Scripture Memorisation v13','Bible Mastery v14').replace('Memorisation v13 • Works in Chrome','Bible Mastery v14 • Local-only')
h=h.replace('Twenty questions on characters, families, events and where to find them.','Twenty varied questions on people, places, events and Scripture.')
h=h.replace('</style>','.qmeta{gap:12px;flex-wrap:wrap}.answer{overflow-wrap:anywhere;min-width:0}.question{overflow-wrap:anywhere}.memo-active-nav input{max-width:100%}details summary{cursor:pointer}#explanation p{margin-top:10px}button,select,input,textarea{max-width:100%}</style>',1)
h=h.replace('</div>\n\n<script>','</div>\n\n<script>',1)
sourceinfo='<details class="footer"><summary>Sources &amp; attributions</summary><p>Quiz evidence: American Standard Version (1901), public domain, from Scrollmapper Bible Databases. Existing KJV passages and your own wording are retained. No runtime downloads or uploads.</p><pre style="white-space:pre-wrap;text-align:left">'+html.escape((p/'qa/sources/LICENSE').read_text())+'</pre></details>'
h=h.replace('<div class="footer"><span id="dbCount">',sourceinfo+'<div class="footer"><span id="dbCount">')
(p/'Bible_Mastery_Quiz_v14_Ultra.html').write_text(h)
counts=Counter(q['difficulty'] for q in bank)
coverage={b:{'total':sum(b in q['bookCoverage'] for q in bank),'levels':dict(Counter(q['difficulty'] for q in bank if b in q['bookCoverage']))} for b in BOOKS}
(p/'qa/counts.json').write_text(json.dumps({'total':len(bank),'distinctKnowledgePoints':len(set(q['knowledgePointId'] for q in bank)),'levels':counts,'origin':dict(Counter(q['origin'] for q in bank)),'testament':dict(Counter(q['testamentScope'] for q in bank)),'categories':dict(Counter(q['primaryCategory'] for q in bank)),'books':coverage},indent=2))
print('Built',len(bank),'questions',dict(counts),'HTML bytes',len(h.encode()))
