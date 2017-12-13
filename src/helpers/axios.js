import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import Alert from 'react-s-alert';
// import { onAuthError } from '@/routes/Auth/redux/auth';

const instance = axios.create({
  baseURL: __CONFIG__.API.SERVER_URL,
});

const options = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      ({ getState, dispatch }, config) => {
        const auth = getState().auth;
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: auth && auth.token ? `Bearer ${auth.token}` : undefined,
          },
        };
      },
    ],
    response: [
      {
        success: ({ dispatch }, response) => {
          // Return JSON data
          if (response.data) {
            return response.data;
          }
          return response;
        },
        error: ({ dispatch }, error) => {
          // console.log(error.response);
          const err = typeof error === 'string' ? { message: error } : error.response.data;
          Alert.error(err.message);
          Promise.reject(error);
        },
      },
    ],
  },
};

export default axiosMiddleware(instance, options);

export { instance };


// const TOKEN_DURATION = 1800000;

// function renewToken(auth) {
//   const now = moment().valueOf();
//   if (auth && now - auth.expiredAt > TOKEN_DURATION / 2 && !auth.isRenewingToken) {
//     sessionStorage.removeItem('token');
//   }
// }

// function addToken(options, auth) {
//   return auth ? Object.assign({}, options, {
//     headers: Object.assign({}, options.headers, {
//       Authorization: `Bearer ${auth.token}`,
//     }),
//   }) : options;
// }

// // Add a request interceptor
// instance.interceptors.request.use(
//   conf => {
//     const config = conf;
//     config.headers = {
//       ...config.headers,
//     };

//     return config;
//   },
//   error => {
//     console.log(error);
//     return Promise.reject(error);
//   },
// );

// // Add a response interceptor
// instance.interceptors.response.use(
//   response => {
//     // Return JSON data
//     if (response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   error => {
//     // TODO: remove this
//     console.error(error);

//     // Attempt to get the actual error returned from API
//     const err =
//       (error.response && error.response.data && error.response.data.error) ||
//       error;

//     return Promise.reject(err); // Propagate rejection back to caller
//   },
// );

// export default instance;
