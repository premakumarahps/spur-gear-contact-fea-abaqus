import { useState } from 'react';
import { 
  Play, 
  Film, 
  Download, 
  CheckCircle2 
} from 'lucide-react';
import { SIMULATION_VIDEOS } from '../data/simulationData';
import type { VideoMetadata } from '../data/simulationData';

export const VideoTheater: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoMetadata>(SIMULATION_VIDEOS[0]);

  return (
    <section id="videos" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transient Dynamics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Simulation <span className="text-cyan-400">Video Theater</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Dynamic temporal animations recorded directly from the 9mm converged Abaqus/Viewer session, capturing wave propagation, deflection, and tooth meshing.
          </p>
        </div>

        {/* Video Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {SIMULATION_VIDEOS.map((vid, idx) => (
            <button
              key={vid.id}
              onClick={() => setSelectedVideo(vid)}
              className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3 ${
                selectedVideo.id === vid.id
                  ? 'bg-cyan-500/15 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${
                selectedVideo.id === vid.id 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                <Play className="w-4 h-4 fill-current" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                  Animation {idx + 1} • {vid.duration}
                </span>
                <h3 className={`text-xs font-bold truncate ${
                  selectedVideo.id === vid.id ? 'text-cyan-300' : 'text-white'
                }`}>
                  {vid.title}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono mt-1 block truncate">
                  {vid.field}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Main Video Player Frame */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-cyan-500/25 shadow-2xl">
          
          {/* Top Video Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="font-bold text-white text-sm">
                {selectedVideo.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {selectedVideo.resolution} • {selectedVideo.fps}
              </span>
              <a
                href={selectedVideo.src}
                download
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors"
                title="Download original video file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download AVI</span>
              </a>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video max-h-[520px] bg-black flex items-center justify-center">
            <video
              key={selectedVideo.src}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-contain"
            >
              <source src={selectedVideo.src} type="video/mp4" />
              <source src={selectedVideo.src.replace('.mp4', '.avi')} type="video/x-msvideo" />
              Your browser does not support HTML5 MP4 video playback.
            </video>
          </div>

          {/* Video Engineering Insights Footer */}
          <div className="p-6 bg-slate-900/60 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="md:col-span-2 space-y-2">
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                  Analysis Description
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedVideo.summary}
                </p>
                <div className="pt-2 text-xs font-mono text-slate-400">
                  <span>Color Spectrum: </span>
                  <span className="text-slate-200">{selectedVideo.colorScheme}</span>
                </div>
              </div>

              <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                  Key Engineering Observations
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedVideo.engineeringTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
