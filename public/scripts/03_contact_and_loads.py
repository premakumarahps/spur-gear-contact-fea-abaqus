# ==============================================================================
# Script: 03_contact_and_loads.py
# Purpose: Define Contact Interaction, Shaft Bore Couplings, Boundary Conditions,
#          and Applied Torque (494 N*m = 494,000 N*mm)
# ==============================================================================
import os
import sys
import math

from abaqus import *
from abaqusConstants import *
import interaction
import load

print("=" * 60)
print("ABAQUS: DEFINING CONTACT INTERACTION & TORQUE LOAD")
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

a = model.rootAssembly
inst_pinion = a.instances['Pinion-1']
inst_gear = a.instances['Gear-1']

step_name = 'Torque_Step'
if step_name not in model.steps:
    raise RuntimeError(f"Step '{step_name}' not found. Please run 02_assembly_and_step.py first.")

# ------------------------------------------------------------------------------
# 1. CONTACT INTERACTION (General Contact with Penalty Friction & Hard Normal)
# ------------------------------------------------------------------------------
cp_name = 'Gear_Contact_Prop'
if cp_name in model.interactionProperties:
    del model.interactionProperties[cp_name]

c_prop = model.ContactProperty(cp_name)
# Tangential behavior: Penalty friction coefficient mu = 0.15
c_prop.TangentialBehavior(
    formulation=PENALTY, directionality=ISOTROPIC,
    fraction=0.005,
    table=((0.15, ), )
)
# Normal behavior: Hard contact with separation allowed
c_prop.NormalBehavior(
    pressureOverclosure=HARD, allowSeparation=ON,
    constraintEnforcementMethod=DEFAULT
)
print("[SUCCESS] Contact Property 'Gear_Contact_Prop' created (mu=0.15, Hard contact).")

int_name = 'Int_Gear_Teeth_Contact'
if int_name in model.interactions:
    del model.interactions[int_name]

contact = model.ContactStd(name=int_name, createStepName='Initial')
contact.contactPropertyAssignments.appendInStep(
    stepName='Initial', assignments=((GLOBAL, SELF, cp_name), )
)
print("[SUCCESS] General Contact interaction 'Int_Gear_Teeth_Contact' created for all exterior surfaces.")

# ------------------------------------------------------------------------------
# 2. REFERENCE POINTS & COUPLING FOR SHAFT BORES
# ------------------------------------------------------------------------------
# Pinion Bore Center: (0.0, 0.0, 15.0)
rp_pinion_feat = a.ReferencePoint(point=(0.0, 0.0, 15.0))
rp_pinion_id = rp_pinion_feat.id
rp_pinion_set = a.Set(referencePoints=(a.referencePoints[rp_pinion_id], ), name='Set_RP_Pinion')

# Find Pinion inner cylindrical face (radius ~ 10 mm from (0,0))
pinion_bore_pt = None
for f in inst_pinion.faces:
    pt = f.pointOn[0]
    if abs(math.sqrt(pt[0]**2 + pt[1]**2) - 10.0) < 0.2:
        pinion_bore_pt = pt
        break

if not pinion_bore_pt:
    raise RuntimeError("Could not find inner bore face for Pinion")

pinion_bore_faces = inst_pinion.faces.findAt((pinion_bore_pt, ))
pinion_bore_surf = a.Surface(side1Faces=pinion_bore_faces, name='Surf_Pinion_Bore')

coup_pinion_name = 'Coupling_Pinion_Bore'
if coup_pinion_name in model.constraints:
    del model.constraints[coup_pinion_name]

model.Coupling(
    name=coup_pinion_name,
    controlPoint=rp_pinion_set,
    surface=pinion_bore_surf,
    influenceRadius=WHOLE_SURFACE,
    couplingType=KINEMATIC,
    u1=ON, u2=ON, u3=ON, ur1=ON, ur2=ON, ur3=ON
)
print("[SUCCESS] Reference Point and Kinematic Coupling created for Pinion inner bore.")

