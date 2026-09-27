import win32com.client
import os

ppt_app = win32com.client.Dispatch("PowerPoint.Application")
prs_path = os.path.abspath("Simulation presentation.pptx")
pres = ppt_app.Presentations.Open(prs_path, WithWindow=False)

with open("output/ppt_slides_detailed_structure.txt", "w", encoding="utf-8") as out:
    out.write(f"Presentation: {pres.Name}\n")
    out.write(f"Slide Dimensions: {pres.PageSetup.SlideWidth} x {pres.PageSetup.SlideHeight} pt\n")
    out.write(f"Total Slides: {pres.Slides.Count}\n\n")

    for i in range(1, pres.Slides.Count + 1):
        slide = pres.Slides(i)
        out.write(f"==================================================\n")
        out.write(f"SLIDE {i} (Shapes: {slide.Shapes.Count})\n")
        out.write(f"==================================================\n")
        for j in range(1, slide.Shapes.Count + 1):
            s = slide.Shapes(j)
            txt = ""
            font_info = ""
            if s.HasTextFrame and s.TextFrame.HasText:
                txt = s.TextFrame.TextRange.Text.replace('\r', ' \\n ').replace('\n', ' \\n ')[:100]
                try:
                    font_info = f"Font: {s.TextFrame.TextRange.Font.Name} {s.TextFrame.TextRange.Font.Size}pt"
                except:
                    font_info = "Font: unknown"
            
            fill_info = ""
            try:
                if s.Fill.Type == 1: # solid
                    color_val = s.Fill.ForeColor.RGB
                    r = color_val & 0xFF
                    g = (color_val >> 8) & 0xFF
                    b = (color_val >> 16) & 0xFF
                    fill_info = f"Fill: RGB({r},{g},{b})"
            except:
                pass

            out.write(f"  Shape {j}: Name='{s.Name}', Type={s.Type}, Pos=({s.Left:.1f}, {s.Top:.1f}, {s.Width:.1f}, {s.Height:.1f}) {fill_info}\n")
            if txt:
                out.write(f"     Text: {txt}\n")
                out.write(f"     {font_info}\n")
            if s.HasTable:
                t = s.Table
                out.write(f"     [Table: {t.Rows.Count} rows x {t.Columns.Count} cols]\n")
                for r_idx in range(1, min(t.Rows.Count+1, 8)):
                    row_txt = [t.Cell(r_idx, c_idx).Shape.TextFrame.TextRange.Text.strip() for c_idx in range(1, t.Columns.Count+1)]
                    out.write(f"       Row {r_idx}: {' | '.join(row_txt)}\n")

pres.Close()
ppt_app.Quit()
print("Saved detailed structure to output/ppt_slides_detailed_structure.txt")
