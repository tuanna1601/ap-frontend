import { requireAuth, checkPermission } from '@/routes';
import { injectReducer } from '@/store/reducers';
import { reducer } from './redux/inventory';
import InventoryLayout from './layouts/InventoryLayout';
import InventoryListPage from './pages/InventoryListPage';
import InventoryOrdinatorListPage from './pages/InventoryOrdinatorListPage';
import InventoryReviewerListPage from './pages/InventoryReviewerListPage';
import InventoryCreatePage from './pages/InventoryCreatePage';
import InventoryUpdatePage from './pages/InventoryUpdatePage';
import InventoryReviewPage from './pages/InventoryReviewPage';
import InventoryAdsCreatePage from './pages/InventoryAdsCreatePage';

export default (store) => ({
  path: 'inventory',
  getComponent(nextState, callback) {
    require.ensure([], () => {
      injectReducer(store, {
        key: 'inventory',
        reducer,
      });

      callback(null, InventoryLayout);
    }, 'inventory');
  },
  onEnter: (nextState, replace, callback) => requireAuth(store, callback),
  indexRoute: {
    component: InventoryListPage,
    onEnter: (nextState, replace, callback) => checkPermission(['inventory:list'], store, callback),
  },
  childRoutes: [
    {
      path: 'ordinator',
      component: InventoryOrdinatorListPage,
      onEnter: (nextState, replace, callback) => checkPermission(['inventory:list'], store, callback)
    },
    {
      path: 'reviewer',
      component: InventoryReviewerListPage,
      onEnter: (nextState, replace, callback) => checkPermission(['inventory:list'], store, callback)
    },
    {
      path: 'create',
      component: InventoryCreatePage,
      onEnter: (nextState, replace, callback) => checkPermission(['inventory:create'], store, callback)
    },
    {
      path: 'update',
      component: InventoryUpdatePage,
      onEnter: (nextState, replace, callback) => checkPermission(['inventory:update'], store, callback)
    },
    {
      path: 'review',
      component: InventoryReviewPage,
      onEnter: (nextState, replace, callback) => checkPermission(['inventory:review'], store, callback)
    },
    {
      path: 'ads-create',
      component: InventoryAdsCreatePage,
      onEnter: (nextState, replace, callback) => checkPermission(['inventory:update'], store, callback)
    }
  ]
});
