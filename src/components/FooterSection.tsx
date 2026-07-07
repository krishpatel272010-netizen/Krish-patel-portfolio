import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="relative py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[12vw] md:text-[8vw] font-black italic tracking-tighter leading-none mb-16 text-white"
        >
          LET'S SHOOT.
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8">
          <SocialLink 
            href="https://www.instagram.com/4ura_.verse?igsh=ZGJ4ZGZrdGh4Zm8="
            label="Auraverse Instagram" 
          />
          <SocialLink 
            href="https://www.instagram.com/kri5u_?igsh=NWZpeWNiOXBid3ds"
            label="Personal Instagram" 
          />
          <SocialLink 
            href="mailto:krishpatel9723@gmail.com"
            label="krishpatel9723@gmail.com" 
          />
        </div>
      </div>
      
      <div className="mt-32 pt-8 border-t border-white/10 flex justify-between items-center text-slate-500 font-mono text-[11px] uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Krish Patel.</p>
        <p>All Rights Reserved.</p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string, label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest hover:text-cyan-400 transition-colors duration-300"
      whileHover={{ y: -2 }}
    >
      {label}
      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
    </motion.a>
  );
}
