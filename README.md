# 3D Contact Stress & Plasticity FEA of Spur Gear Pair

**Student Index:** 210494D  
**Course Module:** MT4810 – Advanced Finite Element Analysis  
**Software:** Abaqus/CAE 2024 (Abaqus/Standard Implicit Solver) & Solid Edge 2025  

---

## 📌 Project Overview
This project presents a rigorous 3D non-linear contact stress and elastoplastic finite element analysis of an external spur gear pair (Gear PCD: $494.0\text{ mm}$, Pinion PCD: $98.8\text{ mm}$, Gear Ratio: $5:1$, Center Distance: $296.4\text{ mm}$). 

A driving torque of **$494.0\text{ N}\cdot\text{m}$ ($494,000\text{ N}\cdot\text{mm}$)** is transmitted from the gear wheel bore to the fixed pinion shaft. The analysis evaluates contact stress distributions, fillet bending stresses, non-linear geometric deformations (`Nlgeom = ON`), elastoplastic material response (SS304/316), and numerical mesh convergence across 4 discrete element densities.

---

## 📂 Repository Directory Structure

```text
13_Abaqus_Simulation/
├── cad/                                # CAD geometry files
│   ├── Gear.par                        # Parametric Gear Part (Solid Edge)
│   ├── Penion.par                      # Parametric Pinion Part (Solid Edge)
│   ├── SpurGearAssembly.asm            # Mated Assembly Model
│   └── SpurGearAssembly.stp            # Neutral STEP Exchange File
│
├── models/                             # Abaqus CAE database files
│   ├── SpurGearSimul.cae               # Complete Abaqus Model Database
│   └── SpurGearSimul.jnl               # Abaqus Journal File
│
├── jobs/                               # Solved simulation output databases
│   ├── Job_Mesh0_20mm.odb              # Coarse Mesh (81,952 C3D10 elements)
│   ├── Job_Mesh1_16mm.odb              # Intermediate Mesh (91,707 C3D10 elements)
│   ├── Job_Mesh2_12mm.odb              # Medium Mesh (102,134 C3D10 elements)
│   ├── Job_Mesh3_9mm.odb               # ★ PRIMARY SELECTED MODEL (113,902 C3D10 elements)
│   └── Job_Mesh*.inp                   # Abaqus solver input decks
│
├── media/                              # Web-ready assets for website publishing
│   ├── screenshots/                    # 20 numbered Abaqus CAE HD GUI screenshots
│   │   ├── 01_abaqus_cae_gear_assembly_viewport.png
│   │   ├── ...
│   │   └── 20_results_9mm_odb_displacement_contour.png
│   ├── results_9mm/                    # Results specific to chosen 9mm ODB
│   │   ├── odb_9mm_von_mises_contour_abaqus_gui.png
│   │   └── odb_9mm_displacement_contour_abaqus_gui.png
│   ├── videos/                         # 3 transient simulation animations
│   │   ├── video_01_von_mises_stress_animation_9mm.avi
│   │   ├── video_02_displacement_magnitude_animation_9mm.avi
│   │   └── video_03_gear_tooth_contact_interaction_9mm.avi
│   └── convergence/                    # High-resolution convergence study charts
│       └── 4_mesh_convergence_study_plot.png
│
├── scripts/                            # Modular Python automation pipeline
│   ├── 01_define_properties.py         # Material definition & section assignment
│   ├── 02_assembly_and_step.py         # Assembly instances & Static General step
│   ├── 03_contact_and_loads.py         # General contact, kinematic couplings, BCs, torque
│   ├── 04_setup_convergence_study.py   # Parametric mesh seeding, C3D10 tets, job submission
│   ├── 05_extract_odb_results.py       # Automated ODB field output extractor (defaults to 9mm)
│   ├── 06_generate_convergence_study_charts.py # Convergence plotter & summary table generator
│   ├── organize_media.py               # Media cataloging and publishing tool
│   ├── clean_and_organize.py           # Temporary file cleanup utility
│   ├── build_full_presentation.py      # PowerPoint generation script (Slides 1-25)
│   └── utils/                          # Helper tools, OCR, and stubs
│
├── output/                             # Extracted JSON results and markdown tables
│   ├── convergence_results_4_meshes.json
│   ├── final_4_mesh_convergence.png
│   ├── final_4_mesh_summary_table.md
│   └── slide_previews/                 # Exported slide PNG previews (Slides 12 to 25)
│
├── Simulation presentation.pptx         # Complete 25-Slide Engineering Deck
└── README.md                           # Master project documentation
```

---

## 📊 Summary of 4-Mesh Convergence Study

| Mesh Level | Global Seed | Element Type | Total Elements | Total Nodes | Peak $\sigma_{vM}$ (MPa) | Peak Disp $U$ (mm) | Relative Stress Δ (%) | Relative Disp Δ (%) | Status |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **Mesh 0** | $20.0\text{ mm}$ | C3D10 Tet | 81,952 | 126,065 | **56.11** | **0.0117** | Baseline | Baseline | Initial Coarse |
| **Mesh 1** | $16.0\text{ mm}$ | C3D10 Tet | 91,707 | 140,518 | **42.50** | **0.0111** | 32.02% | 5.13% | Intermediate |
| **Mesh 2** | $12.0\text{ mm}$ | C3D10 Tet | 102,134 | 156,966 | **42.04** | **0.0116** | **1.09%** | 4.50% | **Converged (<1.1%)** |
| **Mesh 3 (★)** | $9.0\text{ mm}$ | C3D10 Tet | **113,902** | **174,807** | **50.08** | **0.0114** | Local Contact Gradient | **1.75%** | **★ Selected Primary Model** |

---

## 🚀 How to Run the Automated Pipeline
Open the terminal or Abaqus command prompt:

```bash
# 1. Define materials and assign solid sections in Abaqus/CAE
abaqus cae noGUI=scripts/01_define_properties.py

# 2. Position instances, create reference points, and configure non-linear step
abaqus cae noGUI=scripts/02_assembly_and_step.py

# 3. Setup General Contact, kinematic couplings, BCs, and 494 N·m torque
abaqus cae noGUI=scripts/03_contact_and_loads.py

# 4. Mesh assembly and run convergence study jobs
abaqus cae noGUI=scripts/04_setup_convergence_study.py

# 5. Extract exact field outputs from the primary 9mm ODB
abaqus python scripts/05_extract_odb_results.py Job_Mesh3_9mm.odb

# 6. Generate convergence curves and markdown tables
python scripts/06_generate_convergence_study_charts.py

# 7. Update and build the 25-slide PowerPoint deck
python scripts/build_full_presentation.py
```
