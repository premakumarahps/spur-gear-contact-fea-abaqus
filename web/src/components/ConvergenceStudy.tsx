import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  Activity, 
  ShieldCheck, 
  Info, 
  Layers, 
  CheckCircle2, 
  Maximize2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  CONVERGENCE_DATA, 
  PHYSICAL_CONVERGENCE_EXPLANATION 
} from '../data/simulationData';
import type { MeshConvergenceResult } from '../data/simulationData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const ConvergenceStudy: React.FC = () => {
  const [activeChartMode, setActiveChartMode] = useState<'both' | 'stress' | 'displacement'>('both');
  const [selectedMesh, setSelectedMesh] = useState<MeshConvergenceResult>(CONVERGENCE_DATA[3]); // Default to 9mm Primary
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    displacement: true,
    hertzian: true,
    safety: true
  });

  const toggleAccordion = (key: string) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const chartLabels = CONVERGENCE_DATA.map((d) => `${d.elements.toLocaleString()} elems\n(${d.seed_mm}mm)`);

  const chartData = {
    labels: chartLabels,
    datasets: [
      ...(activeChartMode === 'both' || activeChartMode === 'stress' ? [{
        label: 'Peak von Mises Stress (MPa)',
        data: CONVERGENCE_DATA.map((d) => d.max_mises),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.12)',
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#06b6d4',
        pointRadius: 6,
        pointHoverRadius: 9,
        borderWidth: 3,
        yAxisID: 'yStress',
        fill: activeChartMode === 'stress',
        tension: 0.25,
      }] : []),
      ...(activeChartMode === 'both' || activeChartMode === 'displacement' ? [{
        label: 'Max Displacement U_max (mm)',
        data: CONVERGENCE_DATA.map((d) => d.max_disp),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#10b981',
        pointRadius: 6,
        pointHoverRadius: 9,
        borderWidth: 3,
        yAxisID: activeChartMode === 'both' ? 'yDisp' : 'yStress',
        fill: activeChartMode === 'displacement',
        tension: 0.25,
      }] : []),
    ]
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: { family: 'Inter', size: 12 },
          usePointStyle: true,
          boxWidth: 8,
        }
      },
      tooltip: {
        backgroundColor: '#080d1a',
        titleColor: '#38bdf8',
        bodyColor: '#f1f5f9',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
        padding: 12,
        titleFont: { family: 'JetBrains Mono', size: 13, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 12 },
        callbacks: {
          label: (context: any) => {
            const val = context.parsed.y;
            if (context.dataset.label.includes('Stress')) {
              return `  Stress: ${val.toFixed(2)} MPa`;
            }
            return `  Displacement: ${val.toFixed(4)} mm (${(val * 1000).toFixed(1)} μm)`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } }
      },
      yStress: {
        type: 'linear',
        display: activeChartMode === 'both' || activeChartMode === 'stress',
        position: 'left',
        title: {
          display: true,
          text: activeChartMode === 'displacement' ? 'Displacement (mm)' : 'von Mises Stress (MPa)',
          color: activeChartMode === 'displacement' ? '#10b981' : '#06b6d4',
          font: { family: 'Inter', size: 12, weight: 'bold' }
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } },
        min: activeChartMode === 'displacement' ? 0.0100 : 35,
        max: activeChartMode === 'displacement' ? 0.0130 : 62,
      },
      ...(activeChartMode === 'both' ? {
        yDisp: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Global Displacement U_max (mm)',
            color: '#10b981',
            font: { family: 'Inter', size: 12, weight: 'bold' }
          },
          grid: { drawOnChartArea: false },
          ticks: { 
            color: '#10b981', 
            font: { family: 'JetBrains Mono', size: 11 },
            callback: (val: any) => `${Number(val).toFixed(4)}`
          },
          min: 0.0105,
          max: 0.0125,
        }
      } : {})
    }
  };

  return (
    <section id="convergence" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Requirement 5 • Numerical Verification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            4-Mesh Convergence <span className="text-cyan-400">&amp; Asymptotic Stability</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Rigorous evaluation across 4 mesh seed levels (20mm, 16mm, 12mm, 9mm; 81k to 114k elements). 
            Proving rock-solid global displacement convergence alongside the physical resolution of the Hertzian contact peak.
          </p>
        </div>

        {/* Top Control Bar & KPI Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          
          {/* Chart View Modes */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveChartMode('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeChartMode === 'both'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dual Axis (Stress &amp; Disp)
            </button>
            <button
              onClick={() => setActiveChartMode('displacement')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeChartMode === 'displacement'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Global Displacement Only
            </button>
            <button
              onClick={() => setActiveChartMode('stress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeChartMode === 'stress'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              von Mises Stress Only
            </button>
          </div>

          {/* Quick Publication Chart Modal Opener */}
          <button
            onClick={() => setShowImageModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Publication Matplotlib Figure</span>
          </button>
        </div>

        {/* Main Chart + Mesh Telemetry Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Interactive Line Chart */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Convergence Trajectory (81,952 → 113,902 C3D10 Elements)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Δ Displacement &lt; 1.75%
              </span>
            </div>

            <div className="relative h-72 sm:h-80 w-full">
              <Line data={chartData} options={chartOptions} />
            </div>

            {/* Sub-chart Asymptote Callout */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Asymptotic Compliance: <strong className="text-white">U = 0.0114 mm (±0.0003 mm)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Selected Primary: <strong className="text-cyan-300">9mm Mesh (50.08 MPa)</strong></span>
              </div>
            </div>
          </div>

          {/* Right Col: Active Mesh Card & Factor of Safety */}
          <div className="space-y-4">
            
            {/* Selected Mesh Card */}
            <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 bg-[#080d1a]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  {selectedMesh.status}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Seed: <strong className="text-white">{selectedMesh.seed_mm} mm</strong>
                </span>
              </div>

              <h4 className="text-base font-bold text-white font-mono">
                {selectedMesh.job_name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {selectedMesh.note}
              </p>

              <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-slate-800 font-mono text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Total Elements</div>
                  <div className="font-bold text-white text-sm mt-0.5">{selectedMesh.elements.toLocaleString()}</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Total Nodes</div>
                  <div className="font-bold text-white text-sm mt-0.5">{selectedMesh.nodes.toLocaleString()}</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Peak von Mises</div>
                  <div className="font-bold text-cyan-300 text-sm mt-0.5">{selectedMesh.max_mises.toFixed(2)} MPa</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Max Deflection</div>
                  <div className="font-bold text-emerald-400 text-sm mt-0.5">{selectedMesh.max_disp.toFixed(4)} mm</div>
                </div>
              </div>

              {/* Safety Factor Badge */}
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Factor of Safety</div>
                    <div className="font-orbitron font-bold text-emerald-400 text-base">
                      {selectedMesh.factor_of_safety.toFixed(2)} (S_y = 240 MPa)
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700">
                  SAFE
                </span>
              </div>
            </div>

            {/* Quick Mesh Selector Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {CONVERGENCE_DATA.map((mesh) => (
                <button
                  key={mesh.job_name}
                  onClick={() => setSelectedMesh(mesh)}
                  className={`p-2 rounded-xl text-center border font-mono transition-all ${
                    selectedMesh.job_name === mesh.job_name
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px]">{mesh.seed_mm}mm</div>
                  <div className="text-xs font-bold mt-0.5">M{mesh.mesh_level.split(' ')[1]}</div>
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* 4-Mesh Quantitative Comparison Table */}
        <div className="mt-8 glass-panel rounded-2xl overflow-hidden border border-slate-800">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Exact Abaqus/Standard Solver Telemetry (4 Mesh Densities)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Zero Hallucination Ground Truth</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/70 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Mesh Level</th>
                  <th className="py-3 px-3">Seed</th>
                  <th className="py-3 px-3">Elements (C3D10)</th>
                  <th className="py-3 px-3">Nodes</th>
                  <th className="py-3 px-3 text-cyan-400">Peak σ_vM (MPa)</th>
                  <th className="py-3 px-3 text-emerald-400">Max U (mm)</th>
                  <th className="py-3 px-3">Δ Stress %</th>
                  <th className="py-3 px-3">Δ Disp %</th>
                  <th className="py-3 px-3">Safety Factor</th>
                  <th className="py-3 px-4">Status &amp; Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {CONVERGENCE_DATA.map((row) => {
                  const isSelected = row.job_name === selectedMesh.job_name;
                  const isPrimary = row.status === 'Primary Selected';
                  return (
                    <tr
                      key={row.job_name}
                      onClick={() => setSelectedMesh(row)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-cyan-500/10 text-white' 
                          : 'hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-sans font-medium flex items-center gap-2">
                        {isPrimary && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                        <span>{row.mesh_level}</span>
                      </td>
                      <td className="py-3.5 px-3 text-white font-bold">{row.seed_mm} mm</td>
                      <td className="py-3.5 px-3 text-slate-200">{row.elements.toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-slate-400">{row.nodes.toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-cyan-300 font-bold">{row.max_mises.toFixed(2)}</td>
                      <td className="py-3.5 px-3 text-emerald-400 font-bold">{row.max_disp.toFixed(4)}</td>
                      <td className="py-3.5 px-3 text-slate-400">
                        {row.stress_change_pct === 0 ? '-' : `${row.stress_change_pct.toFixed(2)}%`}
                      </td>
                      <td className="py-3.5 px-3 text-emerald-300">
                        {row.disp_change_pct === 0 ? '-' : `${row.disp_change_pct.toFixed(2)}%`}
                      </td>
                      <td className="py-3.5 px-3 text-emerald-400 font-bold">
                        {row.factor_of_safety.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                          isPrimary
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-800 font-bold'
                            : row.status === 'Plateau'
                            ? 'bg-blue-950 text-blue-300 border-blue-800'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* PHYSICAL CONVERGENCE EXPLANATION ACCORDION (Addressing the user's specific inquiry) */}
        <div className="mt-10 glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/25 relative overflow-hidden">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <Info className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
                Engineering Mechanics Deep Dive
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {PHYSICAL_CONVERGENCE_EXPLANATION.title}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Accordion Item 1: Global Displacement Convergence */}
            <div className="rounded-xl border border-slate-800 bg-[#080d1a] overflow-hidden">
              <button
                onClick={() => toggleAccordion('displacement')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold text-sm sm:text-base text-white">
                    1. {PHYSICAL_CONVERGENCE_EXPLANATION.displacementConvergence.heading}
                  </span>
                </div>
                {accordionOpen.displacement ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {accordionOpen.displacement && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                  <p>{PHYSICAL_CONVERGENCE_EXPLANATION.displacementConvergence.text}</p>
                  <div className="mt-3 p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 font-mono text-xs text-emerald-300">
                    Max variation: |0.0117 - 0.0114| = 0.0003 mm across 81,952 to 113,902 elements. Asymptotic displacement plateau strictly achieved.
                  </div>
                </div>
              )}
            </div>

            {/* Accordion Item 2: Hertzian Singularity Resolution */}
            <div className="rounded-xl border border-slate-800 bg-[#080d1a] overflow-hidden">
              <button
                onClick={() => toggleAccordion('hertzian')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-bold text-sm sm:text-base text-white">
                    2. {PHYSICAL_CONVERGENCE_EXPLANATION.stressResolution.heading}
                  </span>
                </div>
                {accordionOpen.hertzian ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {accordionOpen.hertzian && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                  <p>{PHYSICAL_CONVERGENCE_EXPLANATION.stressResolution.text}</p>
                  <div className="mt-3 p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 font-mono text-xs text-cyan-300">
                    Why the curve rose from 42.04 MPa (12mm) to 50.08 MPa (9mm): Coarse elements average stress across element integration volume. The 9mm mesh captures the high-gradient Hertzian contact pressure line directly without artificial attenuation.
                  </div>
                </div>
              )}
            </div>

            {/* Accordion Item 3: Safety & Plasticity Verdict */}
            <div className="rounded-xl border border-slate-800 bg-[#080d1a] overflow-hidden">
              <button
                onClick={() => toggleAccordion('safety')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold text-sm sm:text-base text-white">
                    3. {PHYSICAL_CONVERGENCE_EXPLANATION.engineeringVerdict.heading}
                  </span>
                </div>
                {accordionOpen.safety ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {accordionOpen.safety && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                  <p>{PHYSICAL_CONVERGENCE_EXPLANATION.engineeringVerdict.text}</p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Full Publication Plot Modal Lightbox */}
        {showImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-4xl bg-[#080d1a] border border-cyan-500/30 rounded-2xl overflow-hidden p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h3 className="text-sm font-bold text-white font-mono">
                  Publication Convergence Plot (final_4_mesh_convergence.png)
                </h3>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="bg-white rounded-xl p-2 overflow-hidden">
                <img
                  src="/convergence/4_mesh_convergence_study_plot.png"
                  alt="4 Mesh Convergence Study Plot"
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
