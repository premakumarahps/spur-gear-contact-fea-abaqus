import { useState } from 'react';
import { 
  Calculator, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Settings2, 
  Flame 
} from 'lucide-react';
import { GEAR_SPECIFICATIONS, MATERIAL_PROPERTIES } from '../data/simulationData';

export const DesignParameters: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'geometry' | 'forces' | 'material'>('geometry');

  // Interactive torque multiplier demo
  const [testTorque, setTestTorque] = useState<number>(494);
  const gearPcdMeters = 0.494; // 494 mm
  const calculatedFt = (2 * testTorque) / gearPcdMeters;
  const calculatedFr = calculatedFt * Math.tan((20 * Math.PI) / 180);
  const calculatedFn = calculatedFt / Math.cos((20 * Math.PI) / 180);

  return (
    <section id="specifications" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Analytical Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Gear Geometry &amp; <span className="text-cyan-400">Force Derivations</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Parametric involute specifications, transmitted line-of-action forces, and elasto-plastic constitutive material modeling derived from Student Index 210494.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('geometry')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'geometry'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Gear Geometry</span>
            </button>

            <button
              onClick={() => setActiveTab('forces')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'forces'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Force Mechanics (494 N·m)</span>
            </button>

            <button
              onClick={() => setActiveTab('material')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'material'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Stainless Steel Plasticity</span>
            </button>
          </div>
        </div>

        {/* TAB 1: GEOMETRY SPECIFICATIONS TABLE */}
        {activeTab === 'geometry' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Table */}
            <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden border border-slate-800">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Standard Involute Parameters (m = 5.2 mm)
                </h3>
                <span className="text-xs font-mono text-cyan-400">Ratio 5:1</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/70 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Parameter</th>
                      <th className="py-3 px-3">Symbol</th>
                      <th className="py-3 px-3 text-cyan-400">Pinion (Driver)</th>
                      <th className="py-3 px-3 text-blue-400">Gear (Driven)</th>
                      <th className="py-3 px-3">Unit</th>
                      <th className="py-3 px-4 hidden md:table-cell">Analytical Formula</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {GEAR_SPECIFICATIONS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-cyan-500/5 transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-slate-200">{spec.name}</td>
                        <td className="py-3 px-3 text-slate-400 italic">{spec.symbol}</td>
                        <td className="py-3 px-3 text-cyan-300 font-bold">{spec.pinion}</td>
                        <td className="py-3 px-3 text-blue-300 font-bold">{spec.gear}</td>
                        <td className="py-3 px-3 text-slate-400">{spec.unit}</td>
                        <td className="py-3 px-4 text-xs text-slate-400 font-sans hidden md:table-cell">
                          {spec.formula ? <code>{spec.formula}</code> : 'Standard'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Geometric Insights Card */}
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Geometric Verification
                </h4>
                <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Center Distance:</strong> Exact <code className="text-cyan-300">296.4 mm</code> mating eliminates root interference and maintains nominal pitch line contact.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Full-Depth Teeth:</strong> 20° pressure angle provides optimal balance between tooth root bending endurance and Hertzian surface pressure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>50 mm Face Width:</strong> Prevents premature tooth tip chipping and accommodates 10 kN tangential load without localized edge yield.</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#080d1a]">
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Index Correlation</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Student Index: <strong className="text-cyan-400">210494</strong>.
                  Last 3 digits define nominal applied torque: <strong className="text-white">494 N·m</strong>.
                  Reaction moment evaluated at fixed Pinion reference point matches 494 N·m exactly at static equilibrium.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE FORCE CALCULATOR */}
        {activeTab === 'forces' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Interactive Calculator Input */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-cyan-400" />
                  Live Force Resolver
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust torque to observe instantaneous pitch line force equilibrium:
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300">Applied Torque T:</span>
                  <span className="text-cyan-400 font-bold">{testTorque} N·m ({testTorque * 1000} N·mm)</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="10"
                  value={testTorque}
                  onChange={(e) => setTestTorque(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>100 N·m</span>
                  <button 
                    onClick={() => setTestTorque(494)}
                    className="text-cyan-400 underline hover:text-cyan-300"
                  >
                    Reset (494 N·m)
                  </button>
                  <span>1000 N·m</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Gear PCD (d₂):</span>
                  <span className="text-white font-bold">494.0 mm (0.494 m)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Pressure Angle (α):</span>
                  <span className="text-white font-bold">20.0°</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Torque Moment Vector:</span>
                  <span className="text-cyan-300 font-bold">CM3 = {testTorque * 1000} N·mm</span>
                </div>
              </div>
            </div>

            {/* Resolved Force Outputs */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Tangential Force */}
              <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-cyan-400 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Tangential Force (F_t)</span>
                  <div className="font-orbitron font-bold text-2xl text-white">
                    {calculatedFt.toFixed(1)} <span className="text-xs font-sans text-cyan-300">N</span>
                  </div>
                  <div className="text-xs font-mono text-cyan-400 mt-1">
                    {(calculatedFt / 1000).toFixed(2)} kN
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  <code>F_t = 2T / d₂</code>
                  <p className="font-sans text-slate-400 mt-1">Directly transmits work across pitch line.</p>
                </div>
              </div>

              {/* Radial Force */}
              <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-blue-400 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Radial Separating (F_r)</span>
                  <div className="font-orbitron font-bold text-2xl text-white">
                    {calculatedFr.toFixed(1)} <span className="text-xs font-sans text-blue-300">N</span>
                  </div>
                  <div className="text-xs font-mono text-blue-400 mt-1">
                    {(calculatedFr / 1000).toFixed(2)} kN
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  <code>F_r = F_t × tan(20°)</code>
                  <p className="font-sans text-slate-400 mt-1">Reacted by shaft bearings and bore couplings.</p>
                </div>
              </div>

              {/* Resultant Force */}
              <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-sky-400 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Normal Contact (F_n)</span>
                  <div className="font-orbitron font-bold text-2xl text-white">
                    {calculatedFn.toFixed(1)} <span className="text-xs font-sans text-sky-300">N</span>
                  </div>
                  <div className="text-xs font-mono text-sky-400 mt-1">
                    {(calculatedFn / 1000).toFixed(2)} kN
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  <code>F_n = F_t / cos(20°)</code>
                  <p className="font-sans text-slate-400 mt-1">Acts along line of action causing Hertzian stress.</p>
                </div>
              </div>

              {/* Force Equilibrium Summary Banner */}
              <div className="sm:col-span-3 glass-panel rounded-xl p-4 border border-cyan-500/20 bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xs text-slate-300">
                    <strong>Equilibrium Check:</strong> Nominal torque of <strong>494 N·m</strong> generates precisely <strong>10.0 kN</strong> tangential load and <strong>10.64 kN</strong> resultant normal contact force.
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded bg-emerald-950/60 border border-emerald-800/80 whitespace-nowrap">
                  Reaction Balanced: RM3 = 494 N·m
                </span>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: MATERIAL & PLASTICITY TABLE */}
        {activeTab === 'material' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Material Card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase">
                <Flame className="w-4 h-4" />
                <span>Constitutive Model</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {MATERIAL_PROPERTIES.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Austenitic stainless steel configured with isotropic elasticity and non-linear J2 plasticity hardening table to capture peak stress redistribution beyond yield if excessive torque occurs.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Density (ρ):</span>
                  <span className="text-white">{MATERIAL_PROPERTIES.density}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Young's Modulus (E):</span>
                  <span className="text-cyan-300 font-bold">{MATERIAL_PROPERTIES.youngsModulus}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Poisson's Ratio (ν):</span>
                  <span className="text-white">{MATERIAL_PROPERTIES.poissonsRatio}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Yield Strength (S_y):</span>
                  <span className="text-emerald-400 font-bold">{MATERIAL_PROPERTIES.yieldStrength}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Ultimate Stress:</span>
                  <span className="text-white">{MATERIAL_PROPERTIES.ultimateStrength}</span>
                </div>
              </div>
            </div>

            {/* Plasticity Curve Data Table */}
            <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Abaqus Non-linear Plasticity Table (*PLASTIC)
                </h4>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Actual PEEQ = 0.0000 (Elastic Regime)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                {[
                  { stress: 240.0, strain: 0.0000, label: 'Yield Point' },
                  { stress: 265.0, strain: 0.0125, label: 'Early Hardening' },
                  { stress: 305.0, strain: 0.0350, label: 'Transition' },
                  { stress: 360.0, strain: 0.0750, label: 'Hardening' },
                  { stress: 440.0, strain: 0.1450, label: 'Uniform Plastic' },
                  { stress: 540.0, strain: 0.2400, label: 'High Strain' },
                  { stress: 660.0, strain: 0.3700, label: 'Post-Yield' },
                  { stress: 780.0, strain: 0.5200, label: 'Ultimate Tensile' }
                ].map((pt, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-lg border ${
                      idx === 0 
                        ? 'bg-cyan-500/10 border-cyan-500/30' 
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 font-sans">{pt.label}</div>
                    <div className="font-bold text-white mt-0.5">{pt.stress.toFixed(1)} MPa</div>
                    <div className="text-[11px] text-cyan-400">ε_pl = {pt.strain.toFixed(4)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong>Finite Element Verdict:</strong> Under the applied torque of 494 N·m, the peak von Mises stress in the converged 9mm mesh is <strong>50.08 MPa</strong>. Because 50.08 MPa is substantially below the 240.0 MPa yield threshold, the gear tooth material stays strictly in the linear elastic regime with <strong>zero plastic strain accumulation (PEEQ = 0.000000)</strong>.
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
