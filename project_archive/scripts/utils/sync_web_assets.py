import os
import shutil

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
web_public = os.path.join(base_dir, "web", "public")

dirs_to_copy = [
    (os.path.join(base_dir, "media", "screenshots"), os.path.join(web_public, "screenshots")),
    (os.path.join(base_dir, "media", "results_9mm"), os.path.join(web_public, "results_9mm")),
    (os.path.join(base_dir, "media", "convergence"), os.path.join(web_public, "convergence")),
    (os.path.join(base_dir, "media", "videos"), os.path.join(web_public, "videos")),
    (os.path.join(base_dir, "output", "slide_previews"), os.path.join(web_public, "slide_previews")),
]

for src, dst in dirs_to_copy:
    if os.path.exists(src):
        os.makedirs(dst, exist_ok=True)
        for item in os.listdir(src):
            s = os.path.join(src, item)
            d = os.path.join(dst, item)
            if os.path.isfile(s):
                shutil.copy2(s, d)
        print(f"Copied {len(os.listdir(src))} files from {os.path.basename(src)} to web/public/{os.path.basename(dst)}")

# Also copy the 6 primary scripts for direct download
scripts_dest = os.path.join(web_public, "scripts")
os.makedirs(scripts_dest, exist_ok=True)
for fname in [
    "01_define_properties.py",
    "02_assembly_and_step.py",
    "03_contact_and_loads.py",
    "04_setup_convergence_study.py",
    "05_extract_odb_results.py",
    "06_generate_convergence_study_charts.py"
]:
    s = os.path.join(base_dir, "scripts", fname)
    if os.path.exists(s):
        shutil.copy2(s, os.path.join(scripts_dest, fname))
        print(f"Copied script for download: {fname}")

print("web/public media sync complete!")
