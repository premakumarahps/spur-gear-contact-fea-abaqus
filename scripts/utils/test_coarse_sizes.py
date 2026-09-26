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

coarse_sizes = [28.0, 22.0, 16.0, 12.0]
out_file = 'output/coarse_mesh_check.txt'
with open(out_file, 'w') as f:
    for s in coarse_sizes:
        p_pinion.seedPart(size=s, deviationFactor=0.1)
        p_pinion.generateMesh()
        p_gear.seedPart(size=s, deviationFactor=0.1)
        p_gear.generateMesh()
        total_nodes = len(p_pinion.nodes) + len(p_gear.nodes)
        total_elems = len(p_pinion.elements) + len(p_gear.elements)
        f.write(f"Seed: {s:4.1f} mm | Total Nodes: {total_nodes:7d} | Total Elements: {total_elems:7d} | (Pinion: {len(p_pinion.elements)}, Gear: {len(p_gear.elements)})\n")

print(f"Coarse mesh check saved to {out_file}")
