const fs=require('node:fs'),http=require('node:http'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {chromium}=require('playwright');
const evidence='docs/evidence/phase0', fixtures='tests/fixtures/legacy';
const v14='legacy/original/Bible_Mastery_Quiz_v14_Ultra.html',v13='legacy/original/Bible_Mastery_Quiz_v13_Simplified_Memorisation.html';
const write=(f,x)=>fs.writeFileSync(f,JSON.stringify(x,null,2)+'\n');
(async()=>{
 const started=new Date().toISOString(),server=http.createServer((req,res)=>{const file=req.url==='/v13'?v13:v14;res.setHeader('Content-Type','text/html');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(8770,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const report={started,browser:browser.version(),checks:[],candidates:[],screenshots:[],defects:[],errors:[]};
 const check=(a,m)=>{assert(a,m);report.checks.push(m)};
 try{
  for(const [version,file] of [['v13',v13],['v14',v14]]){
   const ctx=await browser.newContext({reducedMotion:'reduce'});await ctx.addInitScript(()=>{let seed=12001;Math.random=()=>((seed=(Math.imul(1664525,seed)+1013904223)>>>0)/4294967296)});
   const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8770/'+version);
   const candidate={version,file,errors,runs:[],counts:await page.evaluate(()=>({characters:DATA.length,scriptures:SCRIPTURES.length,parables:PARABLES.length,miracles:MIRACLES.length}))};
   for(const mode of ['ot','nt','mixed','hard']){await page.locator(`[data-mode="${mode}"]`).click();await page.locator('#startBtn').click();candidate.runs.push(await page.evaluate(()=>({mode:selectedMode,length:quiz.length,ids:quiz.map(q=>q.id),scopes:quiz.map(q=>q.testamentScope||'historical-untyped')})));await page.locator('#stopBtn').click();await page.locator('#stopBtn').click();}
   if(version==='v14'){
    check(candidate.runs.every(r=>r.length===20),'v14 four modes each supply 20');check(candidate.runs.find(r=>r.mode==='nt').scopes.every(t=>t==='NT'),'v14 NT scope');
    const data=await page.evaluate(()=>({questions:QUESTION_BANK,characters:DATA,scriptures:SCRIPTURES,parables:PARABLES,miracles:MIRACLES,graph:KNOWLEDGE_GRAPH,legacyEquivalences:LEGACY_EQUIVALENCES,ntBooks:[...NTBOOKS]}));
    const memo=fs.readFileSync(file,'utf8').match(/\/\* ===== SCRIPTURE MEMORISATION ===== \*\/[\s\S]*?let CUSTOM=\[\];/)[0];
    data.memorisation=await page.evaluate(code=>eval('(()=>{'+code.slice(code.indexOf('const SK'),code.lastIndexOf('let CUSTOM'))+';return {passages:PV,library:LIB,topics:Object.fromEntries(Object.entries(TOP).map(([k,v])=>[k,{source:v.source,flags:v.flags}]))};})()'),memo);
    write(fixtures+'/source-data-v14.json',data);
    const generated=await page.evaluate(()=>{const ids=[...SCRIPTURES.flatMap(x=>['book','ref','fill'].map(k=>`S|${x.book}|${x.ref}|${k}`)),...PARABLES.flatMap(x=>['name','ref'].map(k=>`P|${x.name}|${k}`)),...MIRACLES.flatMap(x=>['name','ref'].map(k=>`M|${x.name}|${k}`))];let seed=447;Math.random=()=>((seed=(Math.imul(1664525,seed)+1013904223)>>>0)/4294967296);return ids.map(buildS);});
    check(generated.length===425,'425 source-anchored Scripture template units');for(const q of generated)check(q.opts.length===4&&new Set(q.opts).size===4&&q.opts.includes(q.ans),'valid generated answer '+q.id);
    write(fixtures+'/scripture-generated-seed447.json',generated);
    await page.locator('#memoBtn').click();await page.getByRole('button',{name:/^Scripture Library/}).click();
    await page.getByLabel('Search Scripture Library').fill('John 3:16');await page.getByRole('button',{name:'+ Memorise',exact:true}).first().click();await page.getByRole('button',{name:'Continue',exact:true}).first().click();await page.getByRole('button',{name:"I've read it",exact:true}).click();await page.locator('#memoBody input').first().fill('unfinished');
    await page.getByRole('button',{name:'Active list',exact:true}).click();await page.getByRole('button',{name:'Back',exact:true}).click();await page.getByRole('button',{name:/^Progress & Backup/}).click();const backup=JSON.parse(await page.getByLabel('Exported backup').inputValue());write(fixtures+'/export-v3-browser.json',backup);
    check(backup.memo.items['John|3:16'].draft.values[0]==='unfinished','actual UI export includes unfinished draft');await page.reload();await page.locator('#memoBtn').click();await page.getByRole('button',{name:'Continue John 3:16',exact:true}).click();check(await page.locator('#memoBody input').first().inputValue()==='unfinished','draft survives refresh');
   }
   report.candidates.push(candidate);await ctx.close();
  }
  for(const width of [320,360,768,1280]){
   const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const p=await ctx.newPage();p.on('pageerror',e=>report.errors.push(e.message));await p.goto('http://127.0.0.1:8770/v14');
   const shot=async name=>{check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+' no overflow '+width);const file=evidence+`/baseline-${width}-${name}.png`;await p.screenshot({path:file,fullPage:true});report.screenshots.push(file)};
   await shot('home');await p.locator('#startBtn').click();await shot('quiz');await p.keyboard.press('1');check(await p.locator('#nextBtn').isVisible(),'number key '+width);await p.keyboard.press('Enter');check(await p.locator('#qnum').innerText()==='2','enter next '+width);await p.locator('#stopBtn').click();await p.locator('#stopBtn').click();
   await p.locator('#studyBtn').click();await shot('characters');await p.locator('#backBtn').click();await p.locator('#scriptureBtn').click();await shot('scripture-menu');await p.locator('#startScripture').click();await shot('scripture-quiz');await p.locator('#sStopBtn').click();await p.locator('#sStopBtn').click();await p.locator('#browseScripture').click();await p.locator('#scriptureSearch').fill('John 3:16');await shot('browse');await p.locator('#browseBack').click();await p.locator('#scriptureBack').click();
   await p.locator('#memoBtn').click();await shot('memo-home');await p.getByRole('button',{name:/^My Memorisation/}).click();await shot('memo-active');await p.getByRole('button',{name:'Back',exact:true}).click();await p.getByRole('button',{name:/^Scripture Library/}).click();await shot('memo-library');await p.getByRole('button',{name:'+ Paste New Scripture',exact:true}).click();await shot('memo-editor');await p.getByRole('button',{name:'Back',exact:true}).click();await p.getByRole('button',{name:'Back',exact:true}).click();await p.getByRole('button',{name:/^Progress & Backup/}).click();await shot('memo-backup');
   await ctx.close();
  }
  const c=await browser.newContext(),p=await c.newPage();await p.goto('http://127.0.0.1:8770/v14');
  report.defects.push(await p.evaluate(()=>({id:'LD-IMPORT-VERSION',observed:!!Storage14.mergeBackup({v:999,memo:{items:{}}},{items:{}},[]),description:'Unknown future backup version accepted by mergeBackup'})));
  await p.evaluate(()=>localStorage.setItem('bibleCustomScriptures_v1','[null]'));const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.reload();await p.locator('#memoBtn').click();report.defects.push({id:'LD-CUSTOM-CORRUPT',errors,hubVisible:await p.locator('.memo-hub').count()});await c.close();
  const f=await browser.newPage();try{await f.goto('file://'+process.cwd()+'/'+v14);report.fileProtocol='PASS';}catch(e){report.fileProtocol='BLOCKED: '+e.message.split('\n')[0];}await f.close();
  report.status='PASS';check(report.errors.length===0,'no page errors in normal screenshot paths');
 }catch(e){report.status='FAIL';report.failure=e.stack;throw e;}finally{report.finished=new Date().toISOString();write(evidence+'/browser-baseline.json',report);await browser.close();await new Promise(r=>server.close(r));}
 console.log('PASS',report.checks.length,'phase0 checks;',report.screenshots.length,'screenshots;',report.fileProtocol);
})().catch(e=>{console.error(e);process.exitCode=1});
