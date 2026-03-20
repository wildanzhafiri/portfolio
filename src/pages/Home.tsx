import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { TechStack } from '../components/sections/TechStack';
import { Projects } from '../components/sections/Projects';
import { Experience } from '../components/sections/Experience';
import { Playground } from '../components/sections/Playground';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';
import { ScrollProgress } from '../components/ui/ScrollProgress';

export default function Home() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ScrollProgress />
      <Navbar />
      <main>
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><TechStack /></ErrorBoundary>
        <ErrorBoundary><Experience /></ErrorBoundary>
        <ErrorBoundary><Projects /></ErrorBoundary>
        <ErrorBoundary><Playground /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
      </main>
      <Footer />
    </motion.div>
  );
}
