import { requireAuth, checkPermission } from '@/routes';
import { injectReducer } from '@/store/reducers';
import { reducer } from './redux/ads';
import AdsLayout from './layouts/AdsLayout';
import AdsListPage from './pages/AdsListPage';
import AdAccountListPage from './pages/AdAccountListPage';
import AdsReportPage from './pages/AdsReportPage';
import AdsReviewPage from './pages/AdsReviewPage';
import AdsReportListPage from './pages/AdsReportListPage';
import AdsFlaggedListPage from './pages/AdsFlaggedListPage';

export default (store) => ({
  path: 'ads',
  getComponent(nextState, callback) {
    require.ensure([], () => {
      injectReducer(store, {
        key: 'ads',
        reducer,
      });

      callback(null, AdsLayout);
    }, 'ads');
  },
  onEnter: (nextState, replace, callback) => requireAuth(store, callback),
  indexRoute: {
    component: AdsListPage,
    onEnter: (nextState, replace, callback) => checkPermission(['ads:list'], store, callback),
  },
  childRoutes: [
    {
      path: 'accounts',
      component: AdAccountListPage,
      onEnter: (nextState, replace, callback) => checkPermission(['ads-account:list'], store, callback),
    },
    {
      path: 'review',
      component: AdsReviewPage,
      onEnter: (nextState, replace, callback) => checkPermission(['ads:review'], store, callback),
    },
    {
      path: 'report',
      component: AdsReportPage,
      onEnter: (nextState, replace, callback) => checkPermission(['ads:report'], store, callback),
    },
    {
      path: 'reports',
      component: AdsReportListPage,
      onEnter: (nextState, replace, callback) => checkPermission(['ads:report'], store, callback),
    },
    {
      path: 'flagged',
      component: AdsFlaggedListPage,
      onEnter: (nextState, replace, callback) => checkPermission(['ads:list'], store, callback),
    }
  ]
});
