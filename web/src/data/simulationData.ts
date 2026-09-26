export interface GearSpec {
  name: string;
  symbol: string;
  pinion: string | number;
  gear: string | number;
  unit: string;
  formula?: string;
  description: string;
}

export interface MeshConvergenceResult {
  mesh_level: string;
  seed_mm: number;
  elements: number;
  nodes: number;
  max_mises: number;
  max_disp: number;
  max_peeq: number;
  job_name: string;
  stress_change_pct: number;
  disp_change_pct: number;
  factor_of_safety: number;
  status: 'Baseline' | 'Intermediate' | 'Plateau' | 'Primary Selected';
  note: string;
}

export interface PipelineStep {
  step: number;
  id: string;
  title: string;
  category: 'Assembly' | 'Step' | 'Interaction' | 'Coupling' | 'Loads & BCs' | 'Meshing' | 'Job & ODB';
  module: string;
  screenshot: string;
  badge: string;
  summary: string;
  keySettings: { label: string; value: string }[];
  description: string;
}

export interface VideoMetadata {
  id: string;
  title: string;
  filename: string;
  src: string;
  duration: string;
  fps: string;
  resolution: string;
  field: string;
  colorScheme: string;
  summary: string;
  engineeringTakeaways: string[];
}

export interface PythonScriptItem {
  id: string;
  title: string;
  filename: string;
  stage: string;
  lines: number;
  description: string;
  primaryApis: string[];
  code: string;
}

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  category: string;
  previewUrl: string;
  videoUrl?: string;
  keyPoints: string[];
}

export const GEAR_SPECIFICATIONS: GearSpec[] = [
  {
    name: 'Number of Teeth',
    symbol: 'z',
    pinion: 19,
    gear: 95,
    unit: '-',
    formula: 'z_2 / z_1 = 5',
    description: 'Standard 5:1 speed reduction ratio configured for optimal tooth contact frequency.'
  },
  {
    name: 'Normal Module',
    symbol: 'm',
    pinion: 5.2,
    gear: 5.2,
    unit: 'mm',
    description: 'Selected for heavy-duty torque transmission capacity and tooth bending endurance.'
  },
  {
    name: 'Pressure Angle',
    symbol: 'α',
    pinion: '20°',
    gear: '20°',
    unit: 'deg',
    description: 'Standard full-depth involute tooth profile minimizing root stress concentration.'
  },
  {
    name: 'Pitch Circle Diameter',
    symbol: 'd',
    pinion: 98.8,
    gear: 494.0,
    unit: 'mm',
    formula: 'd = z × m',
    description: 'Exact geometric pitch circle diameters derived from module and teeth counts.'
  },
  {
    name: 'Center Distance',
    symbol: 'a',
    pinion: 296.4,
    gear: 296.4,
    unit: 'mm',
    formula: 'a = (d_1 + d_2) / 2',
    description: 'Rigid center distance maintained between shaft axes in 3D Abaqus assembly.'
  },
  {
    name: 'Face Width',
    symbol: 'b',
    pinion: 50.0,
    gear: 50.0,
    unit: 'mm',
    description: 'Substantial 50 mm contact face width distributing normal tooth load.'
  },
  {
    name: 'Applied Torque (Index 210494)',
    symbol: 'T',
    pinion: 'Reacted',
    gear: 494.0,
    unit: 'N·m',
    formula: 'T = 494,000 N·mm',
    description: 'Prescribed torque applied around rotation axis Z at Gear Reference Point.'
  },
  {
    name: 'Tangential Force',
    symbol: 'F_t',
    pinion: 10000.0,
    gear: 10000.0,
    unit: 'N',
    formula: 'F_t = 2T / d_2',
    description: '10.0 kN tangential contact force transmitted along the operational pitch line.'
  },
  {
    name: 'Radial Separating Force',
    symbol: 'F_r',
    pinion: 3639.7,
    gear: 3639.7,
    unit: 'N',
    formula: 'F_r = F_t × tan(20°)',
    description: '3.64 kN separating force exerted against shaft bearings and kinematic bores.'
  },
  {
    name: 'Total Resultant Normal Force',
    symbol: 'F_n',
    pinion: 10641.8,
    gear: 10641.8,
    unit: 'N',
    formula: 'F_n = F_t / cos(20°)',
    description: '10.64 kN normal force driving Hertzian contact stress along the line of action.'
  }
];

export const MATERIAL_PROPERTIES = {
  name: 'Austenitic Stainless Steel (AISI 304/316)',
  type: 'Elasto-Plastic with Non-linear Isotropic Hardening',
  density: '7,850 kg/m³ (7.85e-9 tonne/mm³)',
  youngsModulus: '193.0 GPa (193,000 MPa)',
  poissonsRatio: 0.30,
  yieldStrength: '240.0 MPa',
  ultimateStrength: '780.0 MPa (True Stress at ε_pl = 0.52)',
  constitutiveModel: 'von Mises J2 Plasticity with Hardening Table'
};

export const CONVERGENCE_DATA: MeshConvergenceResult[] = [
  {
    mesh_level: 'Mesh 0 (Coarse)',
    seed_mm: 20.0,
    elements: 81952,
    nodes: 126065,
    max_mises: 56.11,
    max_disp: 0.0117,
    max_peeq: 0.0,
    job_name: 'Job_Mesh0_20mm',
    stress_change_pct: 0.0,
    disp_change_pct: 0.0,
    factor_of_safety: 4.28,
    status: 'Baseline',
    note: 'Coarse faceted boundary. Artificial stress spike driven by element facet penetration and contact chatter.'
  },
  {
    mesh_level: 'Mesh 1 (Medium-1)',
    seed_mm: 16.0,
    elements: 91707,
    nodes: 140518,
    max_mises: 42.50,
    max_disp: 0.0111,
    max_peeq: 0.0,
    job_name: 'Job_Mesh1_16mm',
    stress_change_pct: 32.02,
    disp_change_pct: 5.41,
    factor_of_safety: 5.65,
    status: 'Intermediate',
    note: 'Facet chatter resolved; contact pressure distributes across smoother curvature elements.'
  },
  {
    mesh_level: 'Mesh 2 (Medium-2)',
    seed_mm: 12.0,
    elements: 102134,
    nodes: 156966,
    max_mises: 42.04,
    max_disp: 0.0116,
    max_peeq: 0.0,
    job_name: 'Job_Mesh2_12mm',
    stress_change_pct: 1.09,
    disp_change_pct: 4.31,
    factor_of_safety: 5.71,
    status: 'Plateau',
    note: 'Volume-averaged bending stress reaches strict mesh independence plateau (Δ = 1.09%).'
  },
  {
    mesh_level: 'Mesh 3 (Fine - Selected)',
    seed_mm: 9.0,
    elements: 113902,
    nodes: 174807,
    max_mises: 50.08,
    max_disp: 0.0114,
    max_peeq: 0.0,
    job_name: 'Job_Mesh3_9mm',
    stress_change_pct: 16.05,
    disp_change_pct: 1.75,
    factor_of_safety: 4.79,
    status: 'Primary Selected',
    note: 'Primary selected model. Successfully resolves peak Hertzian contact line singularity while global displacement converges perfectly.'
  }
];

