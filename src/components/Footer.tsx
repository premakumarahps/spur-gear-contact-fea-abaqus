import { 
  Activity, 
  ArrowUp, 
  Download, 
  Code2 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#02050c] text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold">
                <Activity className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="font-orbitron font-bold text-base text-white tracking-wider">
                  SIMULIA FEA
                </span>
                <span className="text-[10px] block font-mono text-cyan-400">
                  Abaqus 2024 Engineering Suite
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Non-linear 3D contact finite element simulation, 4-mesh convergence study, and automated Python CAE pipeline for a 5:1 spur gear transmission under 494 N·m applied torque.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Index: <strong>210494</strong>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                SF = 4.79
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                113k Elements
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#specifications" className="hover:text-cyan-400 transition-colors">Gear Specifications</a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-cyan-400 transition-colors">20 Abaqus GUI Steps</a>
              </li>
              <li>
                <a href="#convergence" className="hover:text-cyan-400 transition-colors text-cyan-300 font-semibold">4-Mesh Convergence Study</a>
              </li>
              <li>
                <a href="#results-9mm" className="hover:text-cyan-400 transition-colors">9mm Primary Results</a>
              </li>
              <li>
                <a href="#videos" className="hover:text-cyan-400 transition-colors">Transient Video Theater</a>
              </li>
              <li>
                <a href="#scripts" className="hover:text-cyan-400 transition-colors">Python Automation</a>
              </li>
              <li>
                <a href="#presentation" className="hover:text-cyan-400 transition-colors">Presentation Slide Deck</a>
              </li>
            </ul>
          </div>

          {/* Deliverables Download */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Project Downloads
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/Simulation presentation.pptx"
                  download
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>26-Slide Deck (.pptx)</span>
                </a>
              </li>
              <li>
                <a
                  href="/scripts/01_define_properties.py"
                  download
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Script 01 (Material)</span>
                </a>
              </li>
              <li>
                <a
                  href="/scripts/03_contact_and_loads.py"
                  download
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Script 03 (Contacts &amp; BCs)</span>
                </a>
              </li>
              <li>
                <a
                  href="/scripts/04_setup_convergence_study.py"
                  download
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Script 04 (4 Meshes)</span>
                </a>
              </li>
              <li>
                <a
                  href="/convergence/4_mesh_convergence_study_plot.png"
                  download
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Convergence Plot (PNG)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Software & Technical Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Engineering Stack
            </h4>
            <div className="space-y-1.5 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>SIMULIA Abaqus 2024</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Python 3 CAE Scripting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Siemens Solid Edge 2024</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>React 19 + TypeScript</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Chart.js + Tailwind CSS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 font-mono text-center sm:text-left">
            © 2026 Spur Gear 3D FEA Simulation &amp; Convergence Study • Student Index: <strong>210494</strong>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-xs font-mono"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
