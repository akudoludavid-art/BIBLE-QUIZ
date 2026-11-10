
/* ===== QUESTION ARCHITECTURE: audit gate, authored bank, relational generators ===== */
(function(){
const sh=shuffle,rnd=a=>a[Math.floor(Math.random()*a.length)],many=(a,n)=>sh(a).slice(0,n);
const BAD_STEM=[/^where can the story of/i,/^which book contains/i,/^who was \w+\??$/i,/\bknown for\b/i,/\blesson\b/i,/associated with/i,/^who (was a |helped |followed |showed |trusted )/i,/^what did .* do\??$/i];
const BAD_ANS=/^(he|she|they) (trusted|obeyed|was punished|became|prayed|preached|helped|rejected)\b|^god blessed|^he was a (king|prophet)/i;
function leak(q){const t=(q&&q.q||"").toLowerCase();return !!q&&/found|contain|which book/.test(t)&&q.options.some(o=>o.length>3&&t.includes(o.toLowerCase().replace(/ \d.*$/,"")));}
function audit(q){if(leak(q))return false;
 if(!q||!q.options||q.options.length<4||new Set(q.options).size<4||!q.options.includes(q.correct))return false;
 if(BAD_STEM.some(r=>r.test(q.q))||q.options.some(o=>BAD_ANS.test(o)))return false;
 const oth=q.options.filter(o=>o!==q.correct);
 if(q.correct.length>30&&q.correct.length>1.6*Math.max(...oth.map(o=>o.length)))return false;
 return true;}
const Q=(id,lvl,q,a,d,ref,why)=>({id:"A|"+id,key:"arch",lvl,q,correct:a,options:sh([a,...d]),exp:"<b>"+a+"</b> — "+why+' <span class="book">'+ref+"</span>"});
/* authored bank: [mode,id,lvl,question,correct,[near-miss distractors],reference,why] */
const AB=[
["n","markfam",3,"Which man went with Barnabas and Saul from Jerusalem to Antioch after their famine-relief visit?","John Mark",["Silas","Timothy","Judas Barsabbas"],"Acts 12:25","Silas and Judas Barsabbas were sent to Antioch after the Jerusalem Council; Timothy joined Paul later, at Lystra."],
["n","amos",3,"Which prophet was told by Amaziah the priest of Bethel to flee to Judah after announcing that Jeroboam would die by the sword?","Amos",["Hosea","Jonah","Micah"],"Amos 7:10–13","Hosea and Jonah also belong to Jeroboam II's era, but only Amos was confronted by Amaziah at Bethel; Micah prophesied in Judah."],
["n","nathan",3,"Which prophet confronted David over Bathsheba and Uriah with the story of a poor man's lamb?","Nathan",["Gad","Ahijah","Samuel"],"2 Sam 12:1–13","Gad was David's seer and Samuel was already dead; Ahijah belongs to Solomon's later years."],
["n","adonijah",3,"Which son of David tried to make himself king while David lived, with Joab and the priest Abiathar supporting him?","Adonijah",["Absalom","Amnon","Chileab"],"1 Kgs 1:5–10","Absalom also rebelled, but earlier, backed by Ahithophel; Adonijah's party included Joab and Abiathar."],
["n","nicodemus",3,"Which Pharisee first came to Jesus by night and later brought spices for His burial?","Nicodemus",["Gamaliel","Simon the Pharisee","Jairus"],"John 3:1–2; 19:39","Only Nicodemus is named in both scenes, and he assisted Joseph of Arimathea."],
["h","herod",4,"Which Herod had James, the brother of John, killed with the sword and then imprisoned Peter?","Herod Agrippa I",["Herod the Great","Herod Antipas","Herod Agrippa II"],"Acts 12:1–4","Herod the Great ruled at Jesus' birth, Antipas beheaded John the Baptist, and Agrippa II heard Paul at Caesarea."],
["h","zech",5,"Which Zechariah was stoned in the court of the LORD's house at the command of King Joash?","Zechariah son of Jehoiada",["Zechariah the father of John the Baptist","Zechariah son of Berechiah","Zechariah son of Jeroboam II"],"2 Chr 24:20–22","The son of Berechiah wrote the prophecy, the son of Jeroboam II was killed by Shallum, and John's father was a priest in Herod's day."],
["h","judas",4,"Which man named Judas asked at the Last Supper why Jesus would reveal Himself to the disciples and not to the world?","Judas the son of James",["Judas Iscariot","Judas Barsabbas","Judas the Galilean"],"John 14:22; Luke 6:16","Iscariot had already left; Barsabbas and the Galilean belong to Acts."],
["h","hosea",5,"Matthew applies 'Out of Egypt have I called my son' to Jesus' return from Egypt. Which prophet first wrote it, about Israel?","Hosea",["Jeremiah","Isaiah","Micah"],"Matt 2:15; Hos 11:1","Matthew also cites Micah (2:6) and Jeremiah (2:18) in the same chapter, for different events."],
["h","sheba",4,"Jesus says who will rise in judgment against that generation because she came from the ends of the earth to hear wisdom?","The queen of the south",["Ruth the Moabitess","Rahab of Jericho","The widow of Zarephath"],"Matt 12:42; 1 Kgs 10:1–10","Jesus names her alongside the men of Nineveh; she visited Solomon."],
["h","manasseh",5,"Which king of Judah, in an account found only in Chronicles, was bound in fetters and taken to Babylon, then restored after humbling himself?","Manasseh",["Jehoiakim","Jehoahaz","Zedekiah"],"2 Chr 33:10–13","Jehoiakim was bound for Babylon but not restored; Jehoahaz went to Egypt; Zedekiah was blinded."],
["h","overlap",5,"Which prophet's ministry could NOT have overlapped with the reign of Hezekiah?","Jeremiah",["Isaiah","Micah","Hosea"],"Jer 1:2; Isa 1:1; Mic 1:1; Hos 1:1","Isaiah, Micah and Hosea each name Hezekiah in their opening verses; Jeremiah began in Josiah's thirteenth year."],
["h","rahab",5,"Matthew 1 makes Salmon the husband of Rahab, then lists Boaz, Obed, Jesse and David in descent. How is Rahab related to David?","Great-great-grandmother",["Great-grandmother","Grandmother","Great-great-great-grandmother"],"Matt 1:5–6","Rahab → Boaz → Obed → Jesse → David gives four generations between them."],
["h","carmel",4,"After the prophets of Baal were slain at the brook Kishon, what did Elijah do next in the narrative?","Told Ahab to eat, since rain was coming",["Fled to Beersheba from Jezebel's threat","Fasted forty days at Horeb","Anointed Elisha at Abel-meholah"],"1 Kgs 18:40–41","Jezebel's threat, Horeb and Elisha's call all come later in 1 Kings 19."],
["h","jehoiada",5,"Three statements about the priest Jehoiada are correct. Which is NOT?","He was put to death by Joash for rebuking Judah's idolatry",["He kept the young Joash hidden in the temple for six years","His wife Jehosheba was a daughter of King Jehoram","He was buried in the City of David among the kings"],"2 Kgs 11–12; 2 Chr 22:11; 24:15–22","Joash killed Jehoiada's son Zechariah, not Jehoiada, who died full of years."],
["h","mephi",5,"Which person fits every clue: belonged to Saul's household; was lame in both feet; was shown kindness by David for Jonathan's sake; had a servant named Ziba?","Mephibosheth",["Ish-bosheth","Mica","Abner"],"2 Sam 9:1–13","Mica was his son and Ish-bosheth and Abner were Saul's kin, but only Mephibosheth was lame, was hosted by David, and was served by Ziba."],
["h","obadiah",5,"Which man both hid a hundred prophets from Jezebel and later met Elijah while managing Ahab's household?","Obadiah",["Micaiah son of Imlah","Jehu son of Hanani","Zedekiah son of Chenaanah"],"1 Kgs 18:3–7","The others are Ahab-era prophets who never ran his household."],
["h","dothan",5,"Which combination of prophet, place and event is correct?","Elisha — Dothan — his servant saw fiery horses and chariots around the hill",["Elijah — Dothan — his servant saw fiery horses and chariots around the hill","Elisha — Gilgal — his servant saw fiery horses and chariots around the hill","Elisha — Dothan — Naaman was healed by washing in the Jordan"],"2 Kgs 6:13–17","Each wrong option swaps one element: the prophet, the place, or the event."],
["h","flight",5,"Which sequence gives the order of these stops in David's flight from Saul, beginning with his visit to Ahimelech?","Nob → Gath → Adullam → Keilah",["Gath → Nob → Adullam → Keilah","Nob → Adullam → Gath → Keilah","Adullam → Nob → Gath → Keilah"],"1 Sam 21–23","David took the showbread at Nob, feigned madness at Gath, gathered men at Adullam, then saved Keilah."],
["h","pisidia",5,"On the first missionary journey, which city did Paul and Barnabas reach between Perga in Pamphylia and Iconium?","Antioch in Pisidia",["Lystra","Derbe","Troas"],"Acts 13:13–51","Lystra and Derbe come after Iconium; Troas belongs to a later journey."],
["h","conclusion",4,"Jesse fathered David, David fathered Solomon, and Solomon fathered Rehoboam. Which conclusion must follow?","Jesse was Rehoboam's great-grandfather",["Jesse was Rehoboam's grandfather","David was Rehoboam's great-grandfather","Solomon was Jesse's son"],"1 Kgs 11:43; Ruth 4:22","Jesse → David → Solomon → Rehoboam puts Jesse three generations above Rehoboam."],
["h","elisha-wrong",5,"Which statement wrongly gives Elisha an event that belongs to a different prophet?","He called down fire against the prophets of Baal on Mount Carmel",["He made an iron axe head float at the Jordan","He healed Naaman's leprosy through the Jordan","He multiplied a widow's oil in borrowed vessels"],"1 Kgs 18; 2 Kgs 4–6","Carmel is Elijah's contest; the other three are recorded of Elisha."],
["h","zimri",4,"Which speaker and recipient fit the words 'Had Zimri peace, who slew his master?'","Jezebel to Jehu at Jezreel",["Athaliah to Jehoiada in the temple","Jezebel to Elijah after Carmel","Athaliah to Jehu at Samaria"],"2 Kgs 9:30–31","Jezebel called from her window to Jehu, comparing him to Zimri, who murdered King Elah."],
["h","thess",5,"Which two cities did Paul and Silas pass through after leaving Philippi, before reaching Thessalonica?","Amphipolis and Apollonia",["Neapolis and Amphipolis","Apollonia and Berea","Amphipolis and Berea"],"Acts 17:1","Neapolis is before Philippi and Berea comes after Thessalonica."],
["h","satan-census",5,"Which book says Satan provoked David to number Israel, where the parallel account says the LORD's anger moved him?","1 Chronicles",["2 Samuel","1 Kings","2 Chronicles"],"1 Chr 21:1; 2 Sam 24:1","The Chronicles version names Satan; Samuel records the same census with the LORD's anger."],
["h","amos-stephen",5,"In his speech, which prophet does Stephen quote about Israel carrying the tabernacle of Moloch?","Amos",["Hosea","Isaiah","Ezekiel"],"Acts 7:42–43; Amos 5:25–27","Stephen cites Amos on Israel's idolatry in the wilderness."],
["h","jehu-sent",4,"Who sent a young prophet to Ramoth-gilead to anoint Jehu king, though Elijah had earlier been told to anoint him?","Elisha",["Elijah","Jehoiada","Micaiah"],"2 Kgs 9:1–6; 1 Kgs 19:16","Elijah received the command, but Elisha carried it out."],
["h","simon-joppa",4,"Which Simon lodged Peter in his house by the sea at Joppa?","Simon the tanner",["Simon the sorcerer","Simon the Zealot","Simon the leper"],"Acts 9:43; 10:5–6","The sorcerer was in Samaria, the Zealot an apostle, and the leper hosted Jesus at Bethany."],
["h","jonah-nineveh",4,"Which prophet, active under Jeroboam II, was sent to Nineveh?","Jonah",["Nahum","Amos","Hosea"],"2 Kgs 14:25; Jonah 1:1–2","Nahum also spoke against Nineveh but is not tied to Jeroboam II; Amos and Hosea preached in Israel."],
["h","trio",4,"Which combination of king, prophet and enemy is correct?","Hezekiah — Isaiah — Sennacherib of Assyria",["Josiah — Isaiah — Sennacherib of Assyria","Hezekiah — Jeremiah — Sennacherib of Assyria","Hezekiah — Isaiah — Nebuchadnezzar of Babylon"],"2 Kgs 19:1–7","Isaiah assured Hezekiah against Sennacherib; each wrong option changes one element."],
["n","cherith",3,"Which brook, east of the Jordan, did God send Elijah to hide by, where ravens fed him?","Cherith",["Kidron","Kishon","Besor"],"1 Kgs 17:3–6","Kidron is by Jerusalem, Kishon by Carmel, and Besor near Ziklag."],
["n","elah",3,"In which valley did David face Goliath?","Valley of Elah",["Valley of Jezreel","Valley of Achor","Valley of Rephaim"],"1 Sam 17:2","Rephaim and Jezreel host other battles; Achor is Achan's valley."],
["n","azotus",3,"After the Ethiopian's baptism, Philip was found at which city?","Azotus",["Joppa","Lydda","Caesarea"],"Acts 8:39–40","Philip then preached northward until he reached Caesarea."],
["n","matthias",3,"Who was numbered with the eleven after the lot fell between him and Joseph called Barsabas?","Matthias",["Barnabas","Silas","Cleopas"],"Acts 1:23–26","He replaced Judas Iscariot."],
["n","nehemiah",3,"Which man served as cupbearer to a Persian king before becoming governor in Judah?","Nehemiah",["Zerubbabel","Ezra","Sheshbazzar"],"Neh 1:11; 5:14","Zerubbabel and Sheshbazzar governed earlier; Ezra was a priest and scribe."],
["n","house-prayer",4,"When cleansing the temple, Jesus said 'My house shall be called the house of prayer.' Which prophet wrote those words?","Isaiah",["Jeremiah","Malachi","Zechariah"],"Matt 21:13; Isa 56:7","'Den of thieves' is from Jeremiah 7:11, in the same saying."]
];
const AQ=m=>AB.filter(r=>r[0]===m).map(r=>Q(r[1],r[2],r[3],r[4],r[5],r[6],r[7]));
/* generator 1: chronology of Judah's kings */
const JK=["Rehoboam","Abijah","Asa","Jehoshaphat","Jehoram","Ahaziah","*Athaliah","Joash","Amaziah","Uzziah","Jotham","Ahaz","Hezekiah","Manasseh","Amon","Josiah","Jehoahaz","Jehoiakim","Jehoiachin","Zedekiah"];
function gBetween(){let i;do{i=1+Math.floor(Math.random()*(JK.length-2));}while([i-1,i,i+1].some(k=>JK[k][0]==="*"));
 const ds=JK.map((n,k)=>[n,k]).filter(([n,k])=>n[0]!=="*"&&Math.abs(k-i)>=2&&Math.abs(k-i)<=4).map(x=>x[0]);
 if(ds.length<3)return null;
 return Q("btw"+i,4,"Which king of Judah reigned after "+JK[i-1]+" and before "+JK[i+1]+"?",JK[i],many(ds,3),"1–2 Kings; 2 Chr 10–36","Judah's succession runs "+JK[i-1]+" → "+JK[i]+" → "+JK[i+1]+"; the others belong elsewhere in the line.");}
/* generator 2: Israel king among Judah kings */
const IK=["Omri","Baasha","Jehu","Menahem","Pekah","Hoshea","Jeroboam son of Nebat"],JJ=JK.filter(n=>n[0]!=="*"&&n!=="Ahaziah"&&n!=="Jehoram");
function gNot(){const a=rnd(IK);return Q("not"+a,4,"Which of these men never reigned over Judah?",a,many(JJ,3),"1–2 Kings","Judah's throne stayed in David's line; "+a+" ruled the northern kingdom.");}
/* generator 3: second-order (paternal grandfather) */
const GF=[["Solomon","Jesse",["David","Obed","Boaz"],"1 Chr 2:12–15"],["Amon","Hezekiah",["Manasseh","Josiah","Ahaz"],"2 Kgs 20:21; 21:18"],["Jehoiachin","Josiah",["Jehoiakim","Amon","Zedekiah"],"2 Kgs 23:34; 24:6"],["Moses","Kohath",["Amram","Levi","Aaron"],"Ex 6:16–20"],["David","Obed",["Jesse","Boaz","Salmon"],"Ruth 4:17–22"],["Hezekiah","Jotham",["Ahaz","Uzziah","Amaziah"],"2 Kgs 15:32–16:20"]];
function gGrand(){const g=rnd(GF);return Q("gf"+g[0],5,"Which man was the paternal grandfather of "+g[0]+"?",g[1],g[2],g[3],g[1]+" is two generations above "+g[0]+"; the other names are his father, an earlier ancestor, or a relative.");}
const CH=[["Abraham","Isaac","Jacob","Judah","Perez"],["Judah","Perez","Hezron","Ram","Amminadab"],["Boaz","Obed","Jesse","David","Solomon"],["Solomon","Rehoboam","Abijah","Asa","Jehoshaphat"],["Uzziah","Jotham","Ahaz","Hezekiah","Manasseh"],["Hezekiah","Manasseh","Amon","Josiah","Jehoiakim"],["Levi","Kohath","Amram","Aaron","Eleazar"]];
const REL=["father","grandfather","great-grandfather","great-great-grandfather"],SON=["son","grandson","great-grandson","great-great-grandson"];
function gChain(){const c=rnd(CH),i=Math.floor(Math.random()*2),g=2+Math.floor(Math.random()*3),j=Math.min(4,i+g),gap=j-i,up=Math.random()<.5,A=c[i],B=c[j],w=up?REL:SON;
 return Q("ch"+A+B+up,gap>=3?5:4,"Following the paternal line recorded in Scripture, what was "+(up?A+" to "+B:B+" to "+A)+"?",w[gap-1],w.filter((x,k)=>k!==gap-1),"Ruth 4; 1 Chr 1–3; 2 Kgs; Ex 6; Gen 25–38","The line runs "+c.slice(i,j+1).join(" → ")+", so "+gap+" generation"+(gap>1?"s":"")+" separate them.");}
const seen=new Set();
function hardSet(){const fact=(typeof FACTS!=="undefined"?FACTS.filter(f=>f.lvl>=5).map(f=>factQuestion(f)).filter(audit):[]);
 const pickA=many(AQ("h").filter(q=>!seen.has(q.id)),8);if(pickA.length<8)seen.clear();pickA.forEach(q=>seen.add(q.id));
 const out=[...pickA,...many(fact,4)],ids=new Set(out.map(q=>q.q));
 const add=f=>{for(let t=0;t<12;t++){const q=f();if(q&&audit(q)&&!ids.has(q.q)){ids.add(q.q);out.push(q);return;}}};
 for(let k=0;k<3;k++)add(gBetween);add(gNot);for(let k=0;k<2;k++)add(gGrand);for(let k=0;k<3;k++)add(gChain);
 return sh(out).slice(0,20);}
function normalSet(){const base=quiz.filter(audit),ex=new Set(base.map(q=>q.q));
 const a=many(AQ("n").filter(q=>!ex.has(q.q)),6);return sh(sh(base).slice(0,20-a.length).concat(a));}
const orig=start;
function run(){orig();quiz=selectedMode==="hard"?hardSet():normalSet();
 if(selectedMode==="hard"){Rotation.release(activeKey);Rotation.release(factKey);}
 idx=0;score=0;document.getElementById("qtotal").textContent=quiz.length;document.getElementById("score").textContent=0;render();}
document.getElementById("startBtn").onclick=run;document.getElementById("againBtn").onclick=run;
function twoTap(id,label,go){const b=document.getElementById(id),t=b.innerHTML;let to;
 b.onclick=()=>{if(b.dataset.arm){clearTimeout(to);delete b.dataset.arm;b.innerHTML=t;go();return;}
  b.dataset.arm=1;b.innerHTML=label;to=setTimeout(()=>{delete b.dataset.arm;b.innerHTML=t;},3000);};}
twoTap("stopBtn","Tap again to stop &amp; lose progress",()=>{clearInterval(tick);try{Rotation.release(activeKey);Rotation.release(factKey);}catch(e){}show("home");});
twoTap("sStopBtn","Tap again to stop this session",()=>showAny("scriptureHome"));
window.QA={audit,AB,hardSet};
})();
