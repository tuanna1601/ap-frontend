import { requireAuth, checkPermission } from '@/routes';
import { injectReducer } from '@/store/reducers';
import { reducer } from './redux/report';
import ReportLayout from './layouts/ReportLayout';
import ReportInventoryPage from './pages/ReportInventoryPage';
import ReportAdsPage from './pages/ReportAdsPage';

export default (store) => ({
  path: 'report',
  getComponent(nextState, callback) {
    require.ensure([], () => {
      injectReducer(store, {
        key: 'report',
        reducer,
      });

      callback(null, ReportLayout);
    }, 'report');
  },
  onEnter: (nextState, replace, callback) => requireAuth(store, callback),
  indexRoute: {
    component: ReportInventoryPage,
    onEnter: (nextState, replace, callback) => checkPermission(['report:inventory'], store, callback),
  },
  childRoutes: [
    {
      path: 'ads',
      component: ReportAdsPage,
      onEnter: (nextState, replace, callback) => checkPermission(['report:ads'], store, callback),
    },
  ],
});
