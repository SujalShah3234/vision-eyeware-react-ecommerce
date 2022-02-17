import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';
import './shop.styles.css';

const CollectionsOverviewContainer = lazy(() =>
  import('../../components/collections-overview/collections-overview.container')
);
const CollectionPage = lazy(() => import('../collection/collection.component'));

export const ShopPage = () => (
  <div className='shop-page-container'>
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<CollectionsOverviewContainer />} />
        <Route path=':collectionId' element={<CollectionPage />} />
      </Routes>
    </Suspense>
  </div>
);

export default ShopPage;
