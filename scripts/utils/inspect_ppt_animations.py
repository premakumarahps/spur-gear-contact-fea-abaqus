import win32com.client

ppt = win32com.client.Dispatch("PowerPoint.Application")
pres = ppt.Presentations.Open(r"d:\1.Antigravity Projects\13_Abaqus_Simulation\Simulation presentation.pptx", WithWindow=False)

print(f"Total Slides: {pres.Slides.Count}")
for i in range(1, pres.Slides.Count + 1):
    slide = pres.Slides(i)
    title = ""
    try:
        if slide.Shapes.HasTitle:
            title = slide.Shapes.Title.TextFrame.TextRange.Text.replace("\n", " ").strip()
    except Exception:
        pass
    
    if not title:
        # Check first shape with text
        for s in slide.Shapes:
            if s.HasTextFrame and s.TextFrame.HasText:
                title = s.TextFrame.TextRange.Text.replace("\n", " ").strip()[:50]
                break
                
    anim_count = slide.TimeLine.MainSequence.Count
    media_shapes = []
    for s in slide.Shapes:
        # Type 16 is msoMedia
        if s.Type == 16:
            media_shapes.append(s.Name)
            
    print(f"Slide {i:02d}: \"{title}\" | Shapes={slide.Shapes.Count} | Animations={anim_count} | Media={media_shapes}")

pres.Close()
ppt.Quit()
