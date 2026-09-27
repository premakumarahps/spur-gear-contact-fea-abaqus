# -*- coding: mbcs -*-
#
# Abaqus/CAE Release 2024 replay file
# Internal Version: 2023_09_21-18.25.25 RELr426 190762
# Run by dirty on Fri Sep 25 16:00:12 2026
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
from caeModules import *
from driverUtils import executeOnCaeStartup
executeOnCaeStartup()
openMdb('SpurGearSimul.cae')
#: The model database "D:\1.Antigravity Projects\13_Abaqus_Simulation\models\SpurGearSimul.cae" has been opened.
session.viewports['Viewport: 1'].setValues(displayedObject=None)
session.viewports['Viewport: 1'].partDisplay.geometryOptions.setValues(
    referenceRepresentation=ON)
p = mdb.models['Model-1'].parts['Gear']
session.viewports['Viewport: 1'].setValues(displayedObject=p)
session.viewports['Viewport: 1'].partDisplay.setValues(mesh=ON)
session.viewports['Viewport: 1'].partDisplay.meshOptions.setValues(
    meshTechnique=ON)
session.viewports['Viewport: 1'].partDisplay.geometryOptions.setValues(
    referenceRepresentation=OFF)
a = mdb.models['Model-1'].rootAssembly
session.viewports['Viewport: 1'].setValues(displayedObject=a)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(loads=ON, bcs=ON, 
    predefinedFields=ON, connectors=ON, optimizationTasks=OFF, 
    geometricRestrictions=OFF, stopConditions=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(loads=OFF, bcs=OFF, 
    predefinedFields=OFF, connectors=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(
    adaptiveMeshConstraints=ON)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(mesh=ON, 
    adaptiveMeshConstraints=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.meshOptions.setValues(
    meshTechnique=ON)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(mesh=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.meshOptions.setValues(
    meshTechnique=OFF)
session.viewports['Viewport: 1'].view.setValues(nearPlane=1228.21, 
    farPlane=1973.94, width=1123.25, height=568.589, cameraPosition=(230.749, 
    927.359, 1445.89), cameraUpVector=(-0.244622, 0.705379, -0.665282), 
    cameraTarget=(10.2757, 249.862, 1.8232))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1230.64, 
    farPlane=1971.5, width=1125.48, height=569.716, cameraPosition=(230.749, 
    927.359, 1445.89), cameraUpVector=(0.479329, 0.534869, -0.695815), 
    cameraTarget=(10.2757, 249.862, 1.82321))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1170.74, 
    farPlane=2056.8, width=1070.7, height=541.984, cameraPosition=(1500.46, 
    291.949, -577.352), cameraUpVector=(0.0164059, 0.255279, 0.966728), 
    cameraTarget=(2.98705, 253.509, 13.4375))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1262.04, 
    farPlane=1960.55, width=1154.19, height=584.248, cameraPosition=(148.745, 
    -420.761, -1443.88), cameraUpVector=(0.877055, 0.392498, 0.276983), 
    cameraTarget=(0.0463619, 251.958, 11.5524))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1193.68, 
    farPlane=2026.52, width=1091.67, height=552.599, cameraPosition=(162.304, 
    -699.085, -1277.71), cameraUpVector=(0.880214, 0.423043, 0.215075), 
    cameraTarget=(0.0550494, 251.78, 11.6589))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1214.86, 
    farPlane=2007.62, width=1111.04, height=562.402, cameraPosition=(460.567, 
    -395.349, -1389.08), cameraUpVector=(0.802285, 0.34319, 0.488425), 
    cameraTarget=(0.0252066, 251.75, 11.6701))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1169.75, 
    farPlane=2051.6, width=1069.79, height=541.521, cameraPosition=(594.361, 
    -509.223, -1276.99), cameraUpVector=(0.753223, 0.328792, 0.569693), 
    cameraTarget=(0.106589, 251.681, 11.7383))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1164.18, 
    farPlane=2054.8, width=1064.7, height=550.258, cameraPosition=(631.754, 
    -770.025, -1060.69), cameraUpVector=(0.735187, 0.503659, 0.453682), 
    cameraTarget=(0.11632, 251.613, 11.7946))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1255.97, 
    farPlane=1965.46, width=1148.64, height=593.642, cameraPosition=(373.611, 
    -526.011, -1347.85), cameraUpVector=(0.837852, 0.322879, 0.440174), 
    cameraTarget=(0.239635, 251.496, 11.9318))
session.graphicsOptions.setValues(backgroundStyle=SOLID, 
    backgroundColor='#FFFFFF')
session.viewports['Viewport: 1'].view.setValues(nearPlane=1213.23, 
    farPlane=2008.2, width=1002.25, height=507.343, viewOffsetX=12.3442, 
    viewOffsetY=-20.3217)
session.viewports['Viewport: 1'].view.setValues(nearPlane=1318.1, 
    farPlane=1918.91, width=1088.88, height=551.196, cameraPosition=(201.107, 
    -174.507, -1534.68), cameraUpVector=(0.888544, 0.218117, 0.403628), 
    cameraTarget=(1.34925, 249.12, 5.96344), viewOffsetX=13.4112, 
    viewOffsetY=-22.0783)
