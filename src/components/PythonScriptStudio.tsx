import { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Terminal 
} from 'lucide-react';
import { PYTHON_SCRIPTS } from '../data/simulationData';
import type { PythonScriptItem } from '../data/simulationData';

export const PythonScriptStudio: React.FC = () => {
  const [activeScript, setActiveScript] = useState<PythonScriptItem>(PYTHON_SCRIPTS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([activeScript.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = activeScript.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="scripts" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fully Reproducible CAE Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Abaqus Python <span className="text-cyan-400">Automation Studio</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Production-ready Abaqus Python automation scripts developed and tested against Abaqus 2024. 
            Inspect, copy, or download the full parametric pipeline for automated pre-processing, solver execution, and ODB extraction.
          </p>
        </div>

        {/* Script Selection Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {PYTHON_SCRIPTS.map((script) => (
            <button
              key={script.id}
              onClick={() => setActiveScript(script)}
              className={`p-3 rounded-xl text-left border transition-all ${
                activeScript.id === script.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono text-cyan-400 uppercase">
                {script.filename.substring(0, 2)}
              </div>
              <div className="text-xs font-bold truncate mt-0.5">
                {script.filename}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">
                {script.lines} lines
              </div>
            </button>
          ))}
        </div>

        {/* Script Details Card & Code Viewer */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-cyan-500/25 shadow-2xl">
          
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  {activeScript.stage}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeScript.lines} lines of code
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                {activeScript.filename}
              </h3>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors shadow-md shadow-cyan-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .py</span>
              </button>
            </div>
          </div>

          {/* Description & API Tag Cloud */}
          <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <p className="text-slate-300 max-w-2xl leading-relaxed">
              {activeScript.description}
            </p>
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-mono text-slate-500 mr-1">Primary APIs:</span>
              {activeScript.primaryApis.map((api, idx) => (
                <code
                  key={idx}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400"
                >
                  {api}
                </code>
              ))}
            </div>
          </div>

          {/* Code Body */}
          <div className="relative bg-[#02040a] max-h-[500px] overflow-y-auto p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300">
            <pre className="overflow-x-auto">
              <code>{activeScript.code}</code>
            </pre>
          </div>

          {/* Terminal Run Guide Footer */}
          <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                CLI Execution: <code className="text-cyan-300">abaqus cae noGUI={activeScript.filename}</code>
              </span>
            </div>
            <div className="text-slate-400">
              GUI Execution: <code className="text-slate-200">File → Run Script... → {activeScript.filename}</code>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
