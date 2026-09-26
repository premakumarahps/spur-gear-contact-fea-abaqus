import os
import zipfile
import xml.etree.ElementTree as ET

pptx_path = 'Simulation presentation.pptx'
out_file = 'output/pptx_text_summary.txt'

with zipfile.ZipFile(pptx_path, 'r') as z:
    slide_names = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
    # sort numerically
    slide_names.sort(key=lambda x: int(''.join(filter(str.isdigit, x)) or 0))
    
    with open(out_file, 'w', encoding='utf-8') as out:
        out.write(f"Presentation: {pptx_path}\n")
        out.write(f"Total Slides: {len(slide_names)}\n\n")
        
        for idx, sname in enumerate(slide_names, 1):
            out.write(f"=== SLIDE {idx} ({sname}) ===\n")
            xml_data = z.read(sname)
            root = ET.fromstring(xml_data)
            # Find all text elements <a:t>
            texts = [node.text for node in root.iter() if node.tag.endswith('}t') and node.text]
            for t in texts:
                out.write(f"  - {t}\n")
            out.write("\n")

print(f"Pure Python PPTX extraction complete: {out_file}")
