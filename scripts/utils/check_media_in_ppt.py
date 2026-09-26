import os
import win32com.client

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
pptx_path = os.path.join(base_dir, "Simulation presentation.pptx")
video1_path = os.path.join(base_dir, "web", "public", "videos", "video_01_von_mises_stress_animation_9mm.mp4")
video2_path = os.path.join(base_dir, "web", "public", "videos", "video_02_displacement_magnitude_animation_9mm.mp4")

print(f"Checking video files:")
print(f"  Video 1 exists: {os.path.exists(video1_path)}")
print(f"  Video 2 exists: {os.path.exists(video2_path)}")

ppt = win32com.client.Dispatch("PowerPoint.Application")
try:
    pres = ppt.Presentations.Open(os.path.abspath(pptx_path), WithWindow=False)
    
    # Check Slide 22 (von Mises)
    slide22 = pres.Slides(22)
    print(f"Slide 22 shapes: {slide22.Shapes.Count}")
    
    # Check Slide 23 (Displacement)
    slide23 = pres.Slides(23)
    print(f"Slide 23 shapes: {slide23.Shapes.Count}")

    # Check if media already embedded
    has_media_22 = any(s.Type == 16 for s in slide22.Shapes)
    has_media_23 = any(s.Type == 16 for s in slide23.Shapes)
    print(f"Slide 22 has media: {has_media_22} | Slide 23 has media: {has_media_23}")

    pres.Close()
except Exception as e:
    print(f"Error: {e}")
finally:
    ppt.Quit()
