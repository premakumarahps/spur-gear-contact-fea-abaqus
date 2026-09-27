import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Play, 
  ArrowDownRight, 
  Compass, 
  Maximize2 
} from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Glows and Cyber Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[280px] bg-blue-600/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges & Meta Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide shadow-sm shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SIMULIA Abaqus/Standard 2024</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/25 text-blue-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>C3D10 10-Node Quadratic Tets</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Primary 9mm Model (SF = 4.8)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
            <span>Student Index: 210494</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Spur Gear <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">3D FEA Simulation</span>
            <br className="hidden sm:inline" /> &amp; Convergence Study
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Non-linear 3D contact mechanics and transient torque transmission in SIMULIA Abaqus.
            Featuring elasto-plastic stainless steel constitutive modeling, a rigorous 4-mesh convergence study,
            Hertzian contact pressure resolution, and end-to-end Python automation.
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <a
              href="#convergence"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Activity className="w-4 h-4" />
              <span>Explore Convergence Study</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#results-9mm"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 hover:text-white transition-all glass-panel"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>9mm Primary ODB Contours</span>
            </a>

            <a
              href="#videos"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:border-blue-500/40 hover:text-white transition-all glass-panel"
            >
              <Play className="w-4 h-4 text-blue-400" />
              <span>Transient Videos</span>
            </a>
          </div>
        </div>

        {/* 4 Key Performance Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 max-w-5xl mx-auto">
          
          {/* Card 1 */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 text-left border-l-2 border-l-cyan-400 group hover:border-cyan-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>Applied Torque</span>
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="font-orbitron font-bold text-2xl sm:text-3xl text-white tracking-wide">
              494.0 <span className="text-xs sm:text-sm font-sans font-normal text-cyan-300">N·m</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">494,000 N·mm Moment on Gear</p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 text-left border-l-2 border-l-blue-400 group hover:border-blue-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>Peak von Mises Stress</span>
              <Activity className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="font-orbitron font-bold text-2xl sm:text-3xl text-white tracking-wide">
              50.08 <span className="text-xs sm:text-sm font-sans font-normal text-blue-300">MPa</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Hertzian contact line resolved</p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 text-left border-l-2 border-l-emerald-400 group hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>Safety Factor</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-orbitron font-bold text-2xl sm:text-3xl text-white tracking-wide text-emerald-400">
              4.79 <span className="text-xs sm:text-sm font-sans font-normal text-emerald-300">≈ 5.0</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Yield Sy = 240 MPa • PEEQ = 0</p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 text-left border-l-2 border-l-sky-400 group hover:border-sky-400 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>Max Deflection U</span>
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="font-orbitron font-bold text-2xl sm:text-3xl text-white tracking-wide">
              0.0114 <span className="text-xs sm:text-sm font-sans font-normal text-sky-300">mm</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">11.4 μm • &lt;1.75% Global Convergence</p>
          </div>

        </div>

        {/* Hero Interactive Media Showcase Frame */}
        <div className="mt-10 max-w-5xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-cyan-500/25 via-blue-500/10 to-transparent shadow-2xl shadow-cyan-950/40">
          <div className="bg-[#080d1a] rounded-[15px] border border-cyan-500/20 overflow-hidden relative">
            
            {/* Top Window Bar */}
            <div className="bg-[#0f172a]/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-slate-400 text-[11px] hidden sm:inline ml-2">
                  Abaqus/Viewer • Job_Mesh3_9mm.odb • Step: Torque_Step (Time = 1.000)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  113,902 C3D10 Elements
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Status: Completed
                </span>
              </div>
            </div>

            {/* Showcase Visual - Primary Contour */}
            <div className="relative aspect-video sm:aspect-[21/9] max-h-[460px] bg-[#02040a] flex items-center justify-center overflow-hidden group">
              <img
                src="/results_9mm/odb_9mm_displacement_contour_abaqus_gui.png"
                alt="Abaqus GUI Displacement Contour Job_Mesh3_9mm"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />

              {/* Inset Telemetry Overlay Box */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto bg-[#030712]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3.5 sm:max-w-md shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Job_Mesh3_9mm.odb Validated Result
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Smooth continuous displacement gradient across meshing teeth. Pinion shaft bore is rigidly reacted (encastre), while 494 N·m torque drives full contact engagement.
                </p>
                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                  <span>U_max: <strong className="text-cyan-300">0.0114 mm</strong></span>
                  <span>σ_vM: <strong className="text-blue-300">50.08 MPa</strong></span>
                  <span>Wall Time: <strong className="text-slate-200">472 s</strong></span>
                </div>
              </div>

              {/* Quick Jump Inset Button */}
              <a
                href="#results-9mm"
                className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 hover:bg-cyan-500/30 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white transition-all backdrop-blur-sm"
                title="Expand 9mm Results Viewer"
              >
                <Maximize2 className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </header>
  );
};
