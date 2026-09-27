import { lazy, Suspense } from 'react';
import Hero from '../../components/Hero/Hero.jsx';
import WaveDivider from '../../components/WaveDivider/WaveDivider.jsx';

// Lazy-load below-the-fold sections
const Services = lazy(() => import('../../components/Services/Services.jsx'));
const Contact = lazy(() => import('../../components/Contact/Contact.jsx'));

const Home = () => {
  return (
    <main>
      <Hero />

      <WaveDivider fill="#ffffff" bg="#faf8f2" />

      <Suspense fallback={null}>
        <Services />
      </Suspense>

      <WaveDivider fill="#3F4B27" bg="#ffffff" />

      <Suspense fallback={null}>
        <Contact />
      </Suspense>

      <WaveDivider fill="#2C3419" variant="up" bg="#3F4B27" />
    </main>
  );
};

export default Home;
