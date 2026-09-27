import win32com.client
import os

def rgb(r, g, b):
    return r + (g << 8) + (b << 16)

ppt_app = win32com.client.Dispatch("PowerPoint.Application")
prs_path = os.path.abspath("Simulation presentation_backup.pptx")
pres = ppt_app.Presentations.Open(prs_path, WithWindow=False)

# Test adding a slide with blank layout (custom layout 7)
blank_layout = pres.SlideMaster.CustomLayouts(7)
new_slide = pres.Slides.AddSlide(pres.Slides.Count + 1, blank_layout)

# Add Royal Blue banner
# Pos=(55.1, 49.5, 849.8, 62.8)
banner = new_slide.Shapes.AddShape(5, 55.1, 49.5, 849.8, 62.8) # 5 = msoShapeRoundedRectangle
banner.Fill.Solid()
banner.Fill.ForeColor.RGB = rgb(65, 105, 225) # Royal Blue
banner.Line.Visible = False

# Add Title inside banner
tf = banner.TextFrame
tr = tf.TextRange
tr.Text = "Test Slide Title: Contact Formulation"
tr.Font.Name = "Aptos Display"
tr.Font.Size = 36
tr.Font.Bold = True
tr.Font.Color.RGB = rgb(255, 255, 255)

# Add Slide Number
sn_box = new_slide.Shapes.AddTextbox(1, 678.0, 500.5, 216.0, 28.8)
sn_tr = sn_box.TextFrame.TextRange
sn_tr.Text = str(new_slide.SlideIndex)
sn_tr.Font.Name = "Aptos"
sn_tr.Font.Size = 12
sn_tr.Font.Color.RGB = rgb(100, 100, 100)

print(f"Added test slide {new_slide.SlideIndex} successfully!")
pres.Close()
ppt_app.Quit()
