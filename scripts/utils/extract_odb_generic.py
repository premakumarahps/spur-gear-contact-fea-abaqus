# ==============================================================================
# Script: extract_odb_generic.py
# Purpose: Extract field output results from any given ODB name
# Usage: abaqus python extract_odb_generic.py [JobName]
# ==============================================================================
import os
import sys
import json
from odbAccess import openOdb

job_name = sys.argv[1] if len(sys.argv) > 1 else 'Job_Mesh0_20mm'
odb_path = f"{job_name}.odb"
if not os.path.exists(odb_path):
    odb_path = os.path.join(r"d:\1.Antigravity Projects\13_Abaqus_Simulation\jobs", f"{job_name}.odb")

print(f"Opening ODB: {odb_path}")
odb = openOdb(path=odb_path, readOnly=True)

step = odb.steps['Torque_Step']
last_frame = step.frames[-1]

result_data = {
    "job_name": job_name,
    "completed_time": last_frame.frameValue,
    "max_mises": 0.0,
    "max_peeq": 0.0,
    "max_disp": 0.0
}

# 1. von Mises Stress
if 'S' in last_frame.fieldOutputs:
    s_field = last_frame.fieldOutputs['S']
    max_m = -1.0
    for val in s_field.values:
        if val.mises is not None and val.mises > max_m:
            max_m = val.mises
    result_data["max_mises"] = round(float(max_m), 2)

# 2. Equivalent Plastic Strain (PEEQ)
if 'PEEQ' in last_frame.fieldOutputs:
    peeq_field = last_frame.fieldOutputs['PEEQ']
    max_p = -1.0
    for val in peeq_field.values:
        if val.data is not None and val.data > max_p:
            max_p = val.data
    result_data["max_peeq"] = round(float(max_p), 6)

# 3. Overall Displacement (U)
if 'U' in last_frame.fieldOutputs:
    u_field = last_frame.fieldOutputs['U']
    max_u = -1.0
    for val in u_field.values:
        if val.magnitude is not None and val.magnitude > max_u:
            max_u = val.magnitude
    result_data["max_disp"] = round(float(max_u), 4)

odb.close()

out_json = os.path.join(r"d:\1.Antigravity Projects\13_Abaqus_Simulation\output", f"{job_name}_results.json")
with open(out_json, "w") as f:
    json.dump(result_data, f, indent=2)

print(f"Saved {job_name} extracted results to {out_json}: {result_data}")
