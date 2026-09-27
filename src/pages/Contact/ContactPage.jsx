import { lazy, Suspense } from 'react';
import { useRouteMetaTags } from '../../hooks/useRouteMetaTags';
import WaveDivider from '../../components/WaveDivider/WaveDivider.jsx';

const Contact = lazy(() => import('../../components/Contact/Contact.jsx'));

const ContactPage = () => {
  useRouteMetaTags({
    title: 'Contact Us — Taskin Thai Vegetables & Fruits Sdn Bhd',
    description:
      'Get in touch with Taskin Thai Vegetables & Fruits Sdn Bhd for wholesale enquiries, import & export partnerships, or any questions. Based in Batu Caves, Selangor, Malaysia.',
    path: '/contact',
  });

  return (
    <main>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>

      <WaveDivider fill="#2C3419" variant="up" bg="#3F4B27" />
    </main>
  );
};

export default ContactPage;
