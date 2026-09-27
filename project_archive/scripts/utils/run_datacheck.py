from abaqus import *
from abaqusConstants import *
import mesh

import os

cae_path = 'd:/1.Antigravity Projects/13_Abaqus_Simulation/models/SpurGearSimul.cae'
openMdb(cae_path)
model = mdb.models['Model-1']
p_pinion = model.parts['Pinion']
p_gear = model.parts['Gear']

# Mesh with Level 1 (Coarse: 16.0 mm)
elem_tet = mesh.ElemType(elemCode=C3D10, elemLibrary=STANDARD)
p_pinion.setMeshControls(regions=p_pinion.cells, elemShape=TET, technique=FREE)
p_pinion.setElementType(regions=(p_pinion.cells,), elemTypes=(elem_tet,))
p_gear.setMeshControls(regions=p_gear.cells, elemShape=TET, technique=FREE)
p_gear.setElementType(regions=(p_gear.cells,), elemTypes=(elem_tet,))

p_pinion.seedPart(size=16.0, deviationFactor=0.1)
p_pinion.generateMesh()
p_gear.seedPart(size=16.0, deviationFactor=0.1)
p_gear.generateMesh()
model.rootAssembly.regenerate()

job_name = 'Job_Mesh1_16mm'
if job_name in mdb.jobs:
    del mdb.jobs[job_name]

# Create Job with 4 CPUs and memory limit
my_job = mdb.Job(
    name=job_name,
    model='Model-1',
    description='Spur Gear Convergence Study - Mesh 1 (16 mm)',
    type=ANALYSIS,
    numCpus=4,
    numDomains=4,
    multiprocessingMode=DEFAULT,
    memory=70,
    memoryUnits=PERCENTAGE,
    resultsFormat=ODB
)

# Run datacheck
print(f"Submitting DataCheck for {job_name}...")
my_job.submit(datacheckJob=True)
my_job.waitForCompletion()
print(f"DataCheck finished with status: {my_job.status}")
