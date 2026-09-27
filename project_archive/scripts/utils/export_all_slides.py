import os
import sys
import shutil
import win32com.client

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
pptx_path = os.path.join(base_dir, "Simulation presentation.pptx")
output_dir = os.path.join(base_dir, "output", "slide_previews")
web_public_dir = os.path.join(base_dir, "web", "public", "slide_previews")

os.makedirs(output_dir, exist_ok=True)
os.makedirs(web_public_dir, exist_ok=True)

print("=" * 60)
print("EXPORTING ALL 25 SLIDES VIA POWERPOINT COM AUTOMATION")
print(f"Source PPTX: {pptx_path}")
print("=" * 60)

if not os.path.exists(pptx_path):
    print(f"Error: {pptx_path} not found!")
    sys.exit(1)

ppt_app = win32com.client.Dispatch("PowerPoint.Application")
# ppt_app.Visible = 1

try:
    presentation = ppt_app.Presentations.Open(os.path.abspath(pptx_path), WithWindow=False)
    total_slides = presentation.Slides.Count
    print(f"Presentation opened successfully. Total slides: {total_slides}")

    for i in range(1, total_slides + 1):
        slide = presentation.Slides(i)
        # Export as 1920x1080 PNG
        out_file = os.path.join(output_dir, f"slide_{i}.png")
        web_file = os.path.join(web_public_dir, f"slide_{i}.png")
        
        slide.Export(os.path.abspath(out_file), "PNG", 1920, 1080)
        shutil.copy2(out_file, web_file)
        print(f"  [OK] Exported Slide {i:02d} -> {out_file}")

    presentation.Close()
    print("=" * 60)
    print(f"SUCCESS: ALL {total_slides} SLIDES EXPORTED TO PNG!")
    print("=" * 60)

except Exception as e:
    print(f"Error exporting slides: {e}")
    sys.exit(1)
finally:
    ppt_app.Quit()
