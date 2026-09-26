import win32com.client

ppt = win32com.client.Dispatch("PowerPoint.Application")
pres = ppt.Presentations.Open(r"d:\1.Antigravity Projects\13_Abaqus_Simulation\Simulation presentation.pptx", WithWindow=False)

for i in range(14, pres.Slides.Count + 1):
    slide = pres.Slides(i)
    texts = []
    shapes_info = []
    for s in slide.Shapes:
        if s.HasTextFrame and s.TextFrame.HasText:
            t = s.TextFrame.TextRange.Text.replace("\n", " ").strip()
            if t:
                texts.append(t)
        shapes_info.append(f"{s.Name}(Type={s.Type})")
    print(f"\n--- Slide {i:02d} ---")
    print(f"Shapes: {shapes_info}")
    print(f"Texts: {texts[:4]}")

pres.Close()
ppt.Quit()
