import win32com.client
import os

ppt_app = win32com.client.Dispatch("PowerPoint.Application")
prs_path = os.path.abspath("Simulation presentation.pptx")
pres = ppt_app.Presentations.Open(prs_path, WithWindow=False)

print(f"Current slides: {pres.Slides.Count}")
# Let's check slide layout 12 (blank) or custom layout
custom_layout = pres.SlideMaster.CustomLayouts(7) # blank layout
print(f"Using layout: {custom_layout.Name}")

pres.Close()
ppt_app.Quit()
print("Test completed successfully!")
