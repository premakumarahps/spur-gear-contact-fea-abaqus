import win32com.client
import os

ppt_app = win32com.client.Dispatch("PowerPoint.Application")
prs_path = os.path.abspath("Simulation presentation.pptx")
pres = ppt_app.Presentations.Open(prs_path, WithWindow=False)

preview_dir = os.path.abspath("output/slide_previews")
os.makedirs(preview_dir, exist_ok=True)

print(f"Exporting preview slides from 12 to {pres.Slides.Count}...")
for i in range(12, pres.Slides.Count + 1):
    slide = pres.Slides(i)
    out_file = os.path.join(preview_dir, f"slide_{i}.png")
    slide.Export(out_file, "PNG", 1920, 1080)
    print(f"Exported: slide_{i}.png")

pres.Close()
ppt_app.Quit()
print("Slide export complete!")
