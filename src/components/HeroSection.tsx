import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'motion/react';
import * as THREE from 'three';

function AuraSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock, mouse }) => {
    if (!sphereRef.current) return;
    
    // Tie rotation to time
    sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    
    // Slight parallax based on mouse
    sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, (mouse.x * 2), 0.05);
    sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, (mouse.y * 2), 0.05);
    
    // Scroll interaction
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Scale down and move back slightly as we scroll down
    const scale = THREE.MathUtils.lerp(2, 1, scrollProgress * 2);
    sphereRef.current.scale.set(scale, scale, scale);
    sphereRef.current.position.z = THREE.MathUtils.lerp(0, -5, scrollProgress * 2);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 64, 64]}>
        <MeshDistortMaterial 
          color="#9d4edd" 
          attach="material" 
          distort={0.4} 
          speed={1.5} 
          roughness={0.2}
          metalness={0.8}
          emissive="#5a189a"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          <AuraSphere />
        </Canvas>
      </div>

      {/* Content overlay */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center text-center px-4 mix-blend-difference"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400 mb-4"
        >
          Film Your Aura with Auraverse
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-7xl md:text-[140px] font-black leading-[0.8] tracking-tighter text-white mb-6"
        >
          KRISH<br className="hidden md:block"/> PATEL
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl font-light text-slate-400 max-w-lg mb-10"
        >
          Cinematographer & Video Editor <span className="text-white">based in Mehsana, Gujarat.</span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToPortfolio}
          className="px-8 py-4 bg-transparent border border-white/20 text-white font-mono text-sm uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
        >
          Enter the Auraverse
        </motion.button>
      </motion.div>
    </section>
  );
}
