/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SmoothScroll from './components/SmoothScroll';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import FooterSection from './components/FooterSection';

export default function App() {
  return (
    <SmoothScroll>
      <main className="bg-[#050505] text-slate-100 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
          <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <FooterSection />
        </div>
      </main>
    </SmoothScroll>
  );
}
