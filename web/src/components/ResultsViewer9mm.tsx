import { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Maximize2 
} from 'lucide-react';

export const ResultsViewer9mm: React.FC = () => {
  const [activeContour, setActiveContour] = useState<'displacement' | 'vonMises'>('displacement');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const contours = {
    displacement: {
      name: 'Displacement Magnitude (U, Magnitude)',
      unit: 'mm',
      peakValue: '0.0114 mm (11.4 μm)',
      image: '/results_9mm/odb_9mm_displacement_contour_abaqus_gui.png',
      caption: 'Continuous elastic deflection field. Peak displacement localized at gear outer tip radius under 494 N·m torque.',
      colorScale: 'Blue (0.0000 mm) → Green (0.0057 mm) → Red (0.0114 mm)',
      fieldVariable: 'U, Magnitude',
      nodeLocation: 'Gear Outer Tip Perimeter'
    },
    vonMises: {
      name: 'von Mises Stress (S, Mises)',
      unit: 'MPa',
      peakValue: '50.08 MPa',
      image: '/results_9mm/odb_9mm_von_mises_contour_abaqus_gui.png',
      caption: 'High-gradient contact stress resolved directly along the tooth meshing line of action. Root fillet bending well below yield.',
      colorScale: 'Blue (0.00 MPa) → Green (25.04 MPa) → Red (50.08 MPa)',
      fieldVariable: 'S, Mises',
      nodeLocation: 'Tooth Contact Pitch Line / Root Fillet'
    }
  };

  const current = contours[activeContour];

  return (
    <section id="results-9mm" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Primary Selected Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Job_Mesh3_9mm.odb <span className="text-cyan-400">Results Showcase</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Designated primary evaluation model featuring 113,902 quadratic C3D10 tetrahedrals. 
            Providing verified high-resolution field contours directly extracted from the Abaqus/Standard output database.
          </p>
        </div>

        {/* Contour Toggle Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveContour('displacement')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeContour === 'displacement'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Displacement Field (0.0114 mm)</span>
            </button>

            <button
              onClick={() => setActiveContour('vonMises')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeContour === 'vonMises'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>von Mises Stress (50.08 MPa)</span>
            </button>
          </div>
        </div>

        {/* Contour Display Frame + Side Telemetry Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden border border-cyan-500/20 flex flex-col justify-between">
            
            {/* Window Bar */}
            <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-white font-bold">{current.name}</span>
              </div>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-400"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Zoom</span>
              </button>
            </div>

            {/* High-Res Abaqus Contour Image */}
            <div className="relative aspect-[16/10] bg-[#02040a] flex items-center justify-center p-2 overflow-hidden group">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                onClick={() => setIsZoomed(true)}
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-slate-300">
                Peak: <strong className={activeContour === 'displacement' ? 'text-emerald-400' : 'text-cyan-400'}>{current.peakValue}</strong>
              </div>
            </div>

            {/* Caption & Spectrum */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-slate-300 leading-relaxed max-w-xl">
                {current.caption}
              </p>
              <div className="font-mono text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                {current.colorScale}
              </div>
            </div>

          </div>

          {/* Right Col: Deep Structural Integrity Assessment */}
          <div className="space-y-4">
            
            {/* Telemetry Card */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                9mm Solver Telemetry
              </h3>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Elements:</span>
                  <span className="text-white font-bold">113,902 (C3D10)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Nodes:</span>
                  <span className="text-white font-bold">174,807</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Peak von Mises:</span>
                  <span className="text-cyan-300 font-bold">50.08 MPa</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Max Deflection:</span>
                  <span className="text-emerald-400 font-bold">0.0114 mm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Plastic Strain (PEEQ):</span>
                  <span className="text-emerald-300 font-bold">0.000000</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Solver Wall Time:</span>
                  <span className="text-slate-200">472 s (4 Domains)</span>
                </div>
              </div>
            </div>

            {/* Factor of Safety Hero Box */}
            <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                  Fatigue &amp; Yield Integrity
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-mono border border-emerald-700">
                  EXCELLENT
                </span>
              </div>
              <div className="font-orbitron font-extrabold text-3xl text-emerald-400">
                SF = 4.79 <span className="text-sm font-sans text-emerald-300 font-normal">≈ 5.0</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Yield strength is <code className="text-white">240.0 MPa</code>. At 50.08 MPa peak contact stress, the gear operates with a massive <strong>479% reserve margin</strong> against permanent plastic deformation.
              </p>
            </div>

            {/* Contact Zone Summary */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-white font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Tooth Contact Mechanics</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                General contact with penalty friction μ = 0.15 accurately simulates rolling-sliding contact kinematics. No edge singularities or master-slave penetration flaws observed.
              </p>
            </div>

          </div>

        </div>

        {/* Modal Zoom View */}
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-5xl bg-[#080d1a] border border-cyan-500/30 rounded-2xl overflow-hidden p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h3 className="text-sm font-bold text-white font-mono">
                  Full Resolution: {current.name} (Job_Mesh3_9mm.odb)
                </h3>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="bg-[#02040a] rounded-xl p-2 max-h-[80vh] overflow-auto">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
