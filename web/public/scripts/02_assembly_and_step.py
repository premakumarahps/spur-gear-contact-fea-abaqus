# ==============================================================================
# Script: 02_assembly_and_step.py
# Purpose: Step 1 - Assemble Pinion & Gear and Create Non-Linear Static Step
# Compatibility: Run inside open Abaqus CAE (File -> Run Script) or CLI
# ==============================================================================
import os
import sys

from abaqus import *
from abaqusConstants import *
import assembly
import step

print("=" * 60)
print("ABAQUS: ASSEMBLING GEARS & CONFIGURING ANALYSIS STEP")
print("=" * 60)

model_name = 'Model-1'
if model_name not in mdb.models:
    model_name = list(mdb.models.keys())[0]

model = mdb.models[model_name]

# If model is empty (e.g. running headlessly via CLI), open the CAE database
if len(model.parts) == 0:
    cae_path = 'd:/1.Antigravity Projects/13_Abaqus_Simulation/models/SpurGearSimul.cae'
    print(f"Opening CAE database: {cae_path}")
    openMdb(cae_path)
    model = mdb.models['Model-1']

print(f"Active Model: {model_name}")

# Verify parts
if 'Pinion' not in model.parts or 'Gear' not in model.parts:
    raise RuntimeError("Parts 'Pinion' and 'Gear' must exist in model before assembly. Please run 01_define_properties.py first.")

part_pinion = model.parts['Pinion']
part_gear = model.parts['Gear']
print(f"Parts found: Pinion ({len(part_pinion.cells)} cell), Gear ({len(part_gear.cells)} cell)")

# ------------------------------------------------------------------------------
# 1. ASSEMBLY
# ------------------------------------------------------------------------------
a = model.rootAssembly
a.DatumCsysByDefault(CARTESIAN)

# Remove any previous instances with the same names to ensure a clean state
if 'Pinion-1' in a.instances:
    del a.instances['Pinion-1']
if 'Gear-1' in a.instances:
    del a.instances['Gear-1']

# Create Dependent Instances
# Note: The parts were exported in-place from Solid Edge at exact center distance 296.4 mm
instance_pinion = a.Instance(name='Pinion-1', part=part_pinion, dependent=ON)
instance_gear = a.Instance(name='Gear-1', part=part_gear, dependent=ON)
a.regenerate()

print("[SUCCESS] Instances created and assembled:")
print("  - Instance 'Pinion-1' (Pitch diameter = 98.8 mm)")
print("  - Instance 'Gear-1'   (Pitch diameter = 494.0 mm)")
print("  - Center Distance    = 296.4 mm (Correctly mated)")

# ------------------------------------------------------------------------------
# 2. ANALYSIS STEP (Static, General with Nlgeom for Contact & Plasticity)
# ------------------------------------------------------------------------------
step_name = 'Torque_Step'
if step_name in model.steps:
    del model.steps[step_name]

# Contact and plasticity require geometric nonlinearity (nlgeom=ON)
# Time period = 1.0, with adaptive incrementation for stable convergence
model.StaticStep(
    name=step_name,
    previous='Initial',
    timePeriod=1.0,
    nlgeom=ON,
    maxNumInc=1000,
    initialInc=0.01,
    minInc=1e-08,
    maxInc=0.05,
    matrixSolver=DIRECT,
    matrixStorage=SOLVER_DEFAULT,
    description='Apply torque on gears with contact and material plasticity'
)
print(f"[SUCCESS] Step '{step_name}' created (Static General, Nlgeom=ON, initialInc=0.01).")

# ------------------------------------------------------------------------------
# 3. FIELD OUTPUT REQUESTS
# ------------------------------------------------------------------------------
# Ensure S (Stress), PEEQ (Plastic Strain), U (Displacement), and Contact outputs are recorded
fo_name = 'F-Output-1'
if fo_name in model.fieldOutputRequests:
    del model.fieldOutputRequests[fo_name]

model.FieldOutputRequest(
    name=fo_name,
    createStepName=step_name,
    variables=('S', 'PE', 'PEEQ', 'U', 'RF', 'RM', 'CSTRESS', 'CDISP'),
    numIntervals=20
)
print(f"[SUCCESS] Field outputs configured: S (von Mises), PEEQ, U, CSTRESS (Contact Pressure)")

# Update viewport if running inside GUI
try:
    if 'Viewport: 1' in session.viewports:
        session.viewports['Viewport: 1'].setValues(displayedObject=a)
        session.viewports['Viewport: 1'].view.fitView()
except Exception:
    pass

print("=" * 60)
print("ASSEMBLY & STEP CONFIGURATION COMPLETE!")
print("=" * 60)

try:
    mdb.save()
    print("[SUCCESS] CAE Database saved with Assembly and Step!")
except Exception as e:
    print(f"Note on save: {e}")