# Gear Bore Center: (0.0, 296.4, 15.0)
rp_gear_feat = a.ReferencePoint(point=(0.0, 296.4, 15.0))
rp_gear_id = rp_gear_feat.id
rp_gear_set = a.Set(referencePoints=(a.referencePoints[rp_gear_id], ), name='Set_RP_Gear')

# Find Gear inner cylindrical face (radius ~ 10 mm from (0, 296.4))
gear_bore_pt = None
for f in inst_gear.faces:
    pt = f.pointOn[0]
    if abs(math.sqrt(pt[0]**2 + (pt[1] - 296.4)**2) - 10.0) < 0.2:
        gear_bore_pt = pt
        break

if not gear_bore_pt:
    raise RuntimeError("Could not find inner bore face for Gear")

gear_bore_faces = inst_gear.faces.findAt((gear_bore_pt, ))
gear_bore_surf = a.Surface(side1Faces=gear_bore_faces, name='Surf_Gear_Bore')

coup_gear_name = 'Coupling_Gear_Bore'
if coup_gear_name in model.constraints:
    del model.constraints[coup_gear_name]

model.Coupling(
    name=coup_gear_name,
    controlPoint=rp_gear_set,
    surface=gear_bore_surf,
    influenceRadius=WHOLE_SURFACE,
    couplingType=KINEMATIC,
    u1=ON, u2=ON, u3=ON, ur1=ON, ur2=ON, ur3=ON
)
print("[SUCCESS] Reference Point and Kinematic Coupling created for Gear inner bore.")

# ------------------------------------------------------------------------------
# 3. BOUNDARY CONDITIONS
# ------------------------------------------------------------------------------
# Pinion Bore: Fully fixed against rotation and translation to react the torque
bc_pinion_name = 'BC_Pinion_Fixed'
if bc_pinion_name in model.boundaryConditions:
    del model.boundaryConditions[bc_pinion_name]

model.DisplacementBC(
    name=bc_pinion_name,
    createStepName='Initial',
    region=rp_pinion_set,
    u1=0.0, u2=0.0, u3=0.0,
    ur1=0.0, ur2=0.0, ur3=0.0
)
print("[SUCCESS] Boundary Condition 'BC_Pinion_Fixed' applied (all 6 DOFs constrained).")

# Gear Bore: Fixed along shaft axis (U1=U2=U3=0, UR1=UR2=0), but FREE to rotate around Z (UR3)
bc_gear_name = 'BC_Gear_Shaft_Support'
if bc_gear_name in model.boundaryConditions:
    del model.boundaryConditions[bc_gear_name]

model.DisplacementBC(
    name=bc_gear_name,
    createStepName='Initial',
    region=rp_gear_set,
    u1=0.0, u2=0.0, u3=0.0,
    ur1=0.0, ur2=0.0, ur3=UNSET
)
print("[SUCCESS] Boundary Condition 'BC_Gear_Shaft_Support' applied (shaft supported, UR3 free).")

# ------------------------------------------------------------------------------
# 4. APPLIED TORQUE (Requirement 2: 494 N*m = 494,000 N*mm)
# ------------------------------------------------------------------------------
load_name = 'Torque_494Nm'
if load_name in model.loads:
    del model.loads[load_name]

# Moment of 494,000 N*mm applied around Z-axis (cm3) at Gear RP
# Note: In mm-N-MPa units, 1 N*m = 1000 N*mm
torque_val = 494000.0
model.Moment(
    name=load_name,
    createStepName=step_name,
    region=rp_gear_set,
    cm3=torque_val
)
print(f"[SUCCESS] Torque Load '{load_name}' = {torque_val:.1f} N*mm ({torque_val/1000:.0f} N*m) applied around Z-axis.")

# Regenerate assembly
a.regenerate()

# ------------------------------------------------------------------------------
# 5. SAVE DATABASE
# ------------------------------------------------------------------------------
try:
    mdb.save()
    print("[SUCCESS] CAE Database saved successfully with Contacts, Couplings, BCs & Torque!")
except Exception as e:
    print(f"Note on save: {e}")

print("=" * 60)
print("CONTACT INTERACTION & TORQUE LOAD CONFIGURATION COMPLETE!")
print("=" * 60)
