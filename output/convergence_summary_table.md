# Mesh Convergence Study Summary

| Mesh Level | Seed Size (mm) | Elements | Nodes | Peak von Mises (MPa) | Peak Disp (mm) | Peak PEEQ (-) | Stress Change (%) |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Mesh 1** | 16.0 | 91,707 | 140,518 | 312.45 | 0.0821 | 0.0052 | Baseline |
| **Mesh 2** | 12.0 | 102,134 | 156,966 | 338.80 | 0.0894 | 0.0078 | 7.78% |
| **Mesh 3** | 9.0 | 113,902 | 174,807 | 354.10 | 0.0935 | 0.0094 | 4.32% |
| **Mesh 4** | 6.0 | 348,981 | 512,163 | 361.20 | 0.0952 | 0.0102 | 1.97% |

> **Conclusion:** Results asymptotically stabilize with decreasing element size, demonstrating convergence.
