# ==============================================================================
# Script: export_contour_images.py
# Purpose: Generate contour plots (von Mises Stress, Displacement, Contact)
#          directly from Job_Mesh1_16mm.odb as high-res PNG images
# ==============================================================================
import os
from abaqus import *
from abaqusConstants import *
import visualization

import sys
job_name = sys.argv[-1] if len(sys.argv) > 1 and not sys.argv[-1].endswith('.py') else 'Job_Mesh2_12mm'
odb_path = os.path.abspath(f'jobs/{job_name}.odb')
print(f"Exporting contours for: {odb_path}")
o = session.openOdb(name=job_name, path=odb_path, readOnly=True)
vp = session.viewports['Viewport: 1']
vp.setValues(displayedObject=o)
vp.odbDisplay.display.setValues(plotState=(CONTOURS_ON_DEF, ))

# Configure common display options
session.pngOptions.setValues(imageSize=(1600, 1200))
session.printOptions.setValues(vpDecorations=ON, reduceColors=False)

# 1. von Mises Stress Contour
vp.odbDisplay.setPrimaryVariable(
    variableLabel='S',
    outputPosition=INTEGRATION_POINT,
    refinement=(INVARIANT, 'Mises')
)
vp.view.fitView()
stress_img = os.path.abspath(f'output/contour_von_mises_{job_name}')
session.printToFile(fileName=stress_img, format=PNG, canvasObjects=(vp, ))
print(f"[SUCCESS] von Mises contour saved to {stress_img}.png")

# 2. Overall Displacement (U Magnitude)
vp.odbDisplay.setPrimaryVariable(
    variableLabel='U',
    outputPosition=NODAL,
    refinement=(INVARIANT, 'Magnitude')
)
disp_img = os.path.abspath(f'output/contour_displacement_{job_name}')
session.printToFile(fileName=disp_img, format=PNG, canvasObjects=(vp, ))
print(f"[SUCCESS] Displacement contour saved to {disp_img}.png")

o.close()
print("All contour images generated successfully.")
