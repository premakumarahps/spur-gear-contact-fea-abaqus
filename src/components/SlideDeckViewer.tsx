import { useState, useEffect } from 'react';
import { 
  Presentation, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Play, 
  Pause, 
  Video, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { PRESENTATION_SLIDES } from '../data/simulationData';
import type { PresentationSlide } from '../data/simulationData';

export const SlideDeckViewer: React.FC = () => {
  const [selectedSlide, setSelectedSlide] = useState<PresentationSlide>(PRESENTATION_SLIDES[21]); // Default to Slide 22 (von Mises Stress + Video)
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [showVideoMode, setShowVideoMode] = useState<boolean>(false);

  const categories = ['All', 'Workflow', 'Results', 'Convergence', 'Conclusions', 'CAD'];

  const filteredSlides = PRESENTATION_SLIDES.filter((slide) => {
    if (activeCategory === 'All') return true;
    return slide.category === activeCategory;
  });

  const handleNext = () => {
    setShowVideoMode(false);
    const currentIndex = PRESENTATION_SLIDES.findIndex((s) => s.slideNumber === selectedSlide.slideNumber);
    const nextIndex = (currentIndex + 1) % PRESENTATION_SLIDES.length;
    setSelectedSlide(PRESENTATION_SLIDES[nextIndex]);
  };

  const handlePrev = () => {
    setShowVideoMode(false);
    const currentIndex = PRESENTATION_SLIDES.findIndex((s) => s.slideNumber === selectedSlide.slideNumber);
    const prevIndex = (currentIndex - 1 + PRESENTATION_SLIDES.length) % PRESENTATION_SLIDES.length;
    setSelectedSlide(PRESENTATION_SLIDES[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSlide]);

  // Slideshow auto-play timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedSlide]);

  return (
    <section id="presentation" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Presentation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic &amp; Industrial Defense</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Executive <span className="text-cyan-400">Presentation Deck</span> (26 Slides)
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Complete 26-slide presentation deck with high-resolution slide renders, embedded transient simulation animations, and academic viva defense justifications.
          </p>
        </div>

        {/* Filter and Download Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Slideshow Auto-Play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                isAutoPlaying
                  ? 'bg-emerald-500 text-black font-bold border-emerald-400 shadow-md shadow-emerald-500/30'
                  : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:bg-slate-800'
              }`}
              title={isAutoPlaying ? 'Pause Slideshow' : 'Start Auto-Play Slideshow'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Slideshow Playing' : 'Auto-Play'}</span>
            </button>

            <a
              href="/Simulation presentation.pptx"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PPTX</span>
            </a>
          </div>
        </div>

        {/* Presentation Viewer Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Slide Display */}
          <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden border border-cyan-500/20 flex flex-col justify-between">
            
            {/* Top Bar */}
            <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold shrink-0">
                  Slide {selectedSlide.slideNumber} / 26
                </span>
                <span className="text-white font-bold truncate">
                  {selectedSlide.title}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Animation/Video Switcher Button for slides with video */}
                {selectedSlide.videoUrl && (
                  <button
                    onClick={() => setShowVideoMode(!showVideoMode)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
                      showVideoMode
                        ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                        : 'bg-cyan-950 text-cyan-300 border-cyan-700 hover:bg-cyan-900'
                    }`}
                  >
                    {showVideoMode ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3 text-cyan-400" />}
                    <span>{showVideoMode ? 'View Slide Image' : 'Play Animation Video'}</span>
                  </button>
                )}

                <button
                  onClick={handlePrev}
                  className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Previous Slide (←)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Next Slide (→)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Body */}
            <div className="relative aspect-[16/9] bg-[#02040a] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              
              {/* If Video Mode is active on this slide, show embedded MP4 video */}
              {showVideoMode && selectedSlide.videoUrl ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <video
                    key={selectedSlide.videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain rounded-lg"
                  >
                    <source src={selectedSlide.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-300 border border-cyan-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Embedded Simulation Video</span>
                  </div>
                </div>
              ) : (
                /* Otherwise show high-res exported Slide Preview */
                <div 
                  className="w-full h-full relative cursor-pointer group flex items-center justify-center"
                  onClick={() => setModalOpen(true)}
                >
                  <img
                    key={selectedSlide.previewUrl}
                    src={selectedSlide.previewUrl}
                    alt={selectedSlide.title}
                    className="w-full h-full object-contain mx-auto rounded-lg shadow-2xl transition-all duration-300 group-hover:scale-[1.01]"
                  />
                  
                  {/* Hover Hint */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-cyan-500 text-black shadow-lg">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Animation indicator pill if video available */}
                  {selectedSlide.videoUrl && (
                    <div 
                      onClick={(e) => { e.stopPropagation(); setShowVideoMode(true); }}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 shadow-lg hover:bg-cyan-900 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Has Embedded Animation Video</span>
                    </div>
                  )}
                </div>
              )}

              {/* Progress Bar for Auto-Play Mode */}
              {isAutoPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500/20">
                  <div className="h-full bg-cyan-400 animate-[progress_5s_linear_infinite]" />
                </div>
              )}
            </div>

            {/* Bottom Key Points */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800 text-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Slide Key Takeaways &amp; Engineering Data
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSlide.keyPoints.map((pt, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px]"
                  >
                    • {pt}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: Slide Thumbnail Navigator */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">All 26 Slides</span>
              <span className="text-cyan-400 font-bold">100% Visualized</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredSlides.map((slide) => (
                <button
                  key={slide.slideNumber}
                  onClick={() => {
                    setShowVideoMode(false);
                    setSelectedSlide(slide);
                  }}
                  className={`w-full p-2 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
                    selectedSlide.slideNumber === slide.slideNumber
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {/* Mini slide thumbnail preview */}
                  <div className="w-14 h-9 bg-black rounded overflow-hidden shrink-0 border border-slate-700">
                    <img
                      src={slide.previewUrl}
                      alt={slide.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                      <span>Slide {slide.slideNumber.toString().padStart(2, '0')}</span>
                      {slide.videoUrl && (
                        <span className="text-[9px] px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          VIDEO
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-slate-200 truncate mt-0.5">
                      {slide.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Lightbox */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-6xl bg-[#080d1a] border border-cyan-500/30 rounded-2xl overflow-hidden p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs">
                    Slide {selectedSlide.slideNumber} / 26
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {selectedSlide.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {selectedSlide.videoUrl && (
                    <button
                      onClick={() => setShowVideoMode(!showVideoMode)}
                      className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono"
                    >
                      {showVideoMode ? 'Show Image' : 'Play Video'}
                    </button>
                  )}
                  <button
                    onClick={() => setModalOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="bg-[#02040a] rounded-xl p-2 max-h-[82vh] overflow-auto flex items-center justify-center">
                {showVideoMode && selectedSlide.videoUrl ? (
                  <video
                    key={selectedSlide.videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full max-h-[78vh] object-contain"
                  >
                    <source src={selectedSlide.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedSlide.previewUrl}
                    alt={selectedSlide.title}
                    className="w-full h-auto max-h-[78vh] object-contain mx-auto"
                  />
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
