import * as _ from 'lodash';
import HTTP from '@/helpers/http';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'ADS_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'ADS_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_DELETE = 'ADS_UPDATE_LOADING_DELETE';
const AFTER_DELETE = 'ADS_AFTER_DELETE';
const AFTER_CREATE = 'ADS_AFTER_CREATE';
const RELOAD_LIST = 'ADS_RELOAD_LIST';
const SET_FILTER_QUERY = 'ADS_SET_FILTER_QUERY';
const SET_CURRENT_PAGE = 'ADS_SET_CURRENT_PAGE';

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

export function onUpdateLoadingDelete(isLoading) {
  return {
    type: UPDATE_LOADING_DELETE,
    isLoading,
  };
}

export function afterCreateAdAccount(account) {
  return {
    type: AFTER_CREATE,
    account,
  };
}

export function afterDeleteAdAccount(account) {
  return {
    type: AFTER_DELETE,
    account,
  };
}

export function reloadList(rows, count) {
  return {
    type: RELOAD_LIST,
    accounts: rows,
    count
  };
}

export function createAdAccount(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));
    const formattedValue = _.pick(values, 'name', 'accountId', 'accessToken');
    HTTP.post(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/ad-accounts`, dispatch, (data) => {
      dispatch(afterCreateAdAccount(data));
      callback(data);
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
  };
}

export function listAdAccount() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }
    dispatch(onUpdateLoadingList(true));
    const query = getState().ads.filterQuery;
    const url = `${__CONFIG__.API.SERVER_URL}/ad-accounts?${HTTP.param(query)}`;

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function deleteAdAccount(accountId, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingDelete(true));
    HTTP.delete(auth, `${__CONFIG__.API.SERVER_URL}/ad-accounts/${accountId}`,
    dispatch, (data) => {
      dispatch(afterDeleteAdAccount(data));
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
    dispatch(listAdAccount());
  };
}


/*
 * Initial state
 */
const initialState = {
  adAccounts: {},
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
    case UPDATE_LOADING_DELETE:
      return Object.assign({}, state, {
        isLoadingDelete: action.isLoading,
      });
    case RELOAD_LIST:
      return Object.assign({}, state, {
        adAccounts: _.reduce(action.accounts, (hashAdAccount, account) =>
          Object.assign({}, hashAdAccount, {
            [account.id]: account
          }), {})
      });
    case AFTER_CREATE: {
      return Object.assign({}, state, {
        adAccounts: Object.assign({}, state.adAccounts, {
          [action.account.id]: action.account
        })
      });
    }
    case AFTER_DELETE: {
      const newAdAccounts = _.cloneDeep(state.adAccounts);
      delete newAdAccounts[action.account.id];
      return Object.assign({}, state, {
        adAccounts: newAdAccounts
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