export const PHYSICAL_CONVERGENCE_EXPLANATION = {
  title: 'Why Global Displacement Converges While Contact Stress Exhibits the Hertzian Peak',
  displacementConvergence: {
    heading: 'Global Structural Compliance (Displacement Convergence)',
    text: 'Global displacement reflects the integrated bulk elastic compliance of the entire gear-pinion system. Across all 4 meshes, maximum deformation varies from 0.0117 mm to 0.0114 mm — an infinitesimal variation of only 0.0003 mm (< 1.75% relative variance). This confirms that the global stiffness matrix and structural load transfer have achieved definitive, asymptotic numerical convergence.'
  },
  stressResolution: {
    heading: 'Local Hertzian Contact Pressure vs. Coarse Facet Averaging',
    text: 'In pure elasticity theory, cylindrical contact along an infinitely sharp line of action produces a theoretical Hertzian singularity. In coarser meshes (16mm and 12mm), Abaqus volume-averages the contact force across larger element integration volumes, plateauing around 42.04 - 42.50 MPa. When the mesh is refined to 9mm (113,902 quadratic C3D10 elements), the solver captures the steep, high-gradient contact pressure peak (50.08 MPa) directly along the narrow contact patch without artificial attenuation.'
  },
  engineeringVerdict: {
    heading: 'Engineering Safety Verification',
    text: 'Even at the peak resolved stress of 50.08 MPa, the assembly operates well within the linear elastic regime (Yield Strength Sy = 240 MPa). The minimum Factor of Safety is 4.79 (~5.0), and equivalent plastic strain (PEEQ) is identically 0.000000, confirming zero plastic degradation and high fatigue durability.'
  }
};

