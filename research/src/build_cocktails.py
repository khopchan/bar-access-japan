# -*- coding: utf-8 -*-
import json, sys
sys.path.insert(0,'.')
from ck_d import CK
sys.path.insert(0,'.')
from bars_i import BARS
TONES=["lacquer","ash","dusk","bone","wine","ink"]
# Site taxonomy. bitter-aperitif is stored as baseSpirit and filed under aperitif.
TAXON={"gin":"gin","whisky":"whisky","shochu":"shochu","wine":"wine","sherry":"sherry",
 "vodka":"vodka","rum":"rum","brandy":"brandy","tequila":"tequila","liqueur":"liqueur",
 "bitter-aperitif":"aperitif"}
BASES=set(TAXON.values()); FLAV={"aroma","finish","light","after"}
BASE_L={"gin":("ジン","Gin"),"whisky":("ウイスキー","Whisky"),"shochu":("焼酎","Shochu"),"wine":("ワイン","Wine"),"sherry":("シェリー","Sherry"),
 "vodka":("ウオッカ","Vodka"),"rum":("ラム","Rum"),"brandy":("ブランデー","Brandy"),"tequila":("テキーラ","Tequila"),"liqueur":("リキュール","Liqueur"),"bitter-aperitif":("ビター・アペリティフ","Bitter aperitif")}
slugs={b["slug"] for b in BARS}
L=lambda p:{"ja":p[0],"en":p[1]}
strict,rich=[],[]
for i,c in enumerate(CK):
    taxon=TAXON.get(c["base"])
    assert taxon in BASES and c["flavor"] in FLAV, c["slug"]
    for s in c["bars"]: assert s in slugs, (c["slug"],s)
    strict.append({"slug":c["slug"],"tone":TONES[i%6],"title":{"ja":c["ja"],"en":c["en"]},"dek":L(c["dek"]),
                   "credit":{"ja":"写真未掲載（権利確認中）","en":"No photo (rights pending)"},"base":taxon,"flavor":c["flavor"]})
    rich.append({"slug":c["slug"],"name":{"ja":c["ja"],"en":c["en"]},"baseSpirit":c["base"],"baseLabel":L(BASE_L[c["base"]]),
                 "strictBase":taxon,"flavor":c["flavor"],
                 "spec":[L(x) for x in c["spec"]],"specSource":c["specSource"],
                 "method":L(c["method"]),"glass":L(c["glass"]),"garnish":L(c["garnish"]) if c["garnish"] else None,
                 "dek":L(c["dek"]),"history":L(c["history"]),"japan":L(c["japan"]) if c["japan"] else None,
                 "barSlugs":c["bars"],"sources":c["sources"],"lastVerified":"2026-11-12","notes":c["notes"]})
assert len({c["slug"] for c in CK})==len(CK)
json.dump(strict,open("../cocktails.json","w"),ensure_ascii=False,indent=2)
json.dump(rich,open("../cocktails.data.json","w"),ensure_ascii=False,indent=2)
from collections import Counter
print(len(strict),Counter(TAXON[c["base"]] for c in CK),Counter(c["base"] for c in CK),Counter(c["flavor"] for c in CK))
