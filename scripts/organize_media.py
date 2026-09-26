import os
import shutil

base_dir = r"d:\1.Antigravity Projects\13_Abaqus_Simulation"
media_dir = os.path.join(base_dir, "media")
screenshots_dir = os.path.join(media_dir, "screenshots")
videos_dir = os.path.join(media_dir, "videos")
results_9mm_dir = os.path.join(media_dir, "results_9mm")
convergence_dir = os.path.join(media_dir, "convergence")

for d in [screenshots_dir, videos_dir, results_9mm_dir, convergence_dir]:
    os.makedirs(d, exist_ok=True)

raw_media = os.path.join(base_dir, "output", "ppt_extracted_images", "ppt", "media")

# Mapping of raw screenshots to clean, web-ready filenames
screenshot_mapping = {
    "Screenshot 2026-09-25 160820.png": "01_abaqus_cae_gear_assembly_viewport.png",
    "Screenshot 2026-09-25 160927.png": "02_assembly_module_model_tree.png",
    "Screenshot 2026-09-25 160959.png": "03_step_manager_static_general_nlgeom.png",
    "Screenshot 2026-09-25 161009.png": "04_step_field_output_requests.png",
    "Screenshot 2026-09-25 161026.png": "05_step_history_output_requests.png",
    "Screenshot 2026-09-25 161113.png": "06_interaction_manager_general_contact.png",
    "Screenshot 2026-09-25 161138.png": "07_contact_property_tangential_friction_0_15.png",
    "Screenshot 2026-09-25 161518.png": "08_contact_property_normal_hard_contact.png",
    "Screenshot 2026-09-25 161704.png": "09_constraint_coupling_gear_bore.png",
    "Screenshot 2026-09-25 161715.png": "10_constraint_coupling_pinion_bore.png",
    "Screenshot 2026-09-25 161813.png": "11_kinematic_coupling_viewport_visualization.png",
    "Screenshot 2026-09-25 161901.png": "12_boundary_condition_gear_pin_support.png",
    "Screenshot 2026-09-25 161917.png": "13_boundary_condition_pinion_fixed_encastre.png",
    "Screenshot 2026-09-25 161932.png": "14_applied_torque_load_494Nm.png",
    "Screenshot 2026-09-25 162015.png": "15_mesh_module_assembly_overview.png",
    "Screenshot 2026-09-25 162446.png": "16_meshed_assembly_c3d10_tetrahedral.png",
    "Screenshot 2026-09-25 162524.png": "17_mesh_global_seeds_sizing_dialog.png",
    "Screenshot 2026-09-25 162800.png": "18_mesh_controls_tet_free_c3d10.png",
    "Screenshot 2026-09-25 162901.png": "19_job_manager_4_convergence_jobs.png",
    "Screenshot 2026-09-25 164650.png": "20_results_9mm_odb_displacement_contour.png",
}

print("Moving and renaming screenshots...")
for src_name, dst_name in screenshot_mapping.items():
    src_path = os.path.join(raw_media, src_name)
    dst_path = os.path.join(screenshots_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied: {src_name} -> media/screenshots/{dst_name}")
    else:
        print(f"Warning: Not found: {src_path}")

video_mapping = {
    "Simul1.avi": "video_01_von_mises_stress_animation_9mm.avi",
    "Simul2.avi": "video_02_displacement_magnitude_animation_9mm.avi",
    "Simul3.avi": "video_03_gear_tooth_contact_interaction_9mm.avi",
}

print("\nMoving and renaming videos...")
for src_name, dst_name in video_mapping.items():
    src_path = os.path.join(raw_media, src_name)
    dst_path = os.path.join(videos_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied: {src_name} -> media/videos/{dst_name}")
    else:
        print(f"Warning: Not found: {src_path}")

# Also populate media/results_9mm with direct result assets
# 1. 9mm displacement contour screenshot
shutil.copy2(os.path.join(screenshots_dir, "20_results_9mm_odb_displacement_contour.png"),
             os.path.join(results_9mm_dir, "odb_9mm_displacement_contour_abaqus_gui.png"))

# 2. 9mm von Mises stress contour (from simul1 last frame)
if os.path.exists(os.path.join(base_dir, "output", "simul1_last_frame_mises.png")):
    shutil.copy2(os.path.join(base_dir, "output", "simul1_last_frame_mises.png"),
                 os.path.join(results_9mm_dir, "odb_9mm_von_mises_contour_abaqus_gui.png"))

# 3. 4-Mesh Convergence Plot
conv_plot_src = os.path.join(base_dir, "output", "final_4_mesh_convergence.png")
if os.path.exists(conv_plot_src):
    shutil.copy2(conv_plot_src, os.path.join(convergence_dir, "4_mesh_convergence_study_plot.png"))

print("\nAll media assets successfully organized into web-ready folders!")
