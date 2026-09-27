# -*- coding: mbcs -*-
#
# Abaqus/Viewer Release 2024 replay file
# Internal Version: 2023_09_21-18.25.25 RELr426 190762
# Run by dirty on Fri Sep 25 16:31:41 2026
#

# from driverUtils import executeOnCaeGraphicsStartup
# executeOnCaeGraphicsStartup()
#: Executing "onCaeGraphicsStartup()" in the site directory ...
from abaqus import *
from abaqusConstants import *
session.Viewport(name='Viewport: 1', origin=(0.0, 0.0), width=158.484375, 
    height=105.874992370605)
session.viewports['Viewport: 1'].makeCurrent()
session.viewports['Viewport: 1'].maximize()
from viewerModules import *
from driverUtils import executeOnCaeStartup
executeOnCaeStartup()
o2 = session.openOdb(name='Job_Mesh0_20mm.odb')
#: Model: D:/1.Antigravity Projects/13_Abaqus_Simulation/jobs/Job_Mesh0_20mm.odb
#: Number of Assemblies:         1
#: Number of Assembly instances: 0
#: Number of Part instances:     2
#: Number of Meshes:             3
#: Number of Element Sets:       4
#: Number of Node Sets:          7
#: Number of Steps:              1
session.viewports['Viewport: 1'].setValues(displayedObject=o2)
session.viewports['Viewport: 1'].makeCurrent()
