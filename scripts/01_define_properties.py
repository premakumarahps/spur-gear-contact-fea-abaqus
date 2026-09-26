# ==============================================================================
# Script: 01_define_properties.py
# Purpose: Define Stainless Steel Material (Elastic + Plasticity) & Assign Section
# Compatibility: Run via Abaqus CAE GUI (File -> Run Script) or abaqus cae noGUI
# ==============================================================================
import os
import sys

from abaqus import *
from abaqusConstants import *
import part
import material
import section

print("=" * 60)
print("ABAQUS: DEFINING STAINLESS STEEL PROPERTIES & SECTIONS")
print("=" * 60)

model_name = 'Model-1'
if model_name not in mdb.models:
    model_name = list(mdb.models.keys())[0]

model = mdb.models[model_name]

# If model is empty (e.g. running from CLI outside GUI), open existing CAE database
if len(model.parts) == 0:
    cae_candidates = [
        'models/SpurGearSimul.cae',
        'd:/1.Antigravity Projects/13_Abaqus_Simulation/models/SpurGearSimul.cae',
        os.path.join(os.path.expanduser('~'), 'Desktop', 'SpurGearSimul.cae')
    ]
    for cae_file in cae_candidates:
        if os.path.exists(cae_file):
            print(f"Opening existing CAE file: {cae_file}")
            openMdb(cae_file)
            model = mdb.models['Model-1']
            break

print(f"Working on model: {model_name}, with parts: {list(model.parts.keys())}")

# 1. Rename parts to 'Pinion' and 'Gear' as requested by the assignment
if 'SpurGearAssembly-1' in model.parts:
    model.parts.changeKey(fromName='SpurGearAssembly-1', toName='Pinion')
    print("Renamed 'SpurGearAssembly-1' -> 'Pinion'")

if 'SpurGearAssembly-2' in model.parts:
    model.parts.changeKey(fromName='SpurGearAssembly-2', toName='Gear')
    print("Renamed 'SpurGearAssembly-2' -> 'Gear'")

part_pinion = model.parts['Pinion'] if 'Pinion' in model.parts else None
part_gear = model.parts['Gear'] if 'Gear' in model.parts else None

if not part_pinion or not part_gear:
    print(f"Warning: Current parts in model: {list(model.parts.keys())}")

# 2. Define Stainless Steel Material with Elasticity and Plasticity
mat_name = 'Stainless_Steel'
if mat_name in model.materials:
    del model.materials[mat_name]

mat = model.Material(name=mat_name, description='Austenitic Stainless Steel (AISI 304/316) with Plasticity')

# Density (tonne/mm^3 for mm-MPa-N system)
mat.Density(table=((7.85e-09, ), ))

# Elastic properties (Young's modulus = 193000 MPa, Poisson's ratio = 0.30)
mat.Elastic(table=((193000.0, 0.30), ))

# Plasticity properties (True Stress in MPa vs True Plastic Strain)
# Yield stress = 240 MPa at 0 plastic strain
plastic_table = (
    (240.0, 0.0000),
    (265.0, 0.0125),
    (305.0, 0.0350),
    (360.0, 0.0750),
    (440.0, 0.1450),
    (540.0, 0.2400),
    (660.0, 0.3700),
    (780.0, 0.5200)
)
mat.Plastic(table=plastic_table)
print(f"[SUCCESS] Material '{mat_name}' created with Elasticity (E=193 GPa, nu=0.3) and Plasticity table.")

# 3. Create Solid Homogeneous Section
sec_name = 'Stainless_Steel_Section'
if sec_name in model.sections:
    del model.sections[sec_name]

model.HomogeneousSolidSection(name=sec_name, material=mat_name, thickness=None)
print(f"[SUCCESS] Homogeneous Solid Section '{sec_name}' created.")

# 4. Assign Section to Pinion
if part_pinion:
    region_pinion = part_pinion.Set(cells=part_pinion.cells, name='Set_Pinion_Body')
    part_pinion.SectionAssignment(
        region=region_pinion,
        sectionName=sec_name,
        offset=0.0,
        offsetType=MIDDLE_SURFACE,
        offsetField='',
        thicknessAssignment=FROM_SECTION
    )
    print("[SUCCESS] Section assigned to 'Pinion'.")

# 5. Assign Section to Gear
if part_gear:
    region_gear = part_gear.Set(cells=part_gear.cells, name='Set_Gear_Body')
    part_gear.SectionAssignment(
        region=region_gear,
        sectionName=sec_name,
        offset=0.0,
        offsetType=MIDDLE_SURFACE,
        offsetField='',
        thicknessAssignment=FROM_SECTION
    )
    print("[SUCCESS] Section assigned to 'Gear'.")

print("=" * 60)
print("MATERIAL PROPERTY & SECTION DEFINITION COMPLETE!")
print("=" * 60)

try:
    mdb.save()
    print("Database saved successfully.")
except Exception as e:
    print(f"Note on save: {e}")


