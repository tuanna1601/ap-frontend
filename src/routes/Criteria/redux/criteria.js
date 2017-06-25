import * as _ from 'lodash';
import HTTP from '@/helpers/http';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'CRITERIA_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'CRITERIA_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_UPDATE = 'CRITERIA_UPDATE_LOADING_UPDATE';
const UPDATE_LOADING_DELETE = 'CRITERIA_UPDATE_LOADING_DELETE';
const AFTER_EDIT = 'CRITERIA_AFTER_EDIT';
const AFTER_DELETE = 'CRITERIA_AFTER_DELETE';
const AFTER_CREATE = 'CRITERIA_AFTER_CREATE';
const RELOAD_LIST = 'CRITERIA_RELOAD_LIST';

/*
 * Actions
 */
export function onUpdateLoadingList(isLoading) {
  return {
    type: UPDATE_LOADING_LIST,
    isLoading,
  };
}

export function onUpdateLoadingCreate(isLoading) {
  return {
    type: UPDATE_LOADING_CREATE,
    isLoading,
  };
}

export function onUpdateLoadingUpdate(isLoading) {
  return {
    type: UPDATE_LOADING_UPDATE,
    isLoading,
  };
}

export function onUpdateLoadingDelete(isLoading) {
  return {
    type: UPDATE_LOADING_DELETE,
    isLoading,
  };
}

export function afterCreateCriteria(criteria) {
  return {
    type: AFTER_CREATE,
    criteria,
  };
}

export function afterEditCriteria(criteria) {
  return {
    type: AFTER_EDIT,
    criteria,
  };
}

export function afterDeleteCriteria(criteria) {
  return {
    type: AFTER_DELETE,
    criteria,
  };
}

export function reloadList(rows, count) {
  return {
    type: RELOAD_LIST,
    criteria: rows,
    count
  };
}

export function createCriteria(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));
    const formattedValue = _.pick(values, 'name', 'department');
    HTTP.post(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/criteria`, dispatch, (data) => {
      dispatch(afterCreateCriteria(data));
      callback(data);
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
  };
}

export function listCriteria() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    HTTP.get(auth, `${__CONFIG__.API.SERVER_URL}/criteria`, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    });
  };
}

/*
 * Initial state
 */
const initialState = {
  criteria: {},
  isLoadingList: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  pagination: {
    count: 0,
    page: 1,
    limit: 20,
  },
};

/*
 * Reducer
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOADING_LIST:
      return Object.assign({}, state, {
        isLoadingList: action.isLoading,
      });
    case UPDATE_LOADING_CREATE:
      return Object.assign({}, state, {
        isLoadingCreate: action.isLoading,
      });
    case UPDATE_LOADING_UPDATE:
      return Object.assign({}, state, {
        isLoadingUpdate: action.isLoading,
      });
    case UPDATE_LOADING_DELETE:
      return Object.assign({}, state, {
        isLoadingDelete: action.isLoading,
      });
    case RELOAD_LIST:
      return Object.assign({}, state, {
        criteria: _.reduce(action.criteria, (hashCriteria, crt) =>
          Object.assign({}, hashCriteria, {
            [crt.id]: crt
          }), {})
      });
    case AFTER_CREATE: {
      const newCriteria = _.reduce(action.criteria, (hashCriteria, crt) =>
        Object.assign({}, hashCriteria, {
          [crt.id]: crt
        }), {});
      return Object.assign({}, state, {
        criteria: Object.assign({}, state.criteria, newCriteria)
      });
    }
    default:
      return state;
  }
}
