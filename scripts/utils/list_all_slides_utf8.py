import sys
import win32com.client

sys.stdout.reconfigure(encoding='utf-8')

ppt = win32com.client.Dispatch("PowerPoint.Application")
pres = ppt.Presentations.Open(r"d:\1.Antigravity Projects\13_Abaqus_Simulation\Simulation presentation.pptx", WithWindow=False)

for i in range(1, pres.Slides.Count + 1):
    slide = pres.Slides(i)
    texts = []
    for s in slide.Shapes:
        if s.HasTextFrame and s.TextFrame.HasText:
            t = s.TextFrame.TextRange.Text.replace("\n", " ").strip()
            if t:
                texts.append(t[:60])
        if s.Type == 16:  # Media
            texts.append(f"[MEDIA/VIDEO: {s.Name}]")
    title = texts[0] if texts else f"Slide {i}"
    anim_count = slide.TimeLine.MainSequence.Count
    print(f"Slide {i:02d}: Title='{title}' | Shapes={slide.Shapes.Count} | Animations={anim_count}")

pres.Close()
ppt.Quit()
