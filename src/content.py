import json,re,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def normbook(s):
 for a,b in [('III ','3 '),('II ','2 '),('I ','1 ')]:
  if s.startswith(a):return b+s[len(a):]
 return 'Revelation' if s=='Revelation of John' else s
bible=json.loads((ROOT/'qa/sources/ASV.json').read_text())
BOOKS=[normbook(b['name']) for b in bible['books']]
INDEX={normbook(b['name']):{c['chapter']:{v['verse']:v['text'] for v in c['verses']} for c in b['chapters']} for b in bible['books']}
def passage(ref):
 out=[]
 for part in ref.split(';'):
  m=re.fullmatch(r'(.+?) (\d+):([\d,\-]+)',part.strip())
  if not m:raise ValueError('Invalid reference '+part)
  book,ch,verses=m.groups();ch=int(ch)
  for vs in verses.split(','):
   a,*z=map(int,vs.split('-'));end=z[0] if z else a
   for v in range(a,end+1):out.append({'reference':f'{book} {ch}:{v}','text':INDEX[book][ch][v]})
 return out

def rows():
 for line in (ROOT/'src/questions.tsv').read_text().splitlines():
  if line and not line.startswith('#'):
   p=line.split('|');assert len(p)==7,p
   yield [x.strip() for x in p]
if __name__=='__main__':
 review=[]
 for id,refs,cat,level,stem,opts,why in rows():
  evidence=passage(refs);review.append({'id':id,'stem':stem,'options':opts.split(';'),'explanation':why,'evidence':evidence})
 (ROOT/'qa/passage-review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2))
 print(len(review),'records; all references resolved')
