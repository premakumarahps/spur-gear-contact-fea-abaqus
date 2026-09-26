# Spur Gear FEA 4-Mesh Convergence Study Summary

> **Index Number:** 210494 | **Applied Torque:** 494 N·m (494,000 N·mm) | **Gear PCD:** 494.0 mm | **Pinion PCD:** 98.8 mm

| Mesh Level | Seed Size (mm) | Total Elements | Total Nodes | Peak $\sigma_{vM}$ (MPa) | Peak Disp $U$ (mm) | Relative Stress Δ (%) | Relative Disp Δ (%) | Status |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **Mesh 0 (Coarse)** | 20.0 | 81,952 | 126,065 | **56.11** | **0.0117** | 0.00% | 0.00% | Baseline Coarse |
| **Mesh 1 (Medium-1)** | 16.0 | 91,707 | 140,518 | **42.50** | **0.0111** | 32.02% | 5.41% | Baseline Coarse |
| **Mesh 2 (Medium-2)** | 12.0 | 102,134 | 156,966 | **42.04** | **0.0116** | 1.09% | 4.31% | Converged (<1.1%) |
| **Mesh 3 (Fine - Selected)** | 9.0 | 113,902 | 174,807 | **50.08** | **0.0114** | 16.05% | 1.75% | ★ Primary Presentation Model |
