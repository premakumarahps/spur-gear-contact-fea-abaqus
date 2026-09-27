import os
import subprocess
import shutil

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
video_dirs = [
    os.path.join(base_dir, "web", "public", "videos"),
    os.path.join(base_dir, "media", "videos")
]

videos = [
    "video_01_von_mises_stress_animation_9mm",
    "video_02_displacement_magnitude_animation_9mm",
    "video_03_gear_tooth_contact_interaction_9mm"
]

print("=" * 60)
print("CONVERTING AVI SIMULATION VIDEOS TO WEB-FRIENDLY H.264 MP4")
print("=" * 60)

for vname in videos:
    avi_file = os.path.join(base_dir, "web", "public", "videos", f"{vname}.avi")
    mp4_file = os.path.join(base_dir, "web", "public", "videos", f"{vname}.mp4")
    media_mp4 = os.path.join(base_dir, "media", "videos", f"{vname}.mp4")
    
    if not os.path.exists(avi_file):
        print(f"Warning: {avi_file} does not exist!")
        continue

    print(f"\nProcessing: {vname}.avi -> {vname}.mp4 ...")
    cmd = [
        "ffmpeg", "-y",
        "-i", avi_file,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "20",
        "-preset", "slow",
        "-movflags", "+faststart",
        mp4_file
    ]
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        file_size_mb = os.path.getsize(mp4_file) / (1024 * 1024)
        print(f"  [SUCCESS] Created {mp4_file} ({file_size_mb:.2f} MB)")
        # Copy to media/videos as well
        shutil.copy2(mp4_file, media_mp4)
    else:
        print(f"  [ERROR] ffmpeg failed for {vname}:\n{res.stderr}")

print("\n" + "=" * 60)
print("VIDEO CONVERSION COMPLETE!")
print("=" * 60)