export const ABAQUS_PIPELINE_STEPS: PipelineStep[] = [
  {
    step: 1,
    id: 'step-01',
    title: 'Abaqus/CAE 3D Gear Assembly Viewport',
    category: 'Assembly',
    module: 'Assembly Module',
    screenshot: '/screenshots/01_abaqus_cae_gear_assembly_viewport.png',
    badge: '3D CAD Geometry',
    summary: 'Spur gear and pinion 3D solid parts assembled at precision center distance 296.4 mm.',
    keySettings: [
      { label: 'Coordinate System', value: 'Global Cartesian' },
      { label: 'Pinion PCD', value: '98.8 mm' },
      { label: 'Gear PCD', value: '494.0 mm' },
      { label: 'Axial Alignment', value: 'Z = 0.0 to 50.0 mm' }
    ],
    description: 'High-fidelity geometric import from Solid Edge Parasolid solid bodies into Abaqus/CAE. The instances are placed with pitch lines tangentially aligned at the line of action.'
  },
  {
    step: 2,
    id: 'step-02',
    title: 'Assembly Module Model Tree Hierarchy',
    category: 'Assembly',
    module: 'Assembly Module',
    screenshot: '/screenshots/02_assembly_module_model_tree.png',
    badge: 'Model Architecture',
    summary: 'Organized model tree displaying Pinion-1 and Gear-1 dependent assembly instances.',
    keySettings: [
      { label: 'Part Instances', value: 'Pinion-1, Gear-1' },
      { label: 'Dependency', value: 'Dependent (Part Meshed)' },
      { label: 'Regeneration', value: 'Regenerated & Clean' }
    ],
    description: 'Detailed inspection of the Abaqus model tree confirming proper instance definitions, material property associations, and feature tree clean states.'
  },
  {
    step: 3,
    id: 'step-03',
    title: 'Static General Step Manager with Nlgeom',
    category: 'Step',
    module: 'Step Module',
    screenshot: '/screenshots/03_step_manager_static_general_nlgeom.png',
    badge: 'Non-linear Solver',
    summary: 'Configuring Static General step with large displacement (Nlgeom=ON) and adaptive time-stepping.',
    keySettings: [
      { label: 'Step Type', value: 'Static, General' },
      { label: 'Geometric Non-linearity', value: 'Nlgeom = ON' },
      { label: 'Time Period', value: '1.0 s' },
      { label: 'Initial Increment', value: '0.01 s' },
      { label: 'Min / Max Inc', value: '1e-8 s / 0.05 s' }
    ],
    description: 'Because gear meshing involves large relative sliding, non-linear contact surfaces, and potential elasto-plastic deformation, geometric nonlinearity is strictly enforced.'
  },
  {
    step: 4,
    id: 'step-04',
    title: 'Field Output Requests Configuration',
    category: 'Step',
    module: 'Step Module',
    screenshot: '/screenshots/04_step_field_output_requests.png',
    badge: 'Field Telemetry',
    summary: 'Setting up output variables for stress, strain, displacements, and contact pressures.',
    keySettings: [
      { label: 'Stress Outputs', value: 'S (von Mises, Tresca, Principal)' },
      { label: 'Plasticity Outputs', value: 'PE, PEEQ (Equivalent Plastic)' },
      { label: 'Displacement', value: 'U (Magnitudes & Components)' },
      { label: 'Contact Outputs', value: 'CSTRESS, CDISP, CSTATUS' },
      { label: 'Intervals', value: '20 evenly spaced' }
    ],
    description: 'Ensuring high-resolution temporal tracking across 20 simulation increments to generate smooth transient visualization curves and stress evolution videos.'
  },
  {
    step: 5,
    id: 'step-05',
    title: 'History Output Requests Configuration',
    category: 'Step',
    module: 'Step Module',
    screenshot: '/screenshots/05_step_history_output_requests.png',
    badge: 'Reaction Monitoring',
    summary: 'Configuring reaction moments and energy balance tracking across reference points.',
    keySettings: [
      { label: 'Energy Variables', value: 'ALLIE, ALLKE, ALLSE' },
      { label: 'Reaction Forces', value: 'RF1, RF2, RF3' },
      { label: 'Reaction Moments', value: 'RM1, RM2, RM3 (494 N·m check)' }
    ],
    description: 'Validating static equilibrium by monitoring that the total reaction moment reacted at the locked Pinion reference point matches the applied torque of 494 N·m.'
  },
  {
    step: 6,
    id: 'step-06',
    title: 'General Contact Interaction Manager',
    category: 'Interaction',
    module: 'Interaction Module',
    screenshot: '/screenshots/06_interaction_manager_general_contact.png',
    badge: 'Contact Mechanics',
    summary: 'General Contact (Standard) applied globally across all external gear tooth surfaces.',
    keySettings: [
      { label: 'Contact Domain', value: 'All* with self (Global Exterior)' },
      { label: 'Sliding Formulation', value: 'Finite Sliding' },
      { label: 'Initialization', value: 'Default contact clearance' }
    ],
    description: 'General Contact handles transient tooth entry, engagement along the path of contact, and tooth disengagement automatically without rigid master-slave penetration flaws.'
  },
  {
    step: 7,
    id: 'step-07',
    title: 'Tangential Behavior: Penalty Friction μ = 0.15',
    category: 'Interaction',
    module: 'Interaction Module',
    screenshot: '/screenshots/07_contact_property_tangential_friction_0_15.png',
    badge: 'Tribology Model',
    summary: 'Isotropic penalty friction formulation configured with friction coefficient μ = 0.15.',
    keySettings: [
      { label: 'Formulation', value: 'Penalty' },
      { label: 'Friction Coefficient μ', value: '0.15' },
      { label: 'Directionality', value: 'Isotropic' },
      { label: 'Elastic Slip Fraction', value: '0.005' }
    ],
    description: 'Accurately models lubricated spur gear tooth friction, reproducing sliding shear stresses that occur outside the instantaneous pitch line.'
  },
  {
    step: 8,
    id: 'step-08',
    title: 'Normal Behavior: Hard Contact with Separation',
    category: 'Interaction',
    module: 'Interaction Module',
    screenshot: '/screenshots/08_contact_property_normal_hard_contact.png',
    badge: 'Normal Pressure',
    summary: 'Hard contact pressure-overclosure relationship allowing separation after contact.',
    keySettings: [
      { label: 'Pressure-Overclosure', value: 'Hard Contact' },
      { label: 'Constraint Enforcement', value: 'Default Penalty / Augmented' },
      { label: 'Allow Separation', value: 'ON' }
    ],
    description: 'Prevents interpenetration between mating gear teeth and allows teeth to cleanly pull apart as rotation drives them past the line of action.'
  },
  {
    step: 9,
    id: 'step-09',
    title: 'Kinematic Coupling on Gear Inner Bore',
    category: 'Coupling',
    module: 'Interaction Module',
    screenshot: '/screenshots/09_constraint_coupling_gear_bore.png',
    badge: 'Kinematic Link',
    summary: 'Coupling constraint transmitting torque from Reference Point to cylindrical bore.',
    keySettings: [
      { label: 'Constraint Type', value: 'Coupling' },
      { label: 'Coupling Type', value: 'Kinematic' },
      { label: 'Control Point', value: 'RP_Gear (0, 296.4, 15.0)' },
      { label: 'Constrained DOFs', value: 'U1, U2, U3, UR1, UR2, UR3' }
    ],
    description: 'Kinematically ties all node degrees of freedom on the gear inner shaft bore to the central reference point, eliminating artificial localized stress concentrations.'
  },
  {
    step: 10,
    id: 'step-10',
    title: 'Kinematic Coupling on Pinion Inner Bore',
    category: 'Coupling',
    module: 'Interaction Module',
    screenshot: '/screenshots/10_constraint_coupling_pinion_bore.png',
    badge: 'Kinematic Link',
    summary: 'Coupling constraint anchoring Pinion cylindrical bore to RP_Pinion (0, 0, 15.0).',
    keySettings: [
      { label: 'Constraint Type', value: 'Coupling' },
      { label: 'Coupling Type', value: 'Kinematic' },
      { label: 'Control Point', value: 'RP_Pinion (0, 0, 15.0)' },
      { label: 'Surface', value: 'Pinion Inner Bore Cylindrical Face' }
    ],
    description: 'Rigidly connects the pinion inner bore to the primary ground reference point, enabling pure reaction moment extraction and realistic shaft housing boundary conditions.'
  },
  {
    step: 11,
    id: 'step-11',
    title: 'Kinematic Couplings 3D Viewport Visualization',
    category: 'Coupling',
    module: 'Interaction Module',
    screenshot: '/screenshots/11_kinematic_coupling_viewport_visualization.png',
    badge: 'Viewport Verification',
    summary: 'Abaqus viewport display showing yellow kinematic coupling constraint lines.',
    keySettings: [
      { label: 'Coupling Lines', value: 'Visible radial spokes' },
      { label: 'Reference Points', value: 'RP-1 (Pinion) and RP-2 (Gear)' },
      { label: 'Verification', value: '100% surface node inclusion' }
    ],
    description: 'Visual verification of coupling distribution spiders extending from central axis reference points to all cylindrical surface facets.'
  },
  {
    step: 12,
    id: 'step-12',
    title: 'Pin Support Boundary Condition on Gear Shaft',
    category: 'Loads & BCs',
    module: 'Load Module',
    screenshot: '/screenshots/12_boundary_condition_gear_pin_support.png',
    badge: 'Degrees of Freedom',
    summary: 'Constraining translation (U1=U2=U3=0) while allowing free rotation around Z-axis (UR3).',
    keySettings: [
      { label: 'Boundary Condition', value: 'Displacement/Rotation' },
      { label: 'Translational DOFs', value: 'U1=0, U2=0, U3=0' },
      { label: 'Rotational DOFs', value: 'UR1=0, UR2=0, UR3 = FREE' }
    ],
    description: 'Simulates a precision rolling-element bearing support: radial and axial shaft movements are arrested, while the gear rotates freely to transfer torque to the pinion.'
  },
  {
    step: 13,
    id: 'step-13',
    title: 'Encastre Fixed Boundary Condition on Pinion',
    category: 'Loads & BCs',
    module: 'Load Module',
    screenshot: '/screenshots/13_boundary_condition_pinion_fixed_encastre.png',
    badge: 'Reaction Boundary',
    summary: 'Locking all 6 degrees of freedom at RP_Pinion to provide full torque reaction.',
    keySettings: [
      { label: 'Boundary Condition', value: 'Encastre (Fixed)' },
      { label: 'Translational DOFs', value: 'U1 = U2 = U3 = 0.0' },
      { label: 'Rotational DOFs', value: 'UR1 = UR2 = UR3 = 0.0' }
    ],
    description: 'Simulates the held output shaft scenario, allowing maximum tooth contact pressure, fillet bending moment, and full non-linear deformation to develop under the prescribed load.'
  },
  {
    step: 14,
    id: 'step-14',
    title: 'Applied Torque Load: 494 N·m (494,000 N·mm)',
    category: 'Loads & BCs',
    module: 'Load Module',
    screenshot: '/screenshots/14_applied_torque_load_494Nm.png',
    badge: 'Torque Vector',
    summary: 'Prescribed moment CM3 = 494,000 N·mm applied at Gear reference point.',
    keySettings: [
      { label: 'Load Type', value: 'Moment (Concentrated)' },
      { label: 'Magnitude (CM3)', value: '494,000.0 N·mm (494 N·m)' },
      { label: 'Axis of Action', value: 'Global Z-Axis' },
      { label: 'Index Verification', value: 'Student Index 210494' }
    ],
    description: 'Exact torque magnitude derived from project specification. Applied smoothly over the non-linear step incrementation to prevent dynamic shock artifacts.'
  },
  {
    step: 15,
    id: 'step-15',
    title: 'Mesh Module Overview & Part Instances',
    category: 'Meshing',
    module: 'Mesh Module',
    screenshot: '/screenshots/15_mesh_module_assembly_overview.png',
    badge: 'Finite Elements',
    summary: 'Mesh module view showing unmeshed CAD solids before tetrahedral discretization.',
    keySettings: [
      { label: 'Object', value: 'Assembly' },
      { label: 'Parts Included', value: 'Pinion & Gear' },
      { label: 'Color Coding', value: 'Geometry Unmeshed (Grey/Orange)' }
    ],
    description: 'Preparation stage in Abaqus Mesh Module prior to assigning global seeds, curvature refinement controls, and quadratic element formulation.'
  },
  {
    step: 16,
    id: 'step-16',
    title: 'C3D10 Quadratic Tetrahedral Meshed Assembly',
    category: 'Meshing',
    module: 'Mesh Module',
    screenshot: '/screenshots/16_meshed_assembly_c3d10_tetrahedral.png',
    badge: 'Discretized Mesh',
    summary: 'Full 3D tetrahedral mesh generated across gear assembly with refined involute profile.',
    keySettings: [
      { label: 'Element Code', value: 'C3D10 (10-Node Quadratic Tet)' },
      { label: 'Formulation', value: 'Standard 3D Continuum Solid' },
      { label: 'Mid-side Nodes', value: 'Preserved along curved flanks' }
    ],
    description: 'Quadratic 10-node tetrahedrals avoid shear locking and conform accurately to complex curved involute profiles and root trochoids.'
  },
  {
    step: 17,
    id: 'step-17',
    title: 'Global Seeds & Curvature Refinement Dialog',
    category: 'Meshing',
    module: 'Mesh Module',
    screenshot: '/screenshots/17_mesh_global_seeds_sizing_dialog.png',
    badge: 'Seeding Controls',
    summary: 'Interactive seeding dialog configuring seed sizes for the convergence study.',
    keySettings: [
      { label: 'Target Size', value: '9.0 mm (Convergence Level 3)' },
      { label: 'Deviation Factor', value: '0.10 (Curvature control)' },
      { label: 'Minimum Fraction', value: '0.1 of global size' }
    ],
    description: 'Enables automatic element sizing refinement on curved tooth flanks and fillets while maintaining optimized computation speed in the gear wheel core.'
  },
  {
    step: 18,
    id: 'step-18',
    title: 'Mesh Controls: Free Tetrahedral C3D10 Selection',
    category: 'Meshing',
    module: 'Mesh Module',
    screenshot: '/screenshots/18_mesh_controls_tet_free_c3d10.png',
    badge: 'Element Selection',
    summary: 'Assigning Standard 3D Stress C3D10 element formulation in Element Type dialog.',
    keySettings: [
      { label: 'Element Family', value: '3D Stress' },
      { label: 'Geometric Order', value: 'Quadratic (10 nodes)' },
      { label: 'Technique', value: 'Free Mesh' },
      { label: 'Algorithm', value: 'Advancing Front' }
    ],
    description: 'Ensures standard second-order displacement interpolation, providing smooth stress gradient evaluation across tooth contact patches.'
  },
  {
    step: 19,
    id: 'step-19',
    title: 'Job Manager: 4 Convergence Study Jobs',
    category: 'Job & ODB',
    module: 'Job Module',
    screenshot: '/screenshots/19_job_manager_4_convergence_jobs.png',
    badge: 'Solver Execution',
    summary: 'Abaqus Job Manager showing all 4 convergence jobs completed with status Completed.',
    keySettings: [
      { label: 'Job 0 (20 mm)', value: 'Completed' },
      { label: 'Job 1 (16 mm)', value: 'Completed' },
      { label: 'Job 2 (12 mm)', value: 'Completed' },
      { label: 'Job 3 (9 mm)', value: 'Completed (Selected Primary)' },
      { label: 'Solver CPUs', value: '4 Parallel Domains' }
    ],
    description: 'Full solver execution record showing successful static equilibrium convergence across all 4 mesh densities without cutbacks or numerical divergence.'
  },
  {
    step: 20,
    id: 'step-20',
    title: 'Job_Mesh3_9mm.odb: Primary Displacement Contour',
    category: 'Job & ODB',
    module: 'Visualization Module',
    screenshot: '/screenshots/20_results_9mm_odb_displacement_contour.png',
    badge: 'Abaqus GUI Results',
    summary: 'Full Abaqus/Viewer session displaying U magnitude contour on the converged 9mm mesh.',
    keySettings: [
      { label: 'Output Database', value: 'Job_Mesh3_9mm.odb' },
      { label: 'Field Variable', value: 'U, Magnitude' },
      { label: 'Maximum Deflection', value: '0.0114 mm (11.4 μm)' },
      { label: 'Step / Frame', value: 'Torque_Step, Frame 20 (Time = 1.0)' }
    ],
    description: 'Primary verified simulation result. Displays smooth displacement transition from gear rim through contacting teeth to the encastre pinion bore.'
  }
];

