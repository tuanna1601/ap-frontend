import * as _ from 'lodash';
import HTTP from '@/helpers/http';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'TABOO_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'TABOO_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_UPDATE = 'TABOO_UPDATE_LOADING_UPDATE';
const UPDATE_LOADING_DELETE = 'TABOO_UPDATE_LOADING_DELETE';
const AFTER_EDIT = 'TABOO_AFTER_EDIT';
const AFTER_DELETE = 'TABOO_AFTER_DELETE';
const AFTER_CREATE = 'TABOO_AFTER_CREATE';
const RELOAD_LIST = 'TABOO_RELOAD_LIST';
const SET_FILTER_QUERY = 'TABOO_SET_FILTER_QUERY';
const SET_CURRENT_PAGE = 'TABOO_SET_CURRENT_PAGE';

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

export function afterCreateTaboo(taboos) {
  return {
    type: AFTER_CREATE,
    taboos,
  };
}

export function afterEditTaboo(taboo) {
  return {
    type: AFTER_EDIT,
    taboo,
  };
}

export function afterDeleteTaboo(taboo) {
  return {
    type: AFTER_DELETE,
    taboo,
  };
}

export function reloadList(rows, count) {
  return {
    type: RELOAD_LIST,
    taboos: rows,
    count
  };
}

export function createTaboo(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));
    const formattedValue = _.pick(values, 'name');
    HTTP.post(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/taboos`, dispatch, (data) => {
      dispatch(afterCreateTaboo(data));
      callback(data);
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
  };
}

export function listTaboo() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }
    dispatch(onUpdateLoadingList(true));
    const query = getState().taboo.filterQuery;
    const url = `${__CONFIG__.API.SERVER_URL}/taboos?${HTTP.param(query)}`;

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function updateTaboo(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));
    const formattedValue = _.pick(values, 'name', 'department');
    HTTP.put(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/taboos/${values.id}`,
    dispatch, (data) => {
      dispatch(afterEditTaboo(data));
      callback(data);
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(false));
    });
  };
}

export function deleteTaboo(tabooId, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingDelete(true));
    HTTP.delete(auth, `${__CONFIG__.API.SERVER_URL}/taboos/${tabooId}`,
    dispatch, (data) => {
      dispatch(afterDeleteTaboo(data));
      callback(data);
    }).then(() => {
      dispatch(onUpdateLoadingDelete(false));
    });
  };
}

export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    page
  };
}

export function setFilterQuery(values) {
  return {
    type: SET_FILTER_QUERY,
    query: values
  };
}

export function goToPage(page) {
  return (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(listTaboo());
  };
}


/*
 * Initial state
 */
const initialState = {
  taboos: {},
  filterQuery: {},
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
        taboos: _.reduce(action.taboos, (hashTaboo, taboo) =>
          Object.assign({}, hashTaboo, {
            [taboo.id]: taboo
          }), {})
      });
    case AFTER_CREATE: {
      const newTaboo = _.reduce(action.taboos, (hashTaboo, taboo) =>
        Object.assign({}, hashTaboo, {
          [taboo.id]: Object.assign({}, taboo, {
            isHighlighted: true
          })
        }), {});
      return Object.assign({}, state, {
        taboos: Object.assign({}, state.taboos, newTaboo)
      });
    }
    case AFTER_EDIT:
      return Object.assign({}, state, {
        taboos: Object.assign({}, state.taboos, {
          [action.taboo.id]: Object.assign({}, action.taboo, {
            isHighlighted: true
          })
        })
      });
    case AFTER_DELETE: {
      const newTaboo = Object.assign({}, state.taboos);
      delete newTaboo[action.taboo.id];
      return Object.assign({}, state, {
        taboos: newTaboo
      });
    }
    case SET_FILTER_QUERY: {
      return Object.assign({}, state, {
        filterQuery: action.query
      });
    }
    case SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        pagination: Object.assign({}, state.pagination, {
          page: action.page
        })
      });
    default:
      return state;
  }
}
