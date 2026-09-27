import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LightboxProvider } from './hooks/useLightbox.jsx';
import { useScrollReveal } from './hooks/useScrollReveal';
import ScrollManager from './components/ScrollManager/ScrollManager.jsx';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';
import Lightbox from './components/Lightbox/Lightbox.jsx';
import Home from './pages/Home/Home.jsx';

const Wholesale = lazy(() => import('./pages/Wholesale/Wholesale.jsx'));

export default function App() {
  useScrollReveal();

  return (
    <LightboxProvider>
      <ScrollManager />
      <Header />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      <Footer />
      <Lightbox />
      <BackToTop />
    </LightboxProvider>
  );
}
