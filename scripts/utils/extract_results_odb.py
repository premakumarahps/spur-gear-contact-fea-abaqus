# ==============================================================================
# Script: extract_results_odb.py
# Purpose: Extract stress and displacement results from an Abaqus ODB file
# Can be run via:
#   abaqus python extract_results_odb.py [job_name.odb]
# ==============================================================================
import sys
import os

try:
    from odbAccess import openOdb
    import numpy as np
except ImportError as e:
    print(f"Error importing modules: {e}")
    sys.exit(1)

def extract_results(odb_path):
    if not os.path.exists(odb_path):
        print(f"File not found: {odb_path}")
        return

    print(f"Opening ODB: {odb_path}")
    odb = openOdb(path=odb_path, readOnly=True)

    print("Steps in ODB:")
    for step_name in odb.steps.keys():
        step = odb.steps[step_name]
        print(f" - Step: {step_name} (Frames: {len(step.frames)})")
        
        if len(step.frames) > 0:
            last_frame = step.frames[-1]
            print(f"   Last frame description: {last_frame.description}")

            # Inspect available field outputs
            print("   Available Field Outputs:")
            for field_key in last_frame.fieldOutputs.keys():
                field = last_frame.fieldOutputs[field_key]
                print(f"     * {field_key}: {field.description}")

            # Example: Maximum von Mises Stress
            if 'S' in last_frame.fieldOutputs:
                stress_field = last_frame.fieldOutputs['S']
                max_mises = -1.0
                for value in stress_field.values:
                    if value.mises is not None and value.mises > max_mises:
                        max_mises = value.mises
                print(f"\n   >>> Peak von Mises Stress: {max_mises:.3f} MPa")

            # Example: Maximum Magnitude of Displacement
            if 'U' in last_frame.fieldOutputs:
                disp_field = last_frame.fieldOutputs['U']
                max_u = -1.0
                for value in disp_field.values:
                    if value.magnitude is not None and value.magnitude > max_u:
                        max_u = value.magnitude
                print(f"   >>> Peak Displacement (Magnitude): {max_u:.4f} mm")

    odb.close()
    print("\nExtraction complete.")

if __name__ == '__main__':
    default_odb = os.path.join(os.getcwd(), 'jobs', 'Job_Cantilever_Beam.odb')
    target_odb = sys.argv[1] if len(sys.argv) > 1 else default_odb
    extract_results(target_odb)
