import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from '../components/layout/SmoothScroll';
import { CustomCursor } from '../components/layout/CustomCursor';
import { SplashScreen } from '../components/layout/SplashScreen';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { useUIStore } from './store/ui.store';

const Home = lazy(() => import('../pages/Home'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgb(var(--bg))]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[rgb(var(--accent))] border-t-transparent" />
    </div>
  );
}

export default function App() {
  const splashDone = useUIStore((s) => s.splashDone);

  return (
    <HashRouter>
      <ScrollToTop />
      <CustomCursor />
      {!splashDone ? (
        <SplashScreen />
      ) : (
        <SmoothScroll>
          <Suspense fallback={<Loader />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </SmoothScroll>
      )}
    </HashRouter>
  );
}
