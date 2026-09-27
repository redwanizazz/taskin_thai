import { lazy, Suspense } from 'react';
import { useRouteMetaTags } from '../../hooks/useRouteMetaTags';
import WaveDivider from '../../components/WaveDivider/WaveDivider.jsx';

const Services = lazy(() => import('../../components/Services/Services.jsx'));

const ServicesPage = () => {
  useRouteMetaTags({
    title: 'Our Services — Quality Assurance, Import & Export, Wholesale | Taskin Thai',
    description:
      'Discover the services offered by Taskin Thai Vegetables & Fruits Sdn Bhd — quality assurance, customer support, import & export operations, and wholesale distribution across Malaysia.',
    path: '/services',
  });

  return (
    <main style={{ paddingTop: '80px' }}>
      <Suspense fallback={null}>
        <Services isTeaser={false} />
      </Suspense>

      <WaveDivider fill="#2C3419" variant="up" bg="#ffffff" />
    </main>
  );
};

export default ServicesPage;
