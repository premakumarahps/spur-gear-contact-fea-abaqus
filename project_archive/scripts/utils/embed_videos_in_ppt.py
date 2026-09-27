import os
import shutil
import win32com.client

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
pptx_path = os.path.join(base_dir, "Simulation presentation.pptx")
video1_path = os.path.join(base_dir, "web", "public", "videos", "video_01_von_mises_stress_animation_9mm.mp4")
video2_path = os.path.join(base_dir, "web", "public", "videos", "video_02_displacement_magnitude_animation_9mm.mp4")

print("=" * 60)
print("EMBEDDING SIMULATION VIDEOS INTO POWERPOINT DECK")
print("=" * 60)

ppt = win32com.client.Dispatch("PowerPoint.Application")
try:
    pres = ppt.Presentations.Open(os.path.abspath(pptx_path), WithWindow=False)
    
    # Slide 22: von Mises Stress video
    slide22 = pres.Slides(22)
    # Check if video shape already exists
    has_v1 = any(s.Name == "FEA_Stress_Video" for s in slide22.Shapes)
    if not has_v1:
        # Add media object: AddMediaObject2(FileName, LinkToFile, SaveWithDocument, Left, Top, Width, Height)
        # Position in a nice view on slide (e.g. left=50, top=140, width=540, height=360)
        try:
            # PowerPoint slide width and height in points
            sl_width = pres.PageSetup.SlideWidth
            sl_height = pres.PageSetup.SlideHeight
            # Place video on the right half or overlay
            # Let's inspect where Picture 5 is on Slide 22
            pic = None
            for s in slide22.Shapes:
                if s.Type == 13: # Picture
                    pic = s
                    break
            
            # Place media with similar dimensions
            left = 400
            top = 130
            width = 520
            height = 340
            if pic:
                left = pic.Left
                top = pic.Top
                width = pic.Width
                height = pic.Height

            v_shape = slide22.Shapes.AddMediaObject2(os.path.abspath(video1_path), False, True, left, top, width, height)
            v_shape.Name = "FEA_Stress_Video"
            print(f"  [SUCCESS] Embedded video 1 on Slide 22 at Left={left}, Top={top}, Width={width}, Height={height}")
        except Exception as e:
            print(f"  Note on Slide 22 AddMediaObject2: {e}")

    # Slide 23: Displacement Magnitude video
    slide23 = pres.Slides(23)
    has_v2 = any(s.Name == "FEA_Disp_Video" for s in slide23.Shapes)
    if not has_v2:
        try:
            pic2 = None
            for s in slide23.Shapes:
                if s.Type == 13: # Picture
                    pic2 = s
                    break
            left = 400
            top = 130
            width = 520
            height = 340
            if pic2:
                left = pic2.Left
                top = pic2.Top
                width = pic2.Width
                height = pic2.Height

            v_shape2 = slide23.Shapes.AddMediaObject2(os.path.abspath(video2_path), False, True, left, top, width, height)
            v_shape2.Name = "FEA_Disp_Video"
            print(f"  [SUCCESS] Embedded video 2 on Slide 23 at Left={left}, Top={top}, Width={width}, Height={height}")
        except Exception as e:
            print(f"  Note on Slide 23 AddMediaObject2: {e}")

    pres.Save()
    pres.Close()
    print("Presentation saved successfully with embedded animations!")

    # Copy updated presentation to web/public
    web_pptx = os.path.join(base_dir, "web", "public", "Simulation presentation.pptx")
    shutil.copy2(pptx_path, web_pptx)
    print(f"Copied updated presentation to {web_pptx}")

except Exception as e:
    print(f"Error: {e}")
finally:
    ppt.Quit()
