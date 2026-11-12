import json
B=json.load(open('../bars.data.json'));C=json.load(open('../cocktails.data.json'))
S=json.load(open('../stories.data.json'));G=json.load(open('../guides.data.json'))
o=["# SOURCES","","All entries last verified 2026-11-12 (JST). Text is original paraphrase; no copied prose, no photos.",""]
o+=["## Bars",""]
for b in B:
    o.append(f"### {b['name']['en']} / {b['name']['ja']} (`{b['slug']}`)")
    o.append(f"- Hours status: {b['hoursStatus']}")
    for a in b['accolades']: o.append(f"- Accolade: {a['en']} — {a['source']}")
    for u in b['sources']: o.append(f"- {u}")
    if b['notes']: o.append(f"- Note: {b['notes']}")
    o.append("")
o+=["## Cocktails",""]
for c in C:
    o.append(f"### {c['name']['en']} / {c['name']['ja']} (`{c['slug']}`)")
    o.append(f"- Spec source: {c['specSource']}")
    for u in c['sources']:
        if u!=c['specSource']: o.append(f"- {u}")
    if c['notes']: o.append(f"- Note: {c['notes']}")
    o.append("")
for title,L in [("Stories",S),("Guides",G)]:
    o+=[f"## {title}",""]
    for a in L:
        o.append(f"### `{a['slug']}`"); o+= [f"- {u}" for u in a['sources']]; o.append("")
open('../SOURCES.md','w').write("\n".join(o)); print(len(o))
