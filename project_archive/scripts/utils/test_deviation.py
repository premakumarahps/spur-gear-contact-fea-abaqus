from abaqus import *
from abaqusConstants import *
import mesh

openMdb('models/SpurGearSimul.cae')
model = mdb.models['Model-1']
p_pinion = model.parts['Pinion']
p_gear = model.parts['Gear']

elem_tet = mesh.ElemType(elemCode=C3D10, elemLibrary=STANDARD)
p_pinion.setMeshControls(regions=p_pinion.cells, elemShape=TET, technique=FREE)
p_pinion.setElementType(regions=(p_pinion.cells,), elemTypes=(elem_tet,))
p_gear.setMeshControls(regions=p_gear.cells, elemShape=TET, technique=FREE)
p_gear.setElementType(regions=(p_gear.cells,), elemTypes=(elem_tet,))

tests = [
    (20.0, 0.2),
    (25.0, 0.3),
    (30.0, 0.4),
    (9.0, 0.1)
]

out_file = 'output/deviation_test.txt'
with open(out_file, 'w') as f:
    for s, dev in tests:
        p_pinion.seedPart(size=s, deviationFactor=dev)
        p_pinion.generateMesh()
        p_gear.seedPart(size=s, deviationFactor=dev)
        p_gear.generateMesh()
        total_nodes = len(p_pinion.nodes) + len(p_gear.nodes)
        total_elems = len(p_pinion.elements) + len(p_gear.elements)
        f.write(f"Seed: {s:4.1f} mm | Dev: {dev:.2f} | Nodes: {total_nodes:7d} | Elements: {total_elems:7d}\n")

print(f"Deviation test saved to {out_file}")
