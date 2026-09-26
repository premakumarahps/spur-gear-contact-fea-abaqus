import os
import glob

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"

# Redundant large files to remove
files_to_remove = [
    os.path.join(base_dir, "jobs", "Job_Mesh4_6mm.inp"), # 53.8 MB unrun deck
    os.path.join(base_dir, "jobs", "Job_Mesh0_20mm.odb"), # 514.3 MB intermediate
    os.path.join(base_dir, "jobs", "Job_Mesh1_16mm.odb"), # 574.3 MB intermediate
    os.path.join(base_dir, "jobs", "Job_Mesh2_12mm.odb"), # 640.4 MB intermediate
    os.path.join(base_dir, "Simulation presentation_backup.pptx"), # 15.1 MB temp backup
]

# Large solver dumps (.msg, .prt, .dat, .com, .sta)
solver_dumps = glob.glob(os.path.join(base_dir, "jobs", "*.com")) + \
               glob.glob(os.path.join(base_dir, "jobs", "*.msg")) + \
               glob.glob(os.path.join(base_dir, "jobs", "*.prt")) + \
               glob.glob(os.path.join(base_dir, "jobs", "*.dat")) + \
               glob.glob(os.path.join(base_dir, "jobs", "*.sta"))

freed_bytes = 0
for f in files_to_remove + solver_dumps:
    if os.path.exists(f):
        size = os.path.getsize(f)
        try:
            os.remove(f)
            freed_bytes += size
            print(f"Deleted: {os.path.basename(f)} ({size / 1024 / 1024:.2f} MB)")
        except Exception as e:
            print(f"Could not delete {f}: {e}")

print(f"\nTotal storage freed: {freed_bytes / 1024 / 1024:.2f} MB ({freed_bytes / 1024 / 1024 / 1024:.2f} GB)!")

# Create a robust .gitignore for the repository
gitignore_content = """# Large Abaqus Output Databases (GitHub limit is 100MB)
*.odb
*.cae
*.jnl
*.inp
*.com
*.msg
*.dat
*.prt
*.sta
abaqus.rpy*
abaqus*.rec

# Web development build artifacts
node_modules/
dist/
.vite/
*.local

# System & IDE files
.DS_Store
Thumbs.db
__pycache__/
*.pyc
"""

with open(os.path.join(base_dir, ".gitignore"), "w") as f:
    f.write(gitignore_content.strip() + "\n")

print("Created .gitignore successfully!")
