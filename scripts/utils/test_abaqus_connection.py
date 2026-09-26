# ==============================================================================
# Script: test_abaqus_connection.py
# Purpose: Test Python connection with Abaqus (CLI and Abaqus/CAE GUI)
# ==============================================================================
import sys
import os

print("=" * 60)
print("ABAQUS PYTHON ENVIRONMENT TEST")
print("=" * 60)
print(f"Python Executable : {sys.executable}")
print(f"Python Version    : {sys.version.split()[0]}")
print(f"Current Directory : {os.getcwd()}")

# 1. Test CAE Kernel connection (available inside Abaqus/CAE or with 'abaqus cae')
try:
    from abaqus import mdb, session
    from abaqusConstants import *
    print("\n[SUCCESS] Connected to Abaqus/CAE Kernel!")
    print(f"Current Models in Mdb: {list(mdb.models.keys())}")
    cae_mode = True
except ImportError as e:
    print(f"\n[INFO] Abaqus/CAE Kernel modules not loaded: {e}")
    print("       (This is normal if running via 'abaqus python' outside CAE)")
    cae_mode = False

# 2. Test ODB Access (available in both CAE and standalone 'abaqus python')
try:
    import odbAccess
    print("[SUCCESS] 'odbAccess' module is available for reading/writing ODB files.")
except ImportError as e:
    print(f"[WARNING] Could not import odbAccess: {e}")

print("=" * 60)
if cae_mode:
    print("READY: You can run CAE modeling, meshing, and simulation scripts!")
else:
    print("READY: You can run standalone Abaqus Python scripts (e.g. ODB post-processing).")
print("=" * 60)
