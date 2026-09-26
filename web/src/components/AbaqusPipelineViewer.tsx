import { useState } from 'react';
import { 
  Layers, 
  ExternalLink, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Maximize2 
} from 'lucide-react';
import { ABAQUS_PIPELINE_STEPS } from '../data/simulationData';
import type { PipelineStep } from '../data/simulationData';

export const AbaqusPipelineViewer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalStep, setActiveModalStep] = useState<PipelineStep | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Assembly',
    'Step',
    'Interaction',
    'Coupling',
    'Loads & BCs',
    'Meshing',
    'Job & ODB'
  ];

  const filteredSteps = ABAQUS_PIPELINE_STEPS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.module.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNextStep = () => {
    if (!activeModalStep) return;
    const currentIndex = ABAQUS_PIPELINE_STEPS.findIndex((s) => s.id === activeModalStep.id);
    const nextIndex = (currentIndex + 1) % ABAQUS_PIPELINE_STEPS.length;
    setActiveModalStep(ABAQUS_PIPELINE_STEPS[nextIndex]);
  };

  const handlePrevStep = () => {
    if (!activeModalStep) return;
    const currentIndex = ABAQUS_PIPELINE_STEPS.findIndex((s) => s.id === activeModalStep.id);
    const prevIndex = (currentIndex - 1 + ABAQUS_PIPELINE_STEPS.length) % ABAQUS_PIPELINE_STEPS.length;
    setActiveModalStep(ABAQUS_PIPELINE_STEPS[prevIndex]);
  };

  return (
    <section id="pipeline" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Complete GUI Audit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Abaqus/CAE <span className="text-cyan-400">Pipeline Gallery</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            20 high-resolution software GUI screenshots documenting every step of the simulation workflow: from 3D assembly and general contact definition to C3D10 meshing and ODB post-processing.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
                {cat === 'All' && ` (${ABAQUS_PIPELINE_STEPS.length})`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search steps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSteps.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalStep(item)}
              className="glass-panel glass-panel-hover rounded-xl overflow-hidden cursor-pointer group flex flex-col justify-between border border-slate-800/90"
            >
              {/* Screenshot Preview */}
              <div className="relative aspect-[16/10] bg-[#02040a] overflow-hidden border-b border-slate-800">
                <img
                  src={item.screenshot}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Step Pill */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-cyan-300 font-bold">
                  Step {item.step.toString().padStart(2, '0')}
                </div>

                {/* Category Pill */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-slate-300">
                  {item.category}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-cyan-500 text-black shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Step Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    {item.module}
                  </span>
                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Key Settings Tags */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1">
                  {item.keySettings.slice(0, 2).map((ks, kIdx) => (
                    <span
                      key={kIdx}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {ks.label}: <strong className="text-cyan-400">{ks.value}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activeModalStep && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-5xl bg-[#080d1a] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
              
              {/* Modal Header */}
              <div className="p-4 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                    Step {activeModalStep.step.toString().padStart(2, '0')} / 20
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {activeModalStep.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {activeModalStep.module} • {activeModalStep.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevStep}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                    title="Previous Step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                    title="Next Step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveModalStep(null)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400 hover:bg-slate-700 ml-2"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
                
                {/* Full-res Image */}
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#02040a]">
                  <img
                    src={activeModalStep.screenshot}
                    alt={activeModalStep.title}
                    className="w-full max-h-[58vh] object-contain mx-auto"
                  />
                </div>

                {/* Description & Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="md:col-span-2 space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Engineering Context &amp; Rationale
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeModalStep.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                      Key Abaqus Parameters
                    </h4>
                    <div className="space-y-1.5">
                      {activeModalStep.keySettings.map((ks, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono flex justify-between">
                          <span className="text-slate-400">{ks.label}:</span>
                          <span className="text-cyan-300 font-bold">{ks.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-[#0f172a] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Use keyboard arrows or buttons to step through all 20 Abaqus stages</span>
                <a
                  href={activeModalStep.screenshot}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:underline font-mono"
                >
                  <span>Open Full Screenshot</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
