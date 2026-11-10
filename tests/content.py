import sys,json,hashlib,re
from pathlib import Path
sys.path.insert(0,'src')
from content import passage,BOOKS
p=Path('.');bank=json.load(open('src/bank.json'));by={q['id']:q for q in bank};ledger=json.load(open('Bible_Mastery_v14_Source_Ledger.json'));checks=0

def check(x,msg):
 global checks
 assert x,msg
 checks+=1
for q in ledger:
 ev=passage(';'.join(q['references']))
 check(ev==q['evidence'],q['id']+' evidence mismatch')
 check(len(q['options'])==4,q['id'])
 check(q['correctOptionId'] in [x['id'] for x in q['options']],q['id'])
 check(q['provenance']['edition']=='ASV (1901)',q['id'])
 check(q['explanation'] and len(q['explanation'])>40,q['id'])
check(set(b for q in bank for b in q['bookCoverage'])==set(BOOKS),'66-book coverage')
g=json.load(open('src/graph.json'));ids={e['id'] for e in g['entities']}
for e in g['edges']:check(e['from'] in ids and e['to'] in ids,'edge endpoints');check(bool(passage(e['reference'])),'edge reference')
def hops(start,end,relation,reverse=False):
 edges=g['edges'];seen=set();todo=[(start,0)]
 while todo:
  x,n=todo.pop(0)
  if x==end:return n
  if x in seen:continue
  seen.add(x)
  for e in edges:
   a,b=(e['to'],e['from']) if reverse else (e['from'],e['to'])
   if e['relation']==relation and a==x:todo.append((b,n+1))
 return None
check(hops('person:rahab','person:david','recorded_parent')==4,'four written links')
check(hops('person:david','person:rahab','recorded_parent',True)==4,'reverse genealogy')
check(hops('ruler:hezekiah','ruler:josiah','succeeded_by')==3,'succession path')
# Thirty explicit editorial hazard fixtures, tied to actual records or exclusions.
fixtures=[
('01','bible-q-joram-arrow','Jehu'),('02','bible-q-jezebel-agents','The eunuchs who looked out'),('03','bible-q-ahab-wound','An unnamed man who drew his bow'),('04','bible-q-saul-narrator','Fell on his own sword'),('05','bible-q-amon-aftermath','The people of the land'),('06','bible-q-ebed-rescue','Ebed-melech'),('07','bible-q-bethel-luz','Luz'),('08','bible-q-azariah-joash','Zechariah son of Jehoiada'),('09','F|agrippa2:paul','Agrippa'),('10','A|amos','Amos'),('11','A|jehoiada','Jehoiada died aged 130, and Zechariah was stoned at Joash\'s command'),('12','bible-q-stephen-amos','Amos'),('13','bible-q-hosea-egypt','Israel'),('14','bible-q-rahab-line','Four'),('15','bible-q-ahaziah-israel','Ahaziah son of Ahab'),('16','bible-q-hilkiah-find','Hilkiah the high priest'),('17','bible-q-asahel-pursuit','Asahel'),('18','bible-q-herod-james','James the brother of John'),('19','bible-q-paul-antioch','Antioch in Pisidia'),('20','bible-q-dothan-servant','Dothan'),('21','F|elisha:naaman','Elisha'),('22','F|jehoiada:joash','Jehoiada'),('23','bible-q-zedekiah-sequence','His sons were killed, then he was blinded')]
for n,qid,label in fixtures:
 q=by[qid];check(next(o['label'] for o in q['options'] if o['id']==q['correctOptionId'])==label,'Hazard '+n)
check(all(q['provenance']['edition']=='ASV (1901)' for q in bank),'Hazard 24 translation labels')
check(not any('how did paul die' in q['stem'].lower() for q in bank),'Hazard 25 unsupported traditional deaths excluded')
check(not any('coordinates' in q['stem'].lower() for q in bank),'Hazard 26 speculative mapping excluded')
check('carried out' in by['bible-q-nob-agent']['stem'],'Hazard 27 ordered vs carried out')
check('could NOT have overlapped' not in by['A|overlap']['stem'],'Hazard 28 inferential chronology removed')
check(hops('person:joram-son-ahab','person:jehoram-son-jehoshaphat','recorded_parent') is None,'Hazard 29 no inferred name relationship')
check(len(by['A|elisha-wrong']['references'])==4,'Hazard 30 evidence for all contrasted events')
original=(p/'original/Bible_Mastery_Quiz_v13_Simplified_Memorisation.html').read_bytes();upload=Path('/workspace/attachments/5d102447-16a0-432a-a702-cf03b363a66b/Bible_Mastery_Quiz_v13_Simplified_Memorisation.html')
if upload.exists():check(original==upload.read_bytes(),'original backup identical')
html=(p/'Bible_Mastery_Quiz_v14_Ultra.html').read_text();check(html.count('function start(){')==1,'one start pipeline');check('function hardSet' not in html,'no bypassing hardSet');check('function gChain' not in html,'unverified generators removed')
json.dump({'status':'PASS','checks':checks,'hazardFixtures':30,'reviewedQuestions':len(ledger),'sourceSha256':hashlib.sha256((p/'qa/sources/ASV.json').read_bytes()).hexdigest(),'originalSha256':hashlib.sha256(original).hexdigest(),'limitations':'Fixtures assert implemented safeguards and recorded answers; they do not constitute independent theological or historical review.'},open('qa/content-results.json','w'),indent=2)
print('PASS',checks,'content/graph checks, 30 hazard fixtures')
