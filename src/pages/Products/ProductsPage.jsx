import { lazy, Suspense } from 'react';
import { useRouteMetaTags } from '../../hooks/useRouteMetaTags';

const Products = lazy(() => import('../../components/Products/Products.jsx'));

const ProductsPage = () => {
  useRouteMetaTags({
    title: 'Our Products — Fresh Produce Catalogue | Taskin Thai Malaysia',
    description:
      'Browse the full catalogue of fresh fruits and vegetables from Taskin Thai Vegetables & Fruits Sdn Bhd. 29 products across 8 categories — alliums, chilies, root vegetables, leafy greens, herbs, and fruits.',
    path: '/products',
  });

  return (
    <main>
      <Suspense fallback={null}>
        <Products />
      </Suspense>
    </main>
  );
};

export default ProductsPage;
