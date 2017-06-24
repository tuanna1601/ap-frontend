import HTTP from '@/helpers/http';
import * as _ from 'lodash';
import moment from 'moment';
import * as jwt from 'jsonwebtoken';

const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
const LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
const SWITCH_LOGIN = 'AUTH_SWITCH_LOGIN';
const SWITCH_REGISTER = 'AUTH_SWITCH_REGISTER';
const BEFORE_LOADING = 'AUTH_BEFORE_LOADING';
const AFTER_LOADING = 'AUTH_AFTER_LOADING';
const LOGOUT = 'AUTH_LOGOUT';
const BEFORE_RENEW_TOKEN = 'AUTH_BEFORE_RENEW_TOKEN';
const AFTER_RENEW_TOKEN = 'AUTH_AFTER_RENEW_TOKEN';
const SET_CURRENT_USER = 'AUTH_SET_CURRENT_USER';

/*
 * Actions
 */
export function onBeforeLoading() {
  return {
    type: BEFORE_LOADING,
  };
}

export function onAfterLoading() {
  return {
    type: AFTER_LOADING,
  };
}

export function onAuthSuccess(token) {
  // save to session

  const user = jwt.decode(token);

  sessionStorage.setItem('token', token);
  sessionStorage.setItem('tokenExpiredAt', moment().valueOf());
  sessionStorage.setItem('currentUser', JSON.stringify(user));

  return {
    type: LOGIN_SUCCESS,
    token,
    scope: user.scope
  };
}

export function onAuthError(lastURL) {
  // remove from session
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('tokenExpiredAt');

  return {
    type: LOGIN_FAILURE,
    lastURL,
  };
}

export function onLogout() {
  return {
    type: LOGOUT,
  };
}

export function goLogin() {
  return {
    type: SWITCH_LOGIN,
  };
}

export function setCurrentUser(user) {
  // save to session
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logout(callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    sessionStorage.clear();

    dispatch(onLogout());
    if (callback) {
      callback();
    }
  };
}

export function onBeforeRenew() {
  return {
    type: BEFORE_RENEW_TOKEN,
  };
}

export function onAfterRenew() {
  return {
    type: AFTER_RENEW_TOKEN,
  };
}

export function renew() {
  return (dispatch, getState) => {
    // const auth = getState().auth;
    // if (!auth) {
    //   return;
    // }

    // dispatch(onBeforeRenew());
    // HTTP.get(auth, `${__CONFIG__.API.SERVER_URL}/users/renew-token`, dispatch, (data) => {
    //   dispatch(onAuthSuccess(data.token));
    // }).then(() => {
    //   dispatch(onAfterRenew());
    // });
  };
}

export function getCurrentUser() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    HTTP.get(auth, `${__CONFIG__.API.SERVER_URL}/users/me`, dispatch, (user) => {
      dispatch(setCurrentUser(user));
    });
  };
}

export function login(email, password, callback) {
  return (dispatch) => {
    dispatch(onBeforeLoading());

    HTTP.post({ email, password }, false, `${__CONFIG__.API.SERVER_URL}/users/login`, dispatch, (data) => {
      dispatch(onAuthSuccess(data.token));

      if (callback) {
        callback(data);
      }
    }).then(() => {
      dispatch(onAfterLoading());
    });
  };
}

export function googleLogin(token, callback) {
  return (dispatch) => {
    dispatch(onBeforeLoading());

    HTTP.post({ token }, false, `${__CONFIG__.API.SERVER_URL}/users/login-google`, dispatch, (data) => {
      dispatch(onAuthSuccess(data.token));

      if (callback) {
        callback(data);
      }
    }).then(() => {
      dispatch(onAfterLoading());
    });
  };
}

export function changePassword(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onBeforeLoading());

    HTTP.post(values, auth, `${__CONFIG__.API.SERVER_URL}/users/me/password`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
    }).then(() => dispatch(onAfterLoading()));
  };
}

/*
 * Initial state
 */
const initialState = {
  isLoggedIn: !_.isEmpty(sessionStorage.getItem('token')),
  mode: 'login',
  isLoading: false,
  token: sessionStorage.getItem('token'),
  expiredAt: !_.isEmpty(sessionStorage.getItem('tokenExpiredAt'))
    ? Number(sessionStorage.getItem('tokenExpiredAt'))
    : 0,
  isRenewingToken: false,
  user: !_.isEmpty(sessionStorage.getItem('currentUser'))
    ? JSON.parse(sessionStorage.getItem('currentUser'))
    : { scope: [] },
};

/*
 * Reducer
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case BEFORE_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case AFTER_LOADING:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case SWITCH_LOGIN:
      return Object.assign({}, state, {
        mode: 'login',
      });
    case SWITCH_REGISTER:
      return Object.assign({}, state, {
        mode: 'register',
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        token: action.token,
        expiredAt: moment().valueOf(),
        lastURL: undefined,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isLoggedIn: false,
        token: undefined,
        expiredAt: 0,
        lastURL: state.lastURL ? state.lastURL : action.lastURL,
      });
    case BEFORE_RENEW_TOKEN:
      return Object.assign({}, state, {
        isRenewingToken: true,
      });
    case AFTER_RENEW_TOKEN:
      return Object.assign({}, state, {
        isRenewingToken: false,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        token: undefined,
        expiredAt: 0,
        lastURL: undefined,
      });
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        user: action.user,
      });
    default:
      return state;
  }
}
