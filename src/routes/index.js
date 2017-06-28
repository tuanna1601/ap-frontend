// We only need to import the modules necessary for initial render
import { push } from 'react-router-redux';
import * as _ from 'lodash';
import CoreLayout from '@/layouts/CoreLayout/CoreLayoutContainer';
import HomeRoute from './Home';
import AuthRoute from './Auth';
import UserRoute from './User';
import InventoryRoute from './Inventory';
import DepartmentRoute from './Department';
import CriteriaRoute from './Criteria';
import AdsRoute from './Ads';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute(store),
  childRoutes: [
    AuthRoute(store),
    UserRoute(store),
    InventoryRoute(store),
    DepartmentRoute(store),
    CriteriaRoute(store),
    AdsRoute(store),
  ],
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;

export function requireAuth(store, callback) {
  const auth = store.getState().auth;
  return (auth && auth.isLoggedIn && auth.token) ? callback() : store.dispatch(push('/auth'));
}

export function checkPermission(requiredPermissions, store, callback) {
  // const auth = store.getState().auth;

  return callback();
  // return (auth && auth.isLoggedIn && auth.token && _.intersection(auth.user.permissions, requiredPermissions).length)
  //   ? callback()
  //   : store.dispatch(push('/auth'));
}