session.viewports['Viewport: 1'].view.setValues(nearPlane=1225.16, 
    farPlane=2013.51, width=1012.1, height=512.329, cameraPosition=(-169.469, 
    -629.157, -1336.35), cameraUpVector=(0.893337, 0.449281, -0.00983044), 
    cameraTarget=(2.18896, 253.446, -0.497704), viewOffsetX=12.4655, 
    viewOffsetY=-20.5215)
session.viewports['Viewport: 1'].view.setValues(nearPlane=1287.07, 
    farPlane=1951.6, width=706.88, height=357.824, viewOffsetX=-13.8566, 
    viewOffsetY=-49.3831)
session.viewports['Viewport: 1'].view.fitView()
session.viewports['Viewport: 1'].view.setValues(nearPlane=1365.36, 
    farPlane=2061.39, width=1033.08, height=533.92, cameraPosition=(-202.157, 
    -720.283, -1385.3), cameraUpVector=(0.93912, 0.338777, 0.0572965), 
    cameraTarget=(-19.5081, 218.834, 36.0906))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1374.84, 
    farPlane=2051.91, width=1040.25, height=537.627, cameraPosition=(-202.157, 
    -720.283, -1385.3), cameraUpVector=(0.964198, 0.235183, 0.122519), 
    cameraTarget=(-19.5081, 218.834, 36.0906))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1357.28, 
    farPlane=2061.86, width=1026.96, height=530.76, cameraPosition=(212.329, 
    -753.578, -1355.43), cameraUpVector=(0.874384, 0.397446, 0.278369), 
    cameraTarget=(-19.508, 218.834, 36.0906))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1378.65, 
    farPlane=2027.07, width=1043.13, height=539.117, cameraPosition=(315.601, 
    -511.654, -1477.04), cameraUpVector=(0.815069, 0.477951, 0.327453), 
    cameraTarget=(-19.738, 218.295, 36.3615))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1266.05, 
    farPlane=2182.94, width=957.937, height=495.087, cameraPosition=(-990.807, 
    -747.986, -986.682), cameraUpVector=(0.62103, 0.550192, -0.558221), 
    cameraTarget=(-11.6693, 219.755, 33.333))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1320.52, 
    farPlane=2118.35, width=999.152, height=516.388, cameraPosition=(-1402.03, 
    -130.821, -906.471), cameraUpVector=(0.698833, 0.416969, -0.581179), 
    cameraTarget=(-14.3203, 223.734, 33.8501))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1315.17, 
    farPlane=2123.7, width=995.102, height=514.295, cameraPosition=(-1402.03, 
    -130.821, -906.471), cameraUpVector=(0.753995, 0.259795, -0.603323), 
    cameraTarget=(-14.3203, 223.734, 33.8501))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1361.48, 
    farPlane=2062.58, width=1030.14, height=532.405, cameraPosition=(-977.837, 
    -160.766, -1330.23), cameraUpVector=(0.845902, 0.43847, -0.303636), 
    cameraTarget=(-12.8251, 223.628, 32.3564))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1282.85, 
    farPlane=2159.12, width=970.649, height=501.658, cameraPosition=(-1040.37, 
    -593.325, -1068.64), cameraUpVector=(0.811068, 0.32976, -0.483143), 
    cameraTarget=(-12.776, 223.967, 32.1511))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1282.73, 
    farPlane=2161.68, width=970.561, height=501.613, cameraPosition=(-1153.24, 
    -555.064, -981.855), cameraUpVector=(0.770774, 0.321432, -0.55008), 
    cameraTarget=(-13.275, 224.136, 32.5348))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1322.58, 
    farPlane=2121.83, width=638.703, height=330.096, viewOffsetX=-2.13922, 
    viewOffsetY=3.07967)
