import { requireAuth, checkPermission } from '@/routes';
import { injectReducer } from '@/store/reducers';
import { reducer } from './redux/ads';
import AdsLayout from './layouts/AdsLayout';
import AdAccountListPage from './pages/AdAccountListPage';

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
    component: AdAccountListPage,
    onEnter: (nextState, replace, callback) => checkPermission(['ads:list'], store, callback),
  },
});
