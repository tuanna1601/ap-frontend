import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { responsiveStateReducer as browser } from 'redux-responsive';
import { reducer as auth } from '@/routes/Auth/redux/auth';
import { reducer as theme } from './theme';
import { reducer as modal } from './modal';
import { reducer as common } from './common';

export const makeRootReducer = (asyncReducers) => combineReducers({
  // Add sync reducers here
  router,
  form,
  theme,
  modal,
  auth,
  browser,
  common,
  ...asyncReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};
