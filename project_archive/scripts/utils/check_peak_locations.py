from odbAccess import openOdb
import os

jobs = ['Job_Mesh0_20mm.odb', 'Job_Mesh1_16mm.odb', 'Job_Mesh2_12mm.odb', 'Job_Mesh3_9mm.odb']
for j in jobs:
    p = os.path.join('jobs', j)
    if not os.path.exists(p):
        continue
    odb = openOdb(p, readOnly=True)
    frame = odb.steps['Torque_Step'].frames[-1]
    s_field = frame.fieldOutputs['S']
    
    max_mises = 0.0
    max_val = None
    for val in s_field.values:
        if val.mises is not None and val.mises > max_mises:
            max_mises = val.mises
            max_val = val
            
    inst_name = max_val.instance.name if hasattr(max_val, 'instance') and max_val.instance else 'Assembly'
    elem_label = max_val.elementLabel
    
    # Get coordinates of element centroid if possible
    elem = odb.rootAssembly.instances[inst_name].elements[elem_label - 1]
    node_coords = [odb.rootAssembly.instances[inst_name].nodes[nid - 1].coordinates for nid in elem.connectivity]
    cx = sum([c[0] for c in node_coords]) / len(node_coords)
    cy = sum([c[1] for c in node_coords]) / len(node_coords)
    cz = sum([c[2] for c in node_coords]) / len(node_coords)
    
    # Calculate radius from gear or pinion center
    r_pinion = (cx**2 + cy**2)**0.5
    r_gear = ((cx - 296.4)**2 + cy**2)**0.5
    
    u_field = frame.fieldOutputs['U']
    max_u = max([v.magnitude for v in u_field.values if v.magnitude is not None])
    
    print("=" * 50)
    print("JOB: %s" % j)
    print("  Max von Mises: %.2f MPa" % max_mises)
    print("  Instance: %s | Elem Label: %d" % (inst_name, elem_label))
    print("  Centroid: (X=%.1f, Y=%.1f, Z=%.1f)" % (cx, cy, cz))
    print("  Radius from Pinion Center: %.1f mm (Pitch R=49.4 mm, Bore R=10.0 mm)" % r_pinion)
    print("  Radius from Gear Center: %.1f mm (Pitch R=247.0 mm, Bore R=10.0 mm)" % r_gear)
    print("  Max Displacement: %.4f mm" % max_u)
    odb.close()
