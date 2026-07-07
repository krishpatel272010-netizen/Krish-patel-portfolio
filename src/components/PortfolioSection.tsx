import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Category = 'All' | 'Automotive' | 'Industrial' | 'Retail';

interface Project {
  id: string;
  title: string;
  category: Category;
  videoUrl: string;
  poster: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Car Delivery Edit',
    category: 'Automotive',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Heavy Machinery Overview',
    category: 'Industrial',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Local Shop Vibe',
    category: 'Retail',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Royal Enfield Cinematic',
    category: 'Automotive',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop'
  }
];

const categories: Category[] = ['All', 'Automotive', 'Industrial', 'Retail'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          Selected Works
        </h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-300 border",
                activeCategory === cat 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative aspect-[4/5] md:aspect-video rounded-xl overflow-hidden cursor-pointer bg-gradient-to-b from-slate-800 to-slate-900 border border-white/5 isolate"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Poster Image */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-700 z-10 mix-blend-overlay",
          isHovered ? "opacity-0" : "opacity-50"
        )}
        style={{ backgroundImage: `url(${project.poster})` }}
      />
      
      {/* Video Preview */}
      <video
        ref={videoRef}
        src={project.videoUrl}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />

      {/* Overlay */}
      <div 
        className={cn(
          "absolute inset-0 bg-cyan-900/10 z-20 transition-opacity duration-500 flex flex-col justify-end p-6",
          isHovered ? "opacity-40" : "opacity-100"
        )}
      >
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest mb-1">0{project.id} / {project.category}</p>
          <h3 className="text-xl font-bold text-white tracking-tight uppercase">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}
