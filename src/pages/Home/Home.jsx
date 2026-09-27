import { lazy, Suspense } from 'react';
import Hero from '../../components/Hero/Hero.jsx';
import WaveDivider from '../../components/WaveDivider/WaveDivider.jsx';

// Lazy-load below-the-fold sections for optimal initial bundle performance
const About = lazy(() => import('../../components/About/About.jsx'));
const Welcome = lazy(() => import('../../components/Welcome/Welcome.jsx'));
const MissionVision = lazy(() => import('../../components/MissionVision/MissionVision.jsx'));
const Directors = lazy(() => import('../../components/Directors/Directors.jsx'));
const CompanyInfo = lazy(() => import('../../components/CompanyInfo/CompanyInfo.jsx'));
const Team = lazy(() => import('../../components/Team/Team.jsx'));
const Facilities = lazy(() => import('../../components/Facilities/Facilities.jsx'));
const Products = lazy(() => import('../../components/Products/Products.jsx'));
const Services = lazy(() => import('../../components/Services/Services.jsx'));
const Contact = lazy(() => import('../../components/Contact/Contact.jsx'));

const Home = () => {
  return (
    <main>
      <Hero />

      <WaveDivider fill="#ffffff" bg="#faf8f2" />

      <Suspense fallback={null}>
        <About />
        <Welcome />
        <MissionVision />
      </Suspense>

      <WaveDivider fill="#F7F5F0" variant="up" bg="#3F4B27" />

      <Suspense fallback={null}>
        <Directors />
        <CompanyInfo />
        <Team />
        <Facilities />
        <Products />
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
