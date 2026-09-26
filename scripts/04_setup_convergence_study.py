# ==============================================================================
# Script: 04_setup_convergence_study.py
# Purpose: Setup 4 Mesh Densities & Create Jobs for Requirement 5
# Compatibility: Run via Abaqus CAE (File -> Run Script) or CLI
# ==============================================================================
import os
import sys

from abaqus import *
from abaqusConstants import *
import mesh
import job

print("=" * 60)
print("ABAQUS: SETTING UP 4-LEVEL MESH CONVERGENCE STUDY")
print("=" * 60)

cae_path = 'd:/1.Antigravity Projects/13_Abaqus_Simulation/models/SpurGearSimul.cae'
if len(mdb.models['Model-1'].parts) == 0:
    print(f"Opening CAE database: {cae_path}")
    openMdb(cae_path)

model = mdb.models['Model-1']
p_pinion = model.parts['Pinion']
p_gear = model.parts['Gear']
a = model.rootAssembly

# Configure element types to quadratic tetrahedrals (C3D10)
elem_tet = mesh.ElemType(elemCode=C3D10, elemLibrary=STANDARD)
p_pinion.setMeshControls(regions=p_pinion.cells, elemShape=TET, technique=FREE)
p_pinion.setElementType(regions=(p_pinion.cells,), elemTypes=(elem_tet,))

p_gear.setMeshControls(regions=p_gear.cells, elemShape=TET, technique=FREE)
p_gear.setElementType(regions=(p_gear.cells,), elemTypes=(elem_tet,))

mesh_levels = [
    {"level": 1, "seed": 16.0, "name": "Job_Mesh1_16mm", "desc": "Coarse Mesh (16 mm)"},
    {"level": 2, "seed": 12.0, "name": "Job_Mesh2_12mm", "desc": "Medium Mesh (12 mm)"},
    {"level": 3, "seed": 9.0,  "name": "Job_Mesh3_9mm",  "desc": "Fine Mesh (9 mm)"},
    {"level": 4, "seed": 6.0,  "name": "Job_Mesh4_6mm",  "desc": "Very Fine Mesh (6 mm)"}
]

print("\nGenerating Mesh Decks for Convergence Study:")
for item in mesh_levels:
    lvl = item['level']
    s = item['seed']
    jname = item['name']
    
    print(f"\n--- Mesh Level {lvl}: Seed = {s:.1f} mm ---")
    p_pinion.seedPart(size=s, deviationFactor=0.1)
    p_pinion.generateMesh()
    
    p_gear.seedPart(size=s, deviationFactor=0.1)
    p_gear.generateMesh()
    
    a.regenerate()
    
    total_nodes = len(p_pinion.nodes) + len(p_gear.nodes)
    total_elems = len(p_pinion.elements) + len(p_gear.elements)
    print(f"  Nodes: {total_nodes:,} | Elements: {total_elems:,}")
    
    if jname in mdb.jobs:
        del mdb.jobs[jname]
        
    my_job = mdb.Job(
        name=jname,
        model='Model-1',
        description=f"Convergence Study Level {lvl} (Seed={s}mm) - SS304/316",
        type=ANALYSIS,
        numCpus=4,
        numDomains=4,
        multiprocessingMode=DEFAULT,
        memory=70,
        memoryUnits=PERCENTAGE,
        resultsFormat=ODB
    )
    
    inp_path = os.path.join('d:/1.Antigravity Projects/13_Abaqus_Simulation/jobs', f"{jname}.inp")
    if os.path.exists(inp_path):
        try:
            os.remove(inp_path)
        except Exception:
            pass
    my_job.writeInput(consistencyChecking=OFF)
    print(f"  [SUCCESS] Job '{jname}' created and input deck written.")
    import time
    time.sleep(1.0)

# Save final state in database
try:
    mdb.save()
    print("\n[SUCCESS] CAE Database saved with all 4 convergence jobs.")
except Exception as e:
    print(f"Note on save: {e}")

print("=" * 60)
print("ALL 4 MESH LEVELS & SOLVER JOBS CONFIGURED SUCCESSFULLY!")
print("=" * 60)
