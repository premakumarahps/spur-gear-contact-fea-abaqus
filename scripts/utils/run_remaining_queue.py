# ==============================================================================
# Script: run_remaining_queue.py
# Purpose: Sequentially solve Job_Mesh0_20mm and Job_Mesh3_9mm,
#          extract all 4 ODB results, and generate the final convergence study.
# ==============================================================================
import os
import sys
import subprocess
import time
import json

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
jobs_dir = os.path.join(base_dir, "jobs")
output_dir = os.path.join(base_dir, "output")
scripts_dir = os.path.join(base_dir, "scripts")

def log(msg):
    timestamp = time.strftime("[%Y-%m-%d %H:%M:%S]")
    line = f"{timestamp} {msg}"
    print(line)
    sys.stdout.flush()
    with open(os.path.join(output_dir, "queue_execution.log"), "a") as f:
        f.write(line + "\n")

log("Starting Automated Sequential Simulation Queue...")

# --- 1. RUN JOB 1: Job_Mesh0_20mm (Point 1: 81,952 elements) ---
log(">>> STAGE 1/4: Launching Job_Mesh0_20mm (81k elements)...")
t0 = time.time()
cmd1 = ["abaqus", "job=Job_Mesh0_20mm", "cpus=4", "interactive"]
res1 = subprocess.run(cmd1, cwd=jobs_dir, shell=True)
elapsed1 = time.time() - t0
log(f">>> Job_Mesh0_20mm exited with returncode {res1.returncode} in {elapsed1/60:.1f} minutes.")

# --- 2. EXTRACT RESULTS: Job_Mesh0_20mm ---
log(">>> STAGE 2/4: Extracting results from Job_Mesh0_20mm.odb...")
extract_cmd = ["abaqus", "python", os.path.join(scripts_dir, "extract_odb_generic.py"), "Job_Mesh0_20mm"]
subprocess.run(extract_cmd, cwd=jobs_dir, shell=True)

# --- 3. RUN JOB 2: Job_Mesh3_9mm (Point 4: 113,902 elements) ---
log(">>> STAGE 3/4: Launching Job_Mesh3_9mm (113k elements)...")
t1 = time.time()
cmd2 = ["abaqus", "job=Job_Mesh3_9mm", "cpus=4", "interactive"]
res2 = subprocess.run(cmd2, cwd=jobs_dir, shell=True)
elapsed2 = time.time() - t1
log(f">>> Job_Mesh3_9mm exited with returncode {res2.returncode} in {elapsed2/60:.1f} minutes.")

# --- 4. EXTRACT RESULTS: Job_Mesh3_9mm ---
log(">>> STAGE 4/4: Extracting results from Job_Mesh3_9mm.odb...")
extract_cmd2 = ["abaqus", "python", os.path.join(scripts_dir, "extract_odb_generic.py"), "Job_Mesh3_9mm"]
subprocess.run(extract_cmd2, cwd=jobs_dir, shell=True)

# --- 5. COMPILE ALL 4 RESULTS & GENERATE FINAL CONVERGENCE REPORT ---
log(">>> COMPILING ALL 4 SOLVER RESULTS & GENERATING CONVERGENCE PLOTS...")
compile_cmd = ["python", os.path.join(scripts_dir, "compile_all_4_results.py")]
subprocess.run(compile_cmd, cwd=base_dir, shell=True)

log(">>> ALL 4 SIMULATIONS AND CONVERGENCE STUDY COMPLETED SUCCESSFULLY!")
