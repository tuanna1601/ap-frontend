import { requireAuth, checkPermission } from '@/routes';
import { injectReducer } from '@/store/reducers';
import { reducer } from './redux/department';
import DepartmentLayout from './layouts/DepartmentLayout';
import DepartmentIndexPage from './pages/DepartmentIndexPage';
import DepartmentStepPage from './pages/DepartmentStepPage';
import DepartmentTree from './components/DepartmentTreeContainer';

export default (store) => ({
  path: 'department',
  getComponent(nextState, callback) {
    require.ensure([], () => {
      injectReducer(store, {
        key: 'department',
        reducer,
      });

      callback(null, DepartmentLayout);
    }, 'department');
  },
  onEnter: (nextState, replace, callback) => requireAuth(store, callback),
  indexRoute: {
    component: DepartmentIndexPage,
    onEnter: (nextState, replace, callback) => checkPermission(['department:list'], store, callback),
  },
  childRoutes: [
    {
      path: 'tree',
      component: DepartmentTree,
      onEnter: (nextState, replace, callback) => checkPermission(['department:update'], store, callback),
    },
    {
      path: 'steps',
      component: DepartmentStepPage,
    }
  ],
});
