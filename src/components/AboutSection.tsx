import { motion, Variants } from 'motion/react';

const badges = [
  "CapCut", 
  "After Motion Z", 
  "Raw Footage Processing", 
  "Directing", 
  "Shooting"
];

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight"
          >
            The Creative Pipeline
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 font-inter leading-relaxed"
          >
            I handle the entire creative pipeline—from capturing the raw energy on set to polishing the final cut. Whether framing the heavy-duty scale of industrial sites, the high-octane thrill of a car delivery, or the unique vibe of local shops, my goal is to create cinematic, scroll-stopping content.
          </motion.p>
        </div>

        <div className="flex flex-col gap-8">
          <motion.h3 
            variants={itemVariants}
            className="font-mono text-[10px] uppercase tracking-widest text-slate-500"
          >
            Toolkit & Skills
          </motion.h3>
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-2"
          >
            {badges.map((badge, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                className="px-3 py-1 border border-white/20 rounded-full text-[11px] font-mono uppercase cursor-default transition-all duration-300 text-white"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
