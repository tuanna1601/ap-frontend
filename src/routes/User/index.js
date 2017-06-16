import { requireAuth, checkPermission } from '@/routes';
import { injectReducer } from '@/store/reducers';
import UserLayout from './layouts/UserLayout';
import UserListPage from './pages/UserListPage';
import { reducer } from './redux/user';

export default (store) => ({
  path: 'user',
  getComponent(nextState, callback) {
    require.ensure([], () => {
      injectReducer(store, {
        key: 'user',
        reducer,
      });

      callback(null, UserLayout);
    }, 'user');
  },
  onEnter: (nextState, replace, callback) => requireAuth(store, callback),
  indexRoute: {
    component: UserListPage,
    onEnter: (nextState, replace, callback) => checkPermission(['user:list'], store, callback),
  }
});
