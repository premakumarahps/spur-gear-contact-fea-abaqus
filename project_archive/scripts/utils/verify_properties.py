import os
from abaqus import *
from abaqusConstants import *

cae_path = os.path.abspath('models/SpurGearSimul.cae')
openMdb(cae_path)
model = mdb.models['Model-1']

out_file = 'output/property_verification.txt'
with open(out_file, 'w') as f:
    f.write(f"Parts in Model: {list(model.parts.keys())}\n")
    f.write(f"Materials in Model: {list(model.materials.keys())}\n")
    if 'Stainless_Steel' in model.materials:
        mat = model.materials['Stainless_Steel']
        f.write(f"  Elastic: {mat.elastic.table}\n")
        f.write(f"  Plastic: {mat.plastic.table}\n")
    f.write(f"Sections in Model: {list(model.sections.keys())}\n")
    for pname in ['Pinion', 'Gear']:
        if pname in model.parts:
            p = model.parts[pname]
            f.write(f"Part {pname} Section Assignments:\n")
            for sa in p.sectionAssignments:
                f.write(f"  - Section: {sa.sectionName}\n")

print(f"Verification output written to {out_file}")
