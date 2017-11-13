import { requireAuth, checkPermission } from '@/routes';
import { injectReducer } from '@/store/reducers';
import { reducer } from './redux/taboo';
import TabooLayout from './layouts/TabooLayout';
import TabooListPage from './pages/TabooListPage';

export default (store) => ({
  path: 'taboo',
  getComponent(nextState, callback) {
    require.ensure([], () => {
      injectReducer(store, {
        key: 'taboo',
        reducer,
      });

      callback(null, TabooLayout);
    }, 'taboo');
  },
  onEnter: (nextState, replace, callback) => requireAuth(store, callback),
  indexRoute: {
    component: TabooListPage,
    onEnter: (nextState, replace, callback) => checkPermission(['taboo:list'], store, callback),
  },
});