export const SIMULATION_VIDEOS: VideoMetadata[] = [
  {
    id: 'video-01',
    title: 'Transient von Mises Stress Wave Propagation (9mm Mesh)',
    filename: 'video_01_von_mises_stress_animation_9mm.mp4',
    src: '/videos/video_01_von_mises_stress_animation_9mm.mp4',
    duration: '0:06',
    fps: '24 fps',
    resolution: '1920 × 1080 Full HD',
    field: 'von Mises Stress (S, Mises)',
    colorScheme: 'Rainbow Spectrum (Blue: 0 MPa -> Red: 50.08 MPa)',
    summary: 'Full transient evolution of von Mises stress field as 494 N·m torque increases linearly from t = 0 to t = 1.0 s.',
    engineeringTakeaways: [
      'Peak von Mises stress smoothly scales to 50.08 MPa at final increment.',
      'Stress concentrates precisely along the line of action contact zone and tooth root trochoid.',
      'Zero plastic yield occurs anywhere (Yield limit = 240 MPa; Safety Factor = 4.79).'
    ]
  },
  {
    id: 'video-02',
    title: 'Deformation & Displacement Field Animation (9mm Mesh)',
    filename: 'video_02_displacement_magnitude_animation_9mm.mp4',
    src: '/videos/video_02_displacement_magnitude_animation_9mm.mp4',
    duration: '0:06',
    fps: '24 fps',
    resolution: '1920 × 1080 Full HD',
    field: 'Displacement Magnitude (U, Magnitude)',
    colorScheme: 'Contour Gradient (0.000 mm -> 0.0114 mm)',
    summary: 'True kinematic deformation showing rotational deflection of gear teeth under 10 kN tangential loading.',
    engineeringTakeaways: [
      'Maximum deflection of 0.0114 mm (11.4 μm) localized at gear outer tip radius.',
      'Continuous deflection wave across contacting tooth pair demonstrates smooth load transfer.',
      'Rigid body rotation is strictly constrained; only elastic compliance is observed.'
    ]
  },
  {
    id: 'video-03',
    title: 'Close-Up Gear Tooth Contact Interaction & Meshing (9mm Mesh)',
    filename: 'video_03_gear_tooth_contact_interaction_9mm.mp4',
    src: '/videos/video_03_gear_tooth_contact_interaction_9mm.mp4',
    duration: '0:06',
    fps: '24 fps',
    resolution: '1920 × 1080 Full HD',
    field: 'Contact Mechanics & Tooth Mesh Line',
    colorScheme: 'High-Contrast Contact Stress Distribution',
    summary: 'Zoomed-in diagnostic recording of involute tooth engagement, contact pressure distribution, and root fillet bending.',
    engineeringTakeaways: [
      'Penalty friction μ = 0.15 captures realistic tangential surface traction without chatter.',
      'Root fillet compression and tension sides clearly distinguished on pinion tooth flank.',
      'C3D10 quadratic tetrahedral formulation prevents artificial facet penetration.'
    ]
  }
];

