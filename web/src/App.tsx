import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DesignParameters } from './components/DesignParameters';
import { AbaqusPipelineViewer } from './components/AbaqusPipelineViewer';
import { ConvergenceStudy } from './components/ConvergenceStudy';
import { ResultsViewer9mm } from './components/ResultsViewer9mm';
import { VideoTheater } from './components/VideoTheater';
import { PythonScriptStudio } from './components/PythonScriptStudio';
import { SlideDeckViewer } from './components/SlideDeckViewer';
import { EngineeringConclusions } from './components/EngineeringConclusions';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'specifications',
        'pipeline',
        'convergence',
        'results-9mm',
        'videos',
        'scripts',
        'presentation'
      ];
      
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Showcase */}
        <Hero />

        {/* 2. Analytical Gear Design & Force Calculations */}
        <DesignParameters />

        {/* 3. 20-Step Abaqus/CAE Workflow Gallery */}
        <AbaqusPipelineViewer />

        {/* 4. 4-Mesh Convergence Study & Asymptotic Stability */}
        <ConvergenceStudy />

        {/* 5. Primary 9mm ODB Field Contours & Integrity */}
        <ResultsViewer9mm />

        {/* 6. Transient Dynamics Simulation Video Theater */}
        <VideoTheater />

        {/* 7. Python Automation Script Studio */}
        <PythonScriptStudio />

        {/* 8. 25-Slide Presentation Deck Viewer */}
        <SlideDeckViewer />

        {/* 9. Synthesis & Viva Defense FAQ */}
        <EngineeringConclusions />
      </main>

      {/* Rich Project Footer */}
      <Footer />
    </div>
  );
}

export default App;
