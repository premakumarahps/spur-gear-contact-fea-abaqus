from abaqus import *
from abaqusConstants import *
import mesh
import job
import os

openMdb('models/SpurGearSimul.cae')
model = mdb.models['Model-1']
p_pinion = model.parts['Pinion']
p_gear = model.parts['Gear']
a = model.rootAssembly

elem_tet = mesh.ElemType(elemCode=C3D10, elemLibrary=STANDARD)
p_pinion.setMeshControls(regions=p_pinion.cells, elemShape=TET, technique=FREE)
p_pinion.setElementType(regions=(p_pinion.cells,), elemTypes=(elem_tet,))
p_gear.setMeshControls(regions=p_gear.cells, elemShape=TET, technique=FREE)
p_gear.setElementType(regions=(p_gear.cells,), elemTypes=(elem_tet,))

p_pinion.seedPart(size=20.0, deviationFactor=0.20)
p_pinion.generateMesh()
p_gear.seedPart(size=20.0, deviationFactor=0.20)
p_gear.generateMesh()
a.regenerate()

total_nodes = len(p_pinion.nodes) + len(p_gear.nodes)
total_elems = len(p_pinion.elements) + len(p_gear.elements)
print(f"20mm Mesh Generated: {total_nodes} nodes, {total_elems} elements")

jname = 'Job_Mesh0_20mm'
if jname in mdb.jobs:
    del mdb.jobs[jname]

my_job = mdb.Job(
    name=jname,
    model='Model-1',
    description='Convergence Study Point 1 (Seed=20mm) - 81k elements',
    type=ANALYSIS,
    numCpus=4,
    numDomains=4,
    multiprocessingMode=DEFAULT,
    memory=70,
    memoryUnits=PERCENTAGE,
    resultsFormat=ODB
)

inp_path = os.path.join('jobs', f"{jname}.inp")
if os.path.exists(inp_path):
    try:
        os.remove(inp_path)
    except Exception:
        pass

my_job.writeInput(consistencyChecking=OFF)
print(f"Job '{jname}' input deck written.")
mdb.save()
print("CAE saved.")
