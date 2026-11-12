# -*- coding: utf-8 -*-
import json, sys
sys.path.insert(0, '.')
from bars_i import BARS
TONES = ["lacquer","ash","dusk","bone","wine","ink"]
CHECK = "2026-11-12"
def L(p): return {"ja": p[0], "en": p[1]}
def fact(i, ja, en, v): return {"id": i, "label": {"ja": ja, "en": en}, "value": v}
strict, rich = [], []
for n, b in enumerate(BARS):
    tbc = b["hours"][0] == "要確認"
    facts = [fact("area","エリア","Area", {"ja": f'{b["city"][0]}・{b["area"][0]}', "en": f'{b["area"][1]}, {b["city"][1]}'}),
             fact("address","住所","Address", L(b["address"]))]
    if b.get("station"): facts.append(fact("station","最寄り","Nearest station", L(b["station"])))
    facts.append(fact("style","スタイル","Style", L(b["style"])))
    if b.get("people"): facts.append(fact("people","人","People", L(b["people"])))
    if b.get("signature"): facts.append(fact("signature","名物","Known for", L(b["signature"])))
    if b["accolades"]:
        facts.append(fact("accolades","受賞・ランキング","Accolades",
            {"ja": "／".join(a["ja"] for a in b["accolades"]), "en": "; ".join(a["en"] for a in b["accolades"])}))
    hv = {"ja": "要確認（訪問前に店舗へ確認を）", "en": "To be confirmed (check with the bar before visiting)"} if tbc else L(b["hours"])
    if not tbc and b["hours"][2] == "secondary":
        hv = {"ja": hv["ja"].replace("（二次情報）","") + "（二次情報・訪問前に要確認）", "en": hv["en"].replace(" (secondary)","") + " (secondary source; please confirm)"}
    facts.append(fact("hours","時間","Hours", hv))
    facts.append(fact("seats","席","Seats", L(b["seats"]) if b.get("seats") else {"ja":"要確認","en":"To be confirmed"}))
    facts.append(fact("price","価格","Prices", L(b["price"]) if b.get("price") else {"ja":"要確認","en":"To be confirmed"}))
    if b.get("url"): facts.append(fact("web","公式サイト","Website", {"ja": b["url"], "en": b["url"]}))
    if b.get("ig"): facts.append(fact("instagram","Instagram","Instagram", {"ja": b["ig"], "en": b["ig"]}))
    facts.append(fact("checked","確認日","Date checked", {"ja": f"{CHECK}（公開情報に基づく）", "en": f"{CHECK} (from public sources)"}))
    strict.append({
        "slug": b["slug"], "tone": TONES[n % 6],
        "kicker": {"ja": f'EXPLORE BARS / {b["area"][0]}', "en": f'EXPLORE BARS / {b["area"][1].upper()}'},
        "title": {"ja": b["ja"], "en": b["en"]},
        "dek": L(b["dek"]),
        "byline": {"ja": f'{b["city"][0]}・{b["area"][0]}', "en": f'{b["area"][1]}, {b["city"][1]}'},
        "credit": {"ja": "写真未掲載（権利確認中）", "en": "No photo (rights pending)"},
        "concept": [L(c) for c in b["concept"]],
        "facts": facts,
    })
    r = {"slug": b["slug"], "name": {"ja": b["ja"], "en": b["en"]},
         "city": L(b["city"]), "cityId": b["cityId"], "area": L(b["area"]), "areaId": b["areaId"],
         "address": L(b["address"]), "station": L(b["station"]) if b.get("station") else None,
         "style": L(b["style"]), "people": L(b["people"]) if b.get("people") else None,
         "signature": L(b["signature"]) if b.get("signature") else None,
         "accolades": b["accolades"],
         "hours": None if tbc else L(b["hours"][:2]),
         "hoursStatus": "要確認" if b["hours"][0].startswith("要確認") else b["hours"][2],
         "seats": L(b["seats"]) if b.get("seats") else None,
         "price": L(b["price"]) if b.get("price") else None,
         "url": b.get("url"), "instagram": b.get("ig"),
         "sources": b["sources"], "lastVerified": CHECK, "status": "operating", "notes": b.get("notes","")}
    rich.append(r)
json.dump(strict, open("../bars.json","w"), ensure_ascii=False, indent=2)
json.dump(rich, open("../bars.data.json","w"), ensure_ascii=False, indent=2)
from collections import Counter
print(len(strict), Counter(r["hoursStatus"] for r in rich))
