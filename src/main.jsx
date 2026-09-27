import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { LightboxProvider } from './hooks/useLightbox.jsx';
import { useScrollReveal } from './hooks/useScrollReveal';
import './styles/global.css';

import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import WaveDivider from './components/WaveDivider/WaveDivider.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';
import Lightbox from './components/Lightbox/Lightbox.jsx';

// Lazy-load below-the-fold sections for performance
const About = lazy(() => import('./components/About/About.jsx'));
const Welcome = lazy(() => import('./components/Welcome/Welcome.jsx'));
const MissionVision = lazy(() => import('./components/MissionVision/MissionVision.jsx'));
const Directors = lazy(() => import('./components/Directors/Directors.jsx'));
const CompanyInfo = lazy(() => import('./components/CompanyInfo/CompanyInfo.jsx'));
const Team = lazy(() => import('./components/Team/Team.jsx'));
const Facilities = lazy(() => import('./components/Facilities/Facilities.jsx'));
const Products = lazy(() => import('./components/Products/Products.jsx'));
const Services = lazy(() => import('./components/Services/Services.jsx'));
const Contact = lazy(() => import('./components/Contact/Contact.jsx'));
const Footer = lazy(() => import('./components/Footer/Footer.jsx'));

function App() {
  useScrollReveal();

  return (
    <LightboxProvider>
      <Header />
      <Hero />

      <WaveDivider fill="#ffffff" />

      <Suspense fallback={null}>
        <About />
        <Welcome />
        <MissionVision />
      </Suspense>

      <WaveDivider fill="#F7F5F0" variant="up" />

      <Suspense fallback={null}>
        <Directors />
        <CompanyInfo />
        <Team />
        <Facilities />
        <Products />
        <Services />
      </Suspense>

      <WaveDivider fill="#3F4B27" />

      <Suspense fallback={null}>
        <Contact />
      </Suspense>

      <WaveDivider fill="#2C3419" variant="up" />

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Lightbox />
      <BackToTop />
    </LightboxProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
