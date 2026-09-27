# ==============================================================================
# Script: probe_abaqus_api.py
# Purpose: Introspect Abaqus 2024 built-in documentation and method signatures
#          for Meshing, Job management, and ODB extraction.
# ==============================================================================
from typing import Any
import os
import pydoc

# Safe import for both IDE static analysis (VS Code / Pyright) and Abaqus runtime
try:
    from abaqus import *  # type: ignore
    from abaqusConstants import *  # type: ignore
    import part  # type: ignore
    import mesh  # type: ignore
    import job  # type: ignore
    import odbAccess  # type: ignore
except ImportError:
    # Stubs for IDE language server when inspected outside Abaqus kernel
    openMdb = lambda *args, **kwargs: None  # type: ignore
    class _MockMdb:
        models: dict[str, Any] = {}
        jobs: dict[str, Any] = {}
        def Job(self, *args: Any, **kwargs: Any) -> Any: pass
    mdb = _MockMdb()  # type: ignore
    part = None  # type: ignore
    mesh = None  # type: ignore
    job = None  # type: ignore
    odbAccess = None  # type: ignore

out_file = 'output/abaqus_api_reference.txt'

def get_doc(obj_func: Any) -> str:
    try:
        return pydoc.render_doc(obj_func)
    except Exception as e:
        return f"Error getting doc: {e}"

if __name__ == '__main__':
    openMdb('models/SpurGearSimul.cae')
    model = mdb.models['Model-1']
    p_pinion = model.parts['Pinion']

    with open(out_file, 'w') as f:
        f.write("=" * 80 + "\n")
        f.write("ABAQUS 2024 OFFICIAL BUILT-IN API REFERENCE & METHOD SIGNATURES\n")
        f.write("=" * 80 + "\n\n")

        # 1. Meshing API
        f.write("[1] MESHING API:\n")
        f.write("-" * 40 + "\n")
        f.write("Part.setMeshControls:\n")
        f.write(get_doc(getattr(p_pinion, 'setMeshControls', None)) + "\n\n")

        f.write("Part.setElementType:\n")
        f.write(get_doc(getattr(p_pinion, 'setElementType', None)) + "\n\n")

        f.write("Part.seedPart:\n")
        f.write(get_doc(getattr(p_pinion, 'seedPart', None)) + "\n\n")

        f.write("Part.generateMesh:\n")
        f.write(get_doc(getattr(p_pinion, 'generateMesh', None)) + "\n\n")

        # 2. Job API
        f.write("[2] JOB CREATION & EXECUTION API:\n")
        f.write("-" * 40 + "\n")
        f.write("mdb.Job constructor:\n")
        f.write(get_doc(getattr(mdb, 'Job', None)) + "\n\n")

        test_model = mdb.models.get('Model-1', None)
        test_job = mdb.Job(name='TempDocJob', model='Model-1')

        f.write("Job.submit:\n")
        f.write(get_doc(getattr(test_job, 'submit', None)) + "\n\n")

        f.write("Job.waitForCompletion:\n")
        f.write(get_doc(getattr(test_job, 'waitForCompletion', None)) + "\n\n")

        f.write("Job.writeInput:\n")
        f.write(get_doc(getattr(test_job, 'writeInput', None)) + "\n\n")

        if 'TempDocJob' in mdb.jobs:
            del mdb.jobs['TempDocJob']

        # 3. ODB Post-processing API
        f.write("[3] ODB POST-PROCESSING API:\n")
        f.write("-" * 40 + "\n")
        f.write("odbAccess.openOdb:\n")
        f.write(get_doc(getattr(odbAccess, 'openOdb', None)) + "\n\n")

    print(f"API signatures collected and written to {out_file}")
