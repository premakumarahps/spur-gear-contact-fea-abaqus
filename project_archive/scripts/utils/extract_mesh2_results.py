# ==============================================================================
# Script: extract_mesh2_results.py
# Purpose: Extract field output results from Job_Mesh2_12mm.odb
# ==============================================================================
import os
import sys
from odbAccess import openOdb

odb_path = 'jobs/Job_Mesh2_12mm.odb'
if not os.path.exists(odb_path):
    odb_path = 'd:/1.Antigravity Projects/13_Abaqus_Simulation/jobs/Job_Mesh2_12mm.odb'

print(f"Opening ODB: {odb_path}")
odb = openOdb(path=odb_path, readOnly=True)

step = odb.steps['Torque_Step']
last_frame = step.frames[-1]
print(f"Step: Torque_Step | Total Frames: {len(step.frames)} | Last Frame Time: {last_frame.frameValue:.4f}")

out_file = 'output/simulation_results_mesh2.txt'
with open(out_file, 'w') as f:
    f.write("=" * 70 + "\n")
    f.write("ABAQUS SIMULATION RESULTS - JOB_MESH2_12MM (COMPLETED)\n")
    f.write(f"Index: 210494 | Applied Torque: 494 N*m (494,000 N*mm)\n")
    f.write(f"Total Increments: {len(step.frames)-1} | Completed Step Time: {last_frame.frameValue:.2f} (100%)\n")
    f.write("=" * 70 + "\n\n")

    # 1. von Mises Stress
    if 'S' in last_frame.fieldOutputs:
        s_field = last_frame.fieldOutputs['S']
        max_mises = -1.0
        max_mises_loc = None
        for val in s_field.values:
            if val.mises is not None and val.mises > max_mises:
                max_mises = val.mises
                max_mises_loc = val.elementLabel
        f.write(f"1. PEAK VON MISES STRESS (S):\n")
        f.write(f"   Max Mises Stress = {max_mises:.2f} MPa\n")
        f.write(f"   Location: Element {max_mises_loc}\n\n")
        print(f"Max von Mises Stress: {max_mises:.2f} MPa")

    # 2. Equivalent Plastic Strain (PEEQ)
    if 'PEEQ' in last_frame.fieldOutputs:
        peeq_field = last_frame.fieldOutputs['PEEQ']
        max_peeq = -1.0
        for val in peeq_field.values:
            if val.data is not None and val.data > max_peeq:
                max_peeq = val.data
        f.write(f"2. PEAK EQUIVALENT PLASTIC STRAIN (PEEQ):\n")
        f.write(f"   Max PEEQ = {max_peeq:.6f} ({max_peeq*100:.4f}%)\n\n")
        print(f"Max PEEQ: {max_peeq:.6f}")

    # 3. Overall Displacement (U)
    if 'U' in last_frame.fieldOutputs:
        u_field = last_frame.fieldOutputs['U']
        max_u = -1.0
        for val in u_field.values:
            if val.magnitude is not None and val.magnitude > max_u:
                max_u = val.magnitude
        f.write(f"3. OVERALL DISPLACEMENT (U):\n")
        f.write(f"   Max Displacement Magnitude = {max_u:.4f} mm\n\n")
        print(f"Max Displacement: {max_u:.4f} mm")

odb.close()
print(f"\nExtraction complete! Results saved to {out_file}")
