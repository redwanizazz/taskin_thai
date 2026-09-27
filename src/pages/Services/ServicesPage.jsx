import { lazy, Suspense } from 'react';
import { useRouteMetaTags } from '../../hooks/useRouteMetaTags';

const Services = lazy(() => import('../../components/Services/Services.jsx'));

const ServicesPage = () => {
  useRouteMetaTags({
    title: 'Our Services — Quality Assurance, Import & Export, Wholesale | Taskin Thai',
    description:
      'Discover the services offered by Taskin Thai Vegetables & Fruits Sdn Bhd — quality assurance, customer support, import & export operations, and wholesale distribution across Malaysia.',
    path: '/services',
  });

  return (
    <main>
      <Suspense fallback={null}>
        <Services />
      </Suspense>
    </main>
  );
};

export default ServicesPage;
