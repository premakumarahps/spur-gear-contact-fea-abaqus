# ==============================================================================
# Script: 05_extract_odb_results.py
# Purpose: Extract field output results from Abaqus Output Database (ODB).
#          Defaults to the primary selected 9mm mesh (Job_Mesh3_9mm.odb).
# ==============================================================================
import os
import sys

# Default to chosen primary 9mm mesh ODB
odb_name = sys.argv[1] if len(sys.argv) > 1 else 'Job_Mesh3_9mm.odb'
base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
odb_path = os.path.join(base_dir, "jobs", odb_name)

if not os.path.exists(odb_path):
    odb_path = os.path.join("jobs", odb_name)

print("=" * 70)
print("EXTRACTING ABAQUS ODB FIELD OUTPUTS")
print(f"Target ODB: {odb_path}")
print("=" * 70)

from odbAccess import openOdb  # type: ignore

odb = openOdb(path=odb_path, readOnly=True)
step = odb.steps['Torque_Step']
last_frame = step.frames[-1]

print(f"Step: Torque_Step | Total Frames: {len(step.frames)} | Final Step Time: {last_frame.frameValue:.4f}")

max_mises = 0.0
max_mises_elem = None
if 'S' in last_frame.fieldOutputs:
    for val in last_frame.fieldOutputs['S'].values:
        if val.mises is not None and val.mises > max_mises:
            max_mises = val.mises
            max_mises_elem = val.elementLabel

max_disp = 0.0
max_disp_node = None
if 'U' in last_frame.fieldOutputs:
    for val in last_frame.fieldOutputs['U'].values:
        if val.magnitude is not None and val.magnitude > max_disp:
            max_disp = val.magnitude
            max_disp_node = val.nodeLabel

max_peeq = 0.0
max_peeq_elem = None
if 'PEEQ' in last_frame.fieldOutputs:
    for val in last_frame.fieldOutputs['PEEQ'].values:
        if val.data is not None and val.data > max_peeq:
            max_peeq = val.data
            max_peeq_elem = val.elementLabel

odb.close()

print(f"\n--- RESULTS SUMMARY FOR {odb_name} ---")
print(f"Peak von Mises Stress: {max_mises:.2f} MPa (Element {max_mises_elem})")
print(f"Peak Displacement Magnitude: {max_disp:.4f} mm ({max_disp*1000:.1f} um) (Node {max_disp_node})")
print(f"Peak Equivalent Plastic Strain (PEEQ): {max_peeq:.6f} (Element {max_peeq_elem})")
print("=" * 70)