session.viewports['Viewport: 1'].view.setValues(nearPlane=1325.82, 
    farPlane=2118.6, width=640.266, height=330.904, cameraPosition=(-1153.07, 
    -556.1, -981.254), cameraUpVector=(0.645561, 0.518487, -0.560733), 
    cameraTarget=(-13.1014, 223.1, 33.1357), viewOffsetX=-2.14446, 
    viewOffsetY=3.0872)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(
    adaptiveMeshConstraints=ON)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(
    adaptiveMeshConstraints=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(
    adaptiveMeshConstraints=ON)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(
    adaptiveMeshConstraints=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(
    adaptiveMeshConstraints=ON)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(step='Torque_Step')
session.viewports['Viewport: 1'].assemblyDisplay.setValues(step='Initial')
session.viewports['Viewport: 1'].assemblyDisplay.setValues(interactions=ON, 
    constraints=ON, connectors=ON, engineeringFeatures=ON, 
    adaptiveMeshConstraints=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(step='Torque_Step')
session.viewports['Viewport: 1'].restore()
session.viewports['Viewport: 1'].setValues(origin=(0.0, 22.9166641235352), 
    width=163.996871948242, height=82.9583282470703)
session.viewports['Viewport: 1'].maximize()
session.viewports['Viewport: 1'].assemblyDisplay.setValues(loads=ON, bcs=ON, 
    predefinedFields=ON, interactions=OFF, constraints=OFF, 
    engineeringFeatures=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(step='Initial')
session.viewports['Viewport: 1'].assemblyDisplay.setValues(step='Torque_Step')
session.viewports['Viewport: 1'].assemblyDisplay.setValues(mesh=ON, loads=OFF, 
    bcs=OFF, predefinedFields=OFF, connectors=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.meshOptions.setValues(
    meshTechnique=ON)
p = mdb.models['Model-1'].parts['Gear']
session.viewports['Viewport: 1'].setValues(displayedObject=p)
a = mdb.models['Model-1'].rootAssembly
session.viewports['Viewport: 1'].setValues(displayedObject=a)
p = mdb.models['Model-1'].parts['Gear']
session.viewports['Viewport: 1'].setValues(displayedObject=p)
a = mdb.models['Model-1'].rootAssembly
session.viewports['Viewport: 1'].setValues(displayedObject=a)
p = mdb.models['Model-1'].parts['Gear']
session.viewports['Viewport: 1'].setValues(displayedObject=p)
session.viewports['Viewport: 1'].view.setValues(nearPlane=1063.6, 
    farPlane=1869.47, width=940.177, height=477.928, cameraPosition=(595.961, 
    -382.411, 1170.45), cameraUpVector=(-0.77136, 0.564918, 0.29304), 
    cameraTarget=(13.2958, 295.167, 2.93686))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1096.5, 
    farPlane=1817.01, width=969.26, height=492.712, cameraPosition=(-339.745, 
    -418.382, 1238.11), cameraUpVector=(-0.0387867, 0.986069, 0.161753), 
    cameraTarget=(15.6797, 295.259, 2.76447))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1091.41, 
    farPlane=1822.09, width=964.759, height=490.424, cameraPosition=(-339.745, 
    -418.382, 1238.11), cameraUpVector=(0.429544, 0.87296, 0.231156), 
    cameraTarget=(15.6797, 295.259, 2.76447))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1093.26, 
    farPlane=1831.92, width=966.39, height=491.253, cameraPosition=(250.212, 
    -564.397, 1170.76), cameraUpVector=(-0.0145275, 0.957177, 0.28914), 
    cameraTarget=(10.2051, 296.614, 3.38948))
session.viewports['Viewport: 1'].view.setValues(nearPlane=979.443, 
    farPlane=1959.06, width=865.781, height=440.11, cameraPosition=(794.001, 
    -747.974, 676.58), cameraUpVector=(0.083333, 0.857289, 0.508046), 
    cameraTarget=(7.34927, 297.578, 5.98473))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1039.48, 
    farPlane=1876.86, width=918.85, height=467.087, cameraPosition=(-1218.76, 
    9.8591, 762.525), cameraUpVector=(0.775397, 0.0505804, 0.629446), 
    cameraTarget=(8.74631, 297.052, 5.92509))
session.viewports['Viewport: 1'].view.setValues(nearPlane=1088.21, 
    farPlane=1828.13, width=565.806, height=287.621, viewOffsetX=12.8207, 
    viewOffsetY=-21.8873)
session.viewports['Viewport: 1'].view.setValues(nearPlane=1106.9, 
    farPlane=1803.51, width=575.525, height=292.561, cameraPosition=(-1174.33, 
    76.6998, 845.857), cameraUpVector=(0.815698, 0.0422994, 0.57693), 
    cameraTarget=(10.649, 296.854, 3.80492), viewOffsetX=13.0409, 
    viewOffsetY=-22.2633)
session.viewports['Viewport: 1'].view.setValues(nearPlane=1121.5, 
    farPlane=1783.07, width=583.114, height=296.419, cameraPosition=(-1122.73, 
    143.18, 923.375), cameraUpVector=(0.852199, 0.0289409, 0.522416), 
    cameraTarget=(12.3139, 296.325, 1.46313), viewOffsetX=13.2129, 
    viewOffsetY=-22.5569)
mdb.meshEditOptions.setValues(enableUndo=True, maxUndoCacheElements=0.5)
a = mdb.models['Model-1'].rootAssembly
session.viewports['Viewport: 1'].setValues(displayedObject=a)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(mesh=OFF, 
    optimizationTasks=ON, geometricRestrictions=ON, stopConditions=ON)
session.viewports['Viewport: 1'].assemblyDisplay.meshOptions.setValues(
    meshTechnique=OFF)
session.viewports['Viewport: 1'].assemblyDisplay.setValues(
    optimizationTasks=OFF, geometricRestrictions=OFF, stopConditions=OFF)
del mdb.jobs['Job_Mesh4_6mm']
mdb.save()
#: The model database has been saved to "D:\1.Antigravity Projects\13_Abaqus_Simulation\models\SpurGearSimul.cae".
