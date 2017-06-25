import { requireAuth, checkPermission } from '@/routes';
import { injectReducer } from '@/store/reducers';
import { reducer } from './redux/criteria';
import CriteriaLayout from './layouts/CriteriaLayout';
import CriteriaListPage from './pages/CriteriaListPage';

export default (store) => ({
  path: 'criteria',
  getComponent(nextState, callback) {
    require.ensure([], () => {
      injectReducer(store, {
        key: 'criteria',
        reducer,
      });

      callback(null, CriteriaLayout);
    }, 'criteria');
  },
  onEnter: (nextState, replace, callback) => requireAuth(store, callback),
  indexRoute: {
    component: CriteriaListPage,
    onEnter: (nextState, replace, callback) => checkPermission(['criteria:list'], store, callback),
  },
});
