import json
import os

with open('output/screenshots_ocr.json', encoding='utf-8-sig') as f:
    data = json.load(f)

print(f"Total screenshots analyzed: {len(data)}\n")

for k in sorted(data.keys()):
    v = data[k]
    lines = [line.strip() for line in v.split('\n') if line.strip()]
    module = "Unknown"
    for l in lines:
        if "Module:" in l:
            module = l
            break
    
    # Check what dialog or action is visible
    dialogs = [l for l in lines if any(w in l.lower() for w in [
        'manager', 'edit ', 'create', 'global seeds', 'mesh controls', 'element type',
        'odb:', 'mises', 'displacement', 'torque', 'coupling', 'interaction', 'contact'
    ])]
    
    print(f"File: {k}")
    print(f"  Module line: {module}")
    print(f"  Highlights: {dialogs[:5]}")
    print("-" * 50)
