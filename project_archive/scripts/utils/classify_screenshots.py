import json
import os
import glob
from PIL import Image

with open('output/screenshots_ocr.json', encoding='utf-8-sig') as f:
    ocr_data = json.load(f)

print("IMAGE DETAILS:")
for img_name in sorted(ocr_data.keys()):
    txt = ocr_data[img_name]
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    
    # Identify key indicators
    indicators = []
    for l in lines:
        for term in ['Assembly', 'Step Manager', 'Field Output', 'History Output', 'Interaction Manager',
                     'Tangential Behavior', 'Normal Behavior', 'Coupling_Gear', 'Coupling_Pinion',
                     'BC_Gear', 'BC_Pinion', 'Torque_494Nm', 'Global Seeds', 'Mesh Controls',
                     'Job Manager', 'Job_Mesh', 'ODB:', 'S, Mises', 'U, Magnitude', 'Visualization']:
            if term.lower() in l.lower():
                indicators.append(l)
    
    print(f"\n>>> {img_name}")
    print("Detected context:", list(set(indicators))[:4])
