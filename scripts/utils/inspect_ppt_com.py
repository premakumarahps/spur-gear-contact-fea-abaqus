import win32com.client
import os

ppt_app = win32com.client.Dispatch("PowerPoint.Application")
prs_path = os.path.abspath("Simulation presentation.pptx")
pres = ppt_app.Presentations.Open(prs_path, WithWindow=False)

print(f"Presentation: {pres.Name}")
print(f"Slide Width: {pres.PageSetup.SlideWidth} pt ({pres.PageSetup.SlideWidth/72:.2f} in)")
print(f"Slide Height: {pres.PageSetup.SlideHeight} pt ({pres.PageSetup.SlideHeight/72:.2f} in)")
print(f"Total Slides: {pres.Slides.Count}\n")

for i in range(1, pres.Slides.Count + 1):
    slide = pres.Slides(i)
    print(f"=== SLIDE {i} ===")
    print(f"Shapes count: {slide.Shapes.Count}")
    for j in range(1, slide.Shapes.Count + 1):
        s = slide.Shapes(j)
        shape_type = s.Type
        # 1: AutoShape, 13: Picture, 14: Placeholder, 19: Table, 24: SmartArt
        text_snippet = ""
        if s.HasTextFrame and s.TextFrame.HasText:
            text_snippet = s.TextFrame.TextRange.Text.replace('\r', ' ').replace('\n', ' ')[:40]
            font_name = s.TextFrame.TextRange.Font.Name
            font_size = s.TextFrame.TextRange.Font.Size
            print(f"  Shape {j}: Type={shape_type}, Text='{text_snippet}', Font={font_name} ({font_size}pt), Pos=({s.Left:.1f}, {s.Top:.1f}, {s.Width:.1f}, {s.Height:.1f})")
        elif s.HasTable:
            print(f"  Shape {j}: TABLE {s.Table.Rows.Count}x{s.Table.Columns.Count}, Pos=({s.Left:.1f}, {s.Top:.1f}, {s.Width:.1f}, {s.Height:.1f})")
        else:
            print(f"  Shape {j}: Type={shape_type}, Pos=({s.Left:.1f}, {s.Top:.1f}, {s.Width:.1f}, {s.Height:.1f})")

pres.Close()
ppt_app.Quit()
