import sys,json;sys.path.insert(0,'.')
from stories_src import STORIES,GUIDES
from bars_i import BARS
from ck_d import CK
ok={b["slug"] for b in BARS}|{c["slug"] for c in CK}
def split(lst,name):
    strict=[{k:v for k,v in a.items() if not k.startswith('_')} for a in lst]
    rich=[{"slug":a["slug"],"sources":a["_sources"],"related":a["_related"],"lastVerified":"2026-11-12"} for a in lst]
    for a in lst:
        for r in a["_related"]: assert r in ok,(a["slug"],r)
    json.dump(strict,open(f"../{name}.json","w"),ensure_ascii=False,indent=2)
    json.dump(rich,open(f"../{name}.data.json","w"),ensure_ascii=False,indent=2)
    print(name,len(strict))
split(STORIES,"stories");split(GUIDES,"guides")
