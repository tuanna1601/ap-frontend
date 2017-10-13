import Alert from 'react-s-alert';
import { push } from 'react-router-redux';
import { onAuthError, renew } from '@/routes/Auth/redux/auth';
import moment from 'moment';
import * as _ from 'lodash';
import * as flatnest from 'flatnest';
import 'whatwg-fetch';

const TOKEN_DURATION = 1800000;

function renewToken(auth, dispatch) {
  const now = moment().valueOf();
  if (auth && now - auth.expiredAt > TOKEN_DURATION / 2 && !auth.isRenewingToken) {
    dispatch(renew());
  }
}

function addToken(options, auth) {
  return auth ? Object.assign({}, options, {
    headers: Object.assign({}, options.headers, {
      Authorization: `Bearer ${auth.token}`,
    }),
  }) : options;
}

function formatString(s) {
  return s.trim().replace(/[ ]+/g, ' ');
}

function formatPayload(payload) {
  const obj = _.isArray(payload) ? [] : {};
  _.forEach(payload, (v, k) => {
    if (_.isString(v)) {
      obj[k] = formatString(v);
    } else if (_.isArray(v)) {
      obj[k] = _.map(v, e => (_.isString(e) ? formatString(e) : e));
    } else if (_.isObject(v)) {
      obj[k] = formatPayload(v);
    } else {
      obj[k] = v;
    }
  });
  return obj;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(options, url, dispatch, onSuccess, onError) {
  return fetch(url, options)
    .then(checkStatus)
    .then(res => res.json())
    .then((data) => {
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    })
    .catch((error) => {
      // Default error handler
      const status = error.response ? error.response.status : 500;

      if (dispatch && status === 401) {
        const lastURL = location.pathname;
        dispatch(onAuthError(lastURL));
        dispatch(push('/auth'));
      }

      if (status >= 400 && status < 500) {
        // Display error message on screen
        const errorObject = error.response.json();
        errorObject.then((data) => {
          if (typeof data.error !== 'string') {
            Alert.error(data.error.message);
          } else {
            Alert.error(data.message);
          }
        });
        return onError && onError(errorObject);
      }

      // Call onError callback if applicable
      return onError && onError(error);
    });
}

function sendGet(auth, url, dispatch, onSuccess, onError) {
  renewToken(auth, dispatch);
  const options = addToken({
    method: 'GET',
  }, auth);

  return request(options, url, dispatch, onSuccess, onError);
}

function sendPut(payload, auth, url, dispatch, onSuccess, onError) {
  renewToken(auth, dispatch);
  const options = addToken({
    method: 'PUT',
    body: JSON.stringify(formatPayload(payload)),
  }, auth);

  return request(options, url, dispatch, onSuccess, onError);
}

function sendPost(payload, auth, url, dispatch, onSuccess, onError) {
  renewToken(auth, dispatch);
  const options = addToken({
    method: 'POST',
    body: JSON.stringify(formatPayload(payload))
  }, auth);

  return request(options, url, dispatch, onSuccess, onError);
}

function sendFormDataPost(payload, auth, url, dispatch, onSuccess, onError) {
  renewToken(auth, dispatch);
  const options = addToken({
    method: 'POST',
    body: payload
  }, auth);

  return request(options, url, dispatch, onSuccess, onError);
}

function sendFormDataPut(payload, auth, url, dispatch, onSuccess, onError) {
  renewToken(auth, dispatch);
  const options = addToken({
    method: 'PUT',
    body: payload,
  }, auth);

  return request(options, url, dispatch, onSuccess, onError);
}

function sendDelete(auth, url, dispatch, onSuccess, onError) {
  renewToken(auth, dispatch);
  const options = addToken({
    method: 'DELETE',
  }, auth);

  return request(options, url, dispatch, onSuccess, onError);
}

function formatParamValue(value) {
  if (_.isArray(value)) {
    return _.map(value, (v) => formatParamValue(v));
  } else if (_.isObject(value)) {
    return _.mapValues(value, (v) => formatParamValue(v));
  } else if (_.isBoolean(value)) {
    return value;
  } else if (!isNaN(value)) {
    if (typeof value === 'string' && value.charAt(0) === '0') {
      return value;
    }
    return Number(value);
  }
  return value;
}

function param(obj) {
  if (obj) {
    const nestedObj = flatnest.nest(obj);
    return _.reduce(nestedObj, (arr, value, key) => {
      if (!value) {
        return arr;
      }
      const formattedValue = formatParamValue(value);
      if (_.isArray(formattedValue) || _.isObject(formattedValue)) {
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(formattedValue))}`);
      } else {
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(formattedValue)}`);
      }
      return arr;
    }, []).join('&');
  }
  return '';
}

export default {
  get: sendGet,
  put: sendPut,
  post: sendPost,
  postForm: sendFormDataPost,
  delete: sendDelete,
  putForm: sendFormDataPut,
  param,
};
