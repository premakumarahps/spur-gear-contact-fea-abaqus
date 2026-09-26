import os
import win32com.client
import sys

ppt_path = os.path.abspath("Simulation presentation.pptx")
print(f"Reading PPT: {ppt_path}")

ppt_app = win32com.client.Dispatch("PowerPoint.Application")
# Open presentation in read-only / hidden mode if possible
prs = ppt_app.Presentations.Open(ppt_path, ReadOnly=True, Untitled=False, WithWindow=False)

out_file = os.path.abspath("output/ppt_inspection.txt")
with open(out_file, "w", encoding="utf-8") as f:
    f.write(f"Presentation: {os.path.basename(ppt_path)}\n")
    f.write(f"Total Slides: {prs.Slides.Count}\n\n")
    
    for i, slide in enumerate(prs.Slides, 1):
        f.write(f"--- SLIDE {i} ---\n")
        for shape in slide.Shapes:
            if shape.HasTextFrame and shape.TextFrame.HasText:
                text = shape.TextFrame.TextRange.Text.strip()
                if text:
                    f.write(f"  [Text]: {text}\n")
        f.write("\n")

prs.Close()
print(f"PPT content saved to {out_file}")
