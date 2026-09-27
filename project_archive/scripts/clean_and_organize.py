import os
import shutil
import glob

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
scripts_dir = os.path.join(base_dir, "scripts")
utils_dir = os.path.join(scripts_dir, "utils")
os.makedirs(utils_dir, exist_ok=True)

files_to_move = [
    'analyze_screenshots.py',
    'classify_screenshots.py',
    'compile_all_4_results.py',
    'create_20mm_job.py',
    'detailed_ocr.ps1',
    'export_contour_images.py',
    'extract_mesh2_results.py',
    'extract_odb_generic.py',
    'extract_results_odb.py',
    'generate_convergence_report.py',
    'inspect_ppt.py',
    'ocr_screenshots.ps1',
    'probe_abaqus_api.py',
    'read_pptx_pure.py',
    'run_datacheck.py',
    'run_remaining_queue.py',
    'test_abaqus_connection.py',
    'test_coarse_sizes.py',
    'test_deviation.py',
    'test_mesh_densities.py',
    'verify_properties.py'
]

for fname in files_to_move:
    src = os.path.join(scripts_dir, fname)
    dst = os.path.join(utils_dir, fname)
    if os.path.exists(src):
        shutil.move(src, dst)
        print(f"Moved: {fname} -> scripts/utils/{fname}")

# Remove temporary replay/rec files
for pattern in ['abaqus.rpy*', 'abaqus*.rec']:
    for f in glob.glob(os.path.join(base_dir, pattern)):
        try:
            os.remove(f)
            print(f"Removed temp file: {os.path.basename(f)}")
        except Exception as e:
            print(f"Error removing {f}: {e}")

for f in glob.glob(os.path.join(base_dir, 'jobs', 'abaqus.rpy*')):
    try:
        os.remove(f)
        print(f"Removed temp file from jobs: {os.path.basename(f)}")
    except Exception as e:
        print(f"Error removing {f}: {e}")

print("Clean and organize complete!")