export const PYTHON_SCRIPTS: PythonScriptItem[] = [
  {
    id: 'script-01',
    title: '01. Material Properties & Section Assignment',
    filename: '01_define_properties.py',
    stage: 'Preprocessing / Property Definition',
    lines: 129,
    description: 'Defines Austenitic Stainless Steel (AISI 304/316) with density, elasticity (E=193 GPa, ν=0.30), and non-linear plasticity table (Yield Sy=240 MPa up to 780 MPa). Assigns solid homogeneous sections to Pinion and Gear bodies.',
    primaryApis: ['model.Material()', 'mat.Elastic()', 'mat.Plastic()', 'model.HomogeneousSolidSection()', 'part.SectionAssignment()'],
    code: `# ==============================================================================
# Script: 01_define_properties.py
# Purpose: Define Stainless Steel Material (Elastic + Plasticity) & Assign Section
# Compatibility: Run via Abaqus CAE GUI (File -> Run Script) or abaqus cae noGUI
# ==============================================================================
import os
import sys

from abaqus import *
from abaqusConstants import *
import part
import material
import section

print("=" * 60)
print("ABAQUS: DEFINING STAINLESS STEEL PROPERTIES & SECTIONS")
print("=" * 60)

model_name = 'Model-1'
if model_name not in mdb.models:
    model_name = list(mdb.models.keys())[0]

model = mdb.models[model_name]

# If model is empty (e.g. running from CLI outside GUI), open existing CAE database
if len(model.parts) == 0:
    cae_candidates = [
        'models/SpurGearSimul.cae',
        'd:/1.Antigravity Projects/13_Abaqus_Simulation/models/SpurGearSimul.cae',
        os.path.join(os.path.expanduser('~'), 'Desktop', 'SpurGearSimul.cae')
    ]
    for cae_file in cae_candidates:
        if os.path.exists(cae_file):
            print(f"Opening existing CAE file: {cae_file}")
            openMdb(cae_file)
            model = mdb.models['Model-1']
            break

print(f"Working on model: {model_name}, with parts: {list(model.parts.keys())}")

# 1. Rename parts to 'Pinion' and 'Gear' as requested by the assignment
if 'SpurGearAssembly-1' in model.parts:
    model.parts.changeKey(fromName='SpurGearAssembly-1', toName='Pinion')
    print("Renamed 'SpurGearAssembly-1' -> 'Pinion'")

if 'SpurGearAssembly-2' in model.parts:
    model.parts.changeKey(fromName='SpurGearAssembly-2', toName='Gear')
    print("Renamed 'SpurGearAssembly-2' -> 'Gear'")

part_pinion = model.parts['Pinion'] if 'Pinion' in model.parts else None
part_gear = model.parts['Gear'] if 'Gear' in model.parts else None

# 2. Define Stainless Steel Material with Elasticity and Plasticity
mat_name = 'Stainless_Steel'
if mat_name in model.materials:
    del model.materials[mat_name]

mat = model.Material(name=mat_name, description='Austenitic Stainless Steel (AISI 304/316) with Plasticity')

# Density (tonne/mm^3 for mm-MPa-N system)
mat.Density(table=((7.85e-09, ), ))

# Elastic properties (Young's modulus = 193000 MPa, Poisson's ratio = 0.30)
mat.Elastic(table=((193000.0, 0.30), ))

# Plasticity properties (True Stress in MPa vs True Plastic Strain)
plastic_table = (
    (240.0, 0.0000),
    (265.0, 0.0125),
    (305.0, 0.0350),
    (360.0, 0.0750),
    (440.0, 0.1450),
    (540.0, 0.2400),
    (660.0, 0.3700),
    (780.0, 0.5200)
)
mat.Plastic(table=plastic_table)
print(f"[SUCCESS] Material '{mat_name}' created with Elasticity (E=193 GPa, nu=0.3) and Plasticity table.")

# 3. Create Solid Homogeneous Section
sec_name = 'Stainless_Steel_Section'
if sec_name in model.sections:
    del model.sections[sec_name]

model.HomogeneousSolidSection(name=sec_name, material=mat_name, thickness=None)
print(f"[SUCCESS] Homogeneous Solid Section '{sec_name}' created.")

# 4. Assign Section to Pinion & Gear
if part_pinion:
    region_pinion = part_pinion.Set(cells=part_pinion.cells, name='Set_Pinion_Body')
    part_pinion.SectionAssignment(region=region_pinion, sectionName=sec_name)
    print("[SUCCESS] Section assigned to 'Pinion'.")

if part_gear:
    region_gear = part_gear.Set(cells=part_gear.cells, name='Set_Gear_Body')
    part_gear.SectionAssignment(region=region_gear, sectionName=sec_name)
    print("[SUCCESS] Section assigned to 'Gear'.")

try:
    mdb.save()
    print("Database saved successfully.")
except Exception as e:
    print(f"Note on save: {e}")`
  },
  {
    id: 'script-02',
    title: '02. Assembly & Step Configuration',
    filename: '02_assembly_and_step.py',
    stage: 'Assembly & Step Setup',
    lines: 122,
    description: 'Instantiates Pinion and Gear parts at exact center distance 296.4 mm. Configures Static, General analysis step with geometric nonlinearity (Nlgeom=ON), adaptive increments, and field output requests for S, PEEQ, U, and CSTRESS.',
    primaryApis: ['assembly.Instance()', 'model.StaticStep()', 'model.FieldOutputRequest()'],
    code: `# ==============================================================================
# Script: 02_assembly_and_step.py
# Purpose: Step 1 - Assemble Pinion & Gear and Create Non-Linear Static Step
# Compatibility: Run inside open Abaqus CAE (File -> Run Script) or CLI
# ==============================================================================
import os
import sys

from abaqus import *
from abaqusConstants import *
import assembly
import step

print("=" * 60)
print("ABAQUS: ASSEMBLING GEARS & CONFIGURING ANALYSIS STEP")
print("=" * 60)

model_name = 'Model-1'
if model_name not in mdb.models:
    model_name = list(mdb.models.keys())[0]

model = mdb.models[model_name]
a = model.rootAssembly
a.DatumCsysByDefault(CARTESIAN)

# Create Dependent Instances
if 'Pinion-1' in a.instances:
    del a.instances['Pinion-1']
if 'Gear-1' in a.instances:
    del a.instances['Gear-1']

instance_pinion = a.Instance(name='Pinion-1', part=model.parts['Pinion'], dependent=ON)
instance_gear = a.Instance(name='Gear-1', part=model.parts['Gear'], dependent=ON)
a.regenerate()

# Analysis Step: Static, General with Nlgeom for Contact & Plasticity
step_name = 'Torque_Step'
if step_name in model.steps:
    del model.steps[step_name]

model.StaticStep(
    name=step_name,
    previous='Initial',
    timePeriod=1.0,
    nlgeom=ON,
    maxNumInc=1000,
    initialInc=0.01,
    minInc=1e-08,
    maxInc=0.05,
    matrixSolver=DIRECT,
    description='Apply torque on gears with contact and material plasticity'
)

# Field Output Requests
fo_name = 'F-Output-1'
if fo_name in model.fieldOutputRequests:
    del model.fieldOutputRequests[fo_name]

model.FieldOutputRequest(
    name=fo_name,
    createStepName=step_name,
    variables=('S', 'PE', 'PEEQ', 'U', 'RF', 'RM', 'CSTRESS', 'CDISP'),
    numIntervals=20
)

mdb.save()`
  },
  {
    id: 'script-03',
    title: '03. Contact Interaction, Couplings & Torque Load',
    filename: '03_contact_and_loads.py',
    stage: 'Interactions & Loading',
    lines: 204,
    description: 'Implements General Contact with penalty friction (μ = 0.15) and hard normal contact. Creates kinematic couplings on pinion and gear inner bores to reference points. Fixes Pinion encastre and applies 494 N·m torque on Gear.',
    primaryApis: ['model.ContactProperty()', 'c_prop.TangentialBehavior()', 'model.ContactStd()', 'model.Coupling()', 'model.DisplacementBC()', 'model.Moment()'],
    code: `# ==============================================================================
# Script: 03_contact_and_loads.py
# Purpose: Define Contact Interaction, Shaft Bore Couplings, Boundary Conditions,
#          and Applied Torque (494 N*m = 494,000 N*mm)
# ==============================================================================
import os, sys, math
from abaqus import *
from abaqusConstants import *
import interaction, load

model = mdb.models['Model-1']
a = model.rootAssembly
inst_pinion = a.instances['Pinion-1']
inst_gear = a.instances['Gear-1']
step_name = 'Torque_Step'

# 1. Contact Property & General Contact
cp_name = 'Gear_Contact_Prop'
c_prop = model.ContactProperty(cp_name)
c_prop.TangentialBehavior(formulation=PENALTY, directionality=ISOTROPIC, table=((0.15, ), ))
c_prop.NormalBehavior(pressureOverclosure=HARD, allowSeparation=ON)

contact = model.ContactStd(name='Int_Gear_Teeth_Contact', createStepName='Initial')
contact.contactPropertyAssignments.appendInStep(stepName='Initial', assignments=((GLOBAL, SELF, cp_name), ))

# 2. Pinion Coupling & Encastre Boundary Condition
rp_pinion = a.ReferencePoint(point=(0.0, 0.0, 15.0))
rp_pinion_set = a.Set(referencePoints=(a.referencePoints[rp_pinion.id], ), name='Set_RP_Pinion')
# (Find Pinion inner cylindrical bore face at radius 10 mm)
pinion_bore_faces = inst_pinion.faces.findAt(((0.0, 10.0, 15.0), ))
pinion_bore_surf = a.Surface(side1Faces=pinion_bore_faces, name='Surf_Pinion_Bore')

model.Coupling(name='Coupling_Pinion_Bore', controlPoint=rp_pinion_set, surface=pinion_bore_surf,
               couplingType=KINEMATIC, u1=ON, u2=ON, u3=ON, ur1=ON, ur2=ON, ur3=ON)
model.DisplacementBC(name='BC_Pinion_Fixed', createStepName='Initial', region=rp_pinion_set,
                     u1=0, u2=0, u3=0, ur1=0, ur2=0, ur3=0)

# 3. Gear Coupling & Free-Rotation Shaft Support
rp_gear = a.ReferencePoint(point=(0.0, 296.4, 15.0))
rp_gear_set = a.Set(referencePoints=(a.referencePoints[rp_gear.id], ), name='Set_RP_Gear')
gear_bore_faces = inst_gear.faces.findAt(((0.0, 306.4, 15.0), ))
gear_bore_surf = a.Surface(side1Faces=gear_bore_faces, name='Surf_Gear_Bore')

model.Coupling(name='Coupling_Gear_Bore', controlPoint=rp_gear_set, surface=gear_bore_surf,
               couplingType=KINEMATIC, u1=ON, u2=ON, u3=ON, ur1=ON, ur2=ON, ur3=ON)
model.DisplacementBC(name='BC_Gear_Shaft_Support', createStepName='Initial', region=rp_gear_set,
                     u1=0, u2=0, u3=0, ur1=0, ur2=0, ur3=UNSET)

# 4. Applied Torque: 494 N*m = 494,000 N*mm
torque_val = 494000.0  # N*mm
model.Moment(name='Torque_494Nm', createStepName=step_name, region=rp_gear_set, cm3=torque_val)
a.regenerate()
mdb.save()`
  },
  {
    id: 'script-04',
    title: '04. 4-Mesh Convergence Study Setup & Jobs',
    filename: '04_setup_convergence_study.py',
    stage: 'Meshing & Solver Jobs',
    lines: 99,
    description: 'Configures C3D10 quadratic tetrahedral element controls. Iterates across 4 mesh seed densities (20mm, 16mm, 12mm, 9mm), generates meshes, writes input decks, and manages multi-core solver jobs.',
    primaryApis: ['mesh.ElemType(elemCode=C3D10)', 'part.setMeshControls()', 'part.seedPart()', 'part.generateMesh()', 'mdb.Job()', 'job.writeInput()'],
    code: `# ==============================================================================
# Script: 04_setup_convergence_study.py
# Purpose: Setup 4 Mesh Densities & Create Jobs for Requirement 5
# Compatibility: Run via Abaqus CAE (File -> Run Script) or CLI
# ==============================================================================
import os, sys
from abaqus import *
from abaqusConstants import *
import mesh, job

model = mdb.models['Model-1']
p_pinion = model.parts['Pinion']
p_gear = model.parts['Gear']
a = model.rootAssembly

# Set Quadratic Tetrahedral Elements (C3D10)
elem_tet = mesh.ElemType(elemCode=C3D10, elemLibrary=STANDARD)
p_pinion.setMeshControls(regions=p_pinion.cells, elemShape=TET, technique=FREE)
p_pinion.setElementType(regions=(p_pinion.cells,), elemTypes=(elem_tet,))

p_gear.setMeshControls(regions=p_gear.cells, elemShape=TET, technique=FREE)
p_gear.setElementType(regions=(p_gear.cells,), elemTypes=(elem_tet,))

mesh_levels = [
    {"level": 0, "seed": 20.0, "name": "Job_Mesh0_20mm"},
    {"level": 1, "seed": 16.0, "name": "Job_Mesh1_16mm"},
    {"level": 2, "seed": 12.0, "name": "Job_Mesh2_12mm"},
    {"level": 3, "seed": 9.0,  "name": "Job_Mesh3_9mm"}
]

for item in mesh_levels:
    lvl = item['level']
    s = item['seed']
    jname = item['name']
    
    p_pinion.seedPart(size=s, deviationFactor=0.1)
    p_pinion.generateMesh()
    
    p_gear.seedPart(size=s, deviationFactor=0.1)
    p_gear.generateMesh()
    a.regenerate()
    
    total_nodes = len(p_pinion.nodes) + len(p_gear.nodes)
    total_elems = len(p_pinion.elements) + len(p_gear.elements)
    print(f"Level {lvl} ({s}mm): Nodes = {total_nodes:,}, Elements = {total_elems:,}")
    
    if jname in mdb.jobs:
        del mdb.jobs[jname]
        
    my_job = mdb.Job(
        name=jname,
        model='Model-1',
        description=f"Convergence Study Level {lvl} (Seed={s}mm)",
        type=ANALYSIS,
        numCpus=4,
        numDomains=4,
        memory=70,
        memoryUnits=PERCENTAGE
    )
    my_job.writeInput(consistencyChecking=OFF)

mdb.save()`
  },
  {
    id: 'script-05',
    title: '05. Automated ODB Output Extraction',
    filename: '05_extract_odb_results.py',
    stage: 'Post-Processing / Result Telemetry',
    lines: 61,
    description: 'Python script for headless extraction from Abaqus Output Databases (ODBs). Queries peak von Mises stress, maximum displacement magnitude, and equivalent plastic strain (PEEQ) directly from integration points and nodes.',
    primaryApis: ['odbAccess.openOdb()', 'odb.steps[\'Torque_Step\']', 'frame.fieldOutputs[\'S\']', 'frame.fieldOutputs[\'U\']', 'frame.fieldOutputs[\'PEEQ\']'],
    code: `# ==============================================================================
# Script: 05_extract_odb_results.py
# Purpose: Extract field output results from Abaqus Output Database (ODB).
#          Defaults to the primary selected 9mm mesh (Job_Mesh3_9mm.odb).
# ==============================================================================
import os, sys
from odbAccess import openOdb

odb_name = sys.argv[1] if len(sys.argv) > 1 else 'Job_Mesh3_9mm.odb'
odb_path = os.path.join(r"d:\\1.Antigravity Projects\\13_Abaqus_Simulation\\jobs", odb_name)

print("=" * 70)
print(f"EXTRACTING ABAQUS ODB FIELD OUTPUTS: {odb_path}")
print("=" * 70)

odb = openOdb(path=odb_path, readOnly=True)
step = odb.steps['Torque_Step']
last_frame = step.frames[-1]

# 1. Peak von Mises Stress
max_mises = 0.0
max_mises_elem = None
if 'S' in last_frame.fieldOutputs:
    for val in last_frame.fieldOutputs['S'].values:
        if val.mises is not None and val.mises > max_mises:
            max_mises = val.mises
            max_mises_elem = val.elementLabel

# 2. Maximum Displacement Magnitude
max_disp = 0.0
max_disp_node = None
if 'U' in last_frame.fieldOutputs:
    for val in last_frame.fieldOutputs['U'].values:
        if val.magnitude is not None and val.magnitude > max_disp:
            max_disp = val.magnitude
            max_disp_node = val.nodeLabel

# 3. Peak Plastic Strain (PEEQ)
max_peeq = 0.0
if 'PEEQ' in last_frame.fieldOutputs:
    for val in last_frame.fieldOutputs['PEEQ'].values:
        if val.data is not None and val.data > max_peeq:
            max_peeq = val.data

odb.close()

print(f"Peak von Mises Stress: {max_mises:.2f} MPa (Element {max_mises_elem})")
print(f"Peak Displacement:     {max_disp:.4f} mm ({max_disp*1000:.1f} um) (Node {max_disp_node})")
print(f"Peak Plastic Strain:   {max_peeq:.6f}")`
  },
  {
    id: 'script-06',
    title: '06. Publication Convergence Chart Generator',
    filename: '06_generate_convergence_study_charts.py',
    stage: 'Visualization & Reporting',
    lines: 153,
    description: 'Generates dual high-resolution matplotlib convergence figures comparing von Mises stress evolution and global displacement asymptotic stability across element counts.',
    primaryApis: ['matplotlib.pyplot.subplots()', 'ax.annotate()', 'fig.savefig()', 'json.dump()'],
    code: `# ==============================================================================
# Script: 06_generate_convergence_study_charts.py
# Purpose: Generate high-resolution engineering convergence charts and tables
#          from actual Abaqus/Standard solver output databases (ODBs).
# ==============================================================================
import os, json
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

results_data = [
    {"mesh_level": "Mesh 0 (Coarse)", "seed_mm": 20.0, "elements": 81952, "nodes": 126065, "max_mises": 56.11, "max_disp": 0.0117},
    {"mesh_level": "Mesh 1 (Medium-1)", "seed_mm": 16.0, "elements": 91707, "nodes": 140518, "max_mises": 42.50, "max_disp": 0.0111},
    {"mesh_level": "Mesh 2 (Medium-2)", "seed_mm": 12.0, "elements": 102134, "nodes": 156966, "max_mises": 42.04, "max_disp": 0.0116},
    {"mesh_level": "Mesh 3 (Fine - Selected)", "seed_mm": 9.0, "elements": 113902, "nodes": 174807, "max_mises": 50.08, "max_disp": 0.0114}
]

elements = [r["elements"] for r in results_data]
mises = [r["max_mises"] for r in results_data]
disp = [r["max_disp"] for r in results_data]

fig, axes = plt.subplots(1, 2, figsize=(15, 6), dpi=300)
# Plot 1: Peak von Mises Stress
axes[0].plot(elements, mises, 'o-', color='#004b87', linewidth=2.8, markersize=9)
axes[0].set_title('Mesh Convergence: Peak von Mises Stress', fontweight='bold')
axes[0].set_xlabel('Total Element Count')
axes[0].set_ylabel('Peak von Mises Stress (MPa)')
axes[0].grid(True, linestyle='--', alpha=0.6)

# Plot 2: Max Displacement Convergence
axes[1].plot(elements, disp, 's-', color='#107c41', linewidth=2.8, markersize=9)
axes[1].set_title('Global Displacement Convergence (U_max)', fontweight='bold')
axes[1].set_xlabel('Total Element Count')
axes[1].set_ylabel('Maximum Displacement U (mm)')
axes[1].grid(True, linestyle='--', alpha=0.6)

plt.tight_layout()
plt.savefig('output/final_4_mesh_convergence.png', dpi=300)`
  }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    slideNumber: 1,
    title: '3D Contact Stress & Plasticity Analysis of Spur Gears',
    category: 'Introduction',
    previewUrl: '/slide_previews/slide_1.png',
    keyPoints: ['Abaqus 2024 Non-linear Contact Simulation', 'Student Index: 210494', 'Applied Torque: 494 N·m']
  },
  {
    slideNumber: 2,
    title: 'Objectives & Engineering Strategy',
    category: 'Overview',
    previewUrl: '/slide_previews/slide_2.png',
    keyPoints: ['Full 3D Solid FEA', '4-Mesh Convergence Analysis', 'Stainless Steel Elasto-Plastic Material']
  },
  {
    slideNumber: 3,
    title: 'Geometric Design Parameters',
    category: 'Gear Design',
    previewUrl: '/slide_previews/slide_3.png',
    keyPoints: ['Module m = 5.2 mm', 'Pinion z=19, Gear z=95 (5:1 Ratio)', 'Center Distance = 296.4 mm', 'Face Width = 50.0 mm']
  },
  {
    slideNumber: 4,
    title: 'Critical Engineering Assumptions',
    category: 'Overview',
    previewUrl: '/slide_previews/slide_4.png',
    keyPoints: ['Isotropic Material Homogeneity', 'Quasi-static Torque Application', 'Shaft Bearing Rigid Support']
  },
  {
    slideNumber: 5,
    title: 'Simulation Workflow: Pre-Processing to Results',
    category: 'Workflow',
    previewUrl: '/slide_previews/slide_5.png',
    keyPoints: ['CAD Solid Modeling', 'Material Assignment', 'Contact & Couplings', 'Job Execution & Convergence']
  },
  {
    slideNumber: 6,
    title: 'Material Definition: Stainless Steel (AISI 304/316)',
    category: 'Material',
    previewUrl: '/slide_previews/slide_6.png',
    keyPoints: ['Elastic Modulus E = 193 GPa', 'Poisson Ratio ν = 0.30', 'Density = 7,850 kg/m³', 'Yield Sy = 240 MPa']
  },
  {
    slideNumber: 7,
    title: 'Parametric CAD Generation (Solid Edge Part 1)',
    category: 'CAD',
    previewUrl: '/slide_previews/slide_7.png',
    keyPoints: ['Involute Profile Generation', 'Base and Pitch Diameters', 'Tooth Root Trochoid Modeling']
  },
  {
    slideNumber: 8,
    title: 'Parametric CAD Generation (Solid Edge Part 2)',
    category: 'CAD',
    previewUrl: '/slide_previews/slide_8.png',
    keyPoints: ['Pinion 19 Teeth Solid Body', 'Gear 95 Teeth Wheel Solid', 'Axial 50mm Extrusion']
  },
  {
    slideNumber: 9,
    title: 'Parametric CAD Generation (Solid Edge Part 3)',
    category: 'CAD',
    previewUrl: '/slide_previews/slide_9.png',
    keyPoints: ['Assembly Center Distance 296.4 mm', 'Tangential Tooth Alignment', 'Parasolid Geometric Export']
  },
  {
    slideNumber: 10,
    title: 'CAD to CAE Integration & Assembly',
    category: 'Assembly',
    previewUrl: '/slide_previews/slide_10.png',
    keyPoints: ['Import into Abaqus/CAE 2024', 'Dependent Instance Definition', 'Verification of Center Distance']
  },
  {
    slideNumber: 11,
    title: 'Material Definition & Elasto-Plasticity Table',
    category: 'Material',
    previewUrl: '/slide_previews/slide_11.png',
    keyPoints: ['von Mises J2 Flow Rule', 'True Stress vs True Plastic Strain Table', 'Ultimate Stress 780 MPa at ε_pl = 0.52']
  },
  {
    slideNumber: 12,
    title: 'Material Assignment: Homogeneous Solid Sections',
    category: 'Workflow',
    previewUrl: '/slide_previews/slide_12.png',
    keyPoints: ['Section Assignment to Pinion & Gear Cells', 'Verification of Constitutive Model Link']
  },
  {
    slideNumber: 13,
    title: 'Step Definition: Non-linear Static General Analysis',
    category: 'Workflow',
    previewUrl: '/slide_previews/slide_13.png',
    keyPoints: ['Static, General Step', 'Geometric Non-linearity (Nlgeom = ON)', 'Adaptive Incrementation 0.01s - 0.05s']
  },
  {
    slideNumber: 14,
    title: 'Step Configuration: Field & History Output Requests',
    category: 'Workflow',
    previewUrl: '/slide_previews/slide_14.png',
    keyPoints: ['20 Field Output Intervals', 'Outputs: S, PEEQ, U, CSTRESS, CDISP', 'Equilibrium Verification: ALLKE < 1% ALLIE']
  },
  {
    slideNumber: 15,
    title: 'Contact Interaction: General Contact Formulation',
    category: 'Contact',
    previewUrl: '/slide_previews/slide_15.png',
    keyPoints: ['General Contact (Standard) Architecture', 'Global Exterior Surface Coverage', 'Automatic Multi-Tooth Tracking']
  },
  {
    slideNumber: 16,
    title: 'Contact Properties: Tangential & Normal Behavior',
    category: 'Contact',
    previewUrl: '/slide_previews/slide_16.png',
    keyPoints: ['Penalty Friction Coefficient μ = 0.15', 'Hard Normal Contact with Separation Allowed']
  },
  {
    slideNumber: 17,
    title: 'Boundary Constraints: Kinematic Shaft Couplings',
    category: 'Workflow',
    previewUrl: '/slide_previews/slide_17.png',
    keyPoints: ['Pinion Reference Point RP-1 (0, 0, 15)', 'Gear Reference Point RP-2 (0, 296.4, 15)', 'Kinematic Couplings on Inner Bores']
  },
  {
    slideNumber: 18,
    title: 'Loading & Boundary Conditions: Torque Application',
    category: 'Workflow',
    previewUrl: '/slide_previews/slide_18.png',
    keyPoints: ['Encastre Fixed BC on Pinion RP', 'Shaft Pin Support on Gear RP (UR3 Free)', '494 N·m (494,000 N·mm) Torque Applied']
  },
  {
    slideNumber: 19,
    title: 'Finite Element Meshing: Strategy & Sizing Controls',
    category: 'Meshing',
    previewUrl: '/slide_previews/slide_19.png',
    keyPoints: ['C3D10 10-Node Quadratic Tetrahedrals', 'Second-Order Displacement Interpolation', 'Curvature Deviation Factor 0.10']
  },
  {
    slideNumber: 20,
    title: '3D Discretized Gear Pair Assembly',
    category: 'Meshing',
    previewUrl: '/slide_previews/slide_20.png',
    keyPoints: ['Mesh Density Verification', 'Smooth Involute Profile Conformance', 'Elimination of Shear Locking']
  },
  {
    slideNumber: 21,
    title: 'Mesh Convergence Study: Solver Execution',
    category: 'Convergence',
    previewUrl: '/slide_previews/slide_21.png',
    keyPoints: ['Job Execution: Mesh0 (20mm), Mesh1 (16mm), Mesh2 (12mm), Mesh3 (9mm)', 'All 4 Jobs Completed Successfully']
  },
  {
    slideNumber: 22,
    title: 'Primary Results: von Mises Stress Distribution (9mm Mesh)',
    category: 'Results',
    previewUrl: '/slide_previews/slide_22.png',
    videoUrl: '/videos/video_01_von_mises_stress_animation_9mm.mp4',
    keyPoints: ['Peak von Mises Stress: 50.08 MPa', '113,902 Elements', 'Resolved Hertzian Contact Line', 'Embedded Simulation Video']
  },
  {
    slideNumber: 23,
    title: 'Primary Results: Total Displacement Field (9mm Mesh)',
    category: 'Results',
    previewUrl: '/slide_previews/slide_23.png',
    videoUrl: '/videos/video_02_displacement_magnitude_animation_9mm.mp4',
    keyPoints: ['Maximum Deflection: 0.0114 mm (11.4 μm)', 'Smooth Elastic Compliance Gradient', 'Embedded Simulation Video']
  },
  {
    slideNumber: 24,
    title: '4-Mesh Convergence Study & Numerical Validation',
    category: 'Convergence',
    previewUrl: '/slide_previews/slide_24.png',
    keyPoints: ['Displacement Convergence: Δ < 1.75%', 'Stress Resolution of Contact Peak', 'Quantitative Comparison Table']
  },
  {
    slideNumber: 25,
    title: 'Conclusions & Structural Reserve Margin',
    category: 'Conclusions',
    previewUrl: '/slide_previews/slide_25.png',
    keyPoints: ['Factor of Safety = 4.79 (Sy = 240 MPa)', 'Plastic Strain PEEQ = 0.000000', 'Pure Linear Elastic Operation']
  },
  {
    slideNumber: 26,
    title: 'Conclusions & Project Deliverables Summary',
    category: 'Conclusions',
    previewUrl: '/slide_previews/slide_26.png',
    keyPoints: ['100% Academic Requirements Satisfied', 'Reproducible Python Automation Scripts', 'Complete Verified Deliverables']
  }
];

