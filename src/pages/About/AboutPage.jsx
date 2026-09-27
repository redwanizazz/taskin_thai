import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouteMetaTags } from '../../hooks/useRouteMetaTags';
import WaveDivider from '../../components/WaveDivider/WaveDivider.jsx';

const About = lazy(() => import('../../components/About/About.jsx'));
const MissionVision = lazy(() => import('../../components/MissionVision/MissionVision.jsx'));
const Directors = lazy(() => import('../../components/Directors/Directors.jsx'));
const CompanyInfo = lazy(() => import('../../components/CompanyInfo/CompanyInfo.jsx'));
const Team = lazy(() => import('../../components/Team/Team.jsx'));
const Facilities = lazy(() => import('../../components/Facilities/Facilities.jsx'));

const AboutPage = () => {
  const location = useLocation();

  useRouteMetaTags({
    title: 'About Us — Taskin Thai Vegetables & Fruits Sdn Bhd',
    description:
      'Learn about Taskin Thai Vegetables & Fruits Sdn Bhd — our mission, vision, leadership team, company registration, facilities, and organisational structure. Based in Batu Caves, Selangor.',
    path: '/about',
  });

  // Ensure deep linking into /about#section scrolls to the section even with lazy chunks
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace(/^#/, '');
      const scrollToHash = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToHash()) {
        const interval = setInterval(() => {
          if (scrollToHash()) {
            clearInterval(interval);
          }
        }, 80);
        const timer = setTimeout(() => clearInterval(interval), 3000);
        return () => {
          clearInterval(interval);
          clearTimeout(timer);
        };
      }
    }
  }, [location.hash]);

  return (
    <main>
      <Suspense fallback={null}>
        <About />
      </Suspense>

      <WaveDivider fill="#2C3419" bg="#ffffff" />

      <Suspense fallback={null}>
        <MissionVision />
      </Suspense>

      <WaveDivider fill="#F7F5F0" variant="up" bg="#3F4B27" />

      <Suspense fallback={null}>
        <Directors />
        <CompanyInfo />
        <Team />
        <Facilities />
      </Suspense>
    </main>
  );
};

export default AboutPage;
