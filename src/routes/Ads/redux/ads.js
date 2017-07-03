import * as _ from 'lodash';
import HTTP from '@/helpers/http';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'ADS_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'ADS_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_DELETE = 'ADS_UPDATE_LOADING_DELETE';
const RELOAD_LIST = 'ADS_RELOAD_LIST';
const AFTER_LOAD_AD = 'ADS_AFTER_LOAD_AD';
const AFTER_DELETE_AD_ACCOUNT = 'ADS_AFTER_DELETE_AD_ACCOUNT';
const AFTER_CREATE_AD_ACCOUNT = 'ADS_AFTER_CREATE_AD_ACCOUNT';
const RELOAD_AD_ACCOUNT_LIST = 'ADS_RELOAD_AD_ACCOUNT_LIST';
const SET_FILTER_QUERY = 'ADS_SET_FILTER_QUERY';
const SET_CURRENT_PAGE = 'ADS_SET_CURRENT_PAGE';
const RELOAD_REPORTS = 'ADS_RELOAD_REPORTS';
const RELOAD_PREVIEW = 'ADS_RELOAD_PREVIEW';

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
    type: AFTER_CREATE_AD_ACCOUNT,
    account,
  };
}

export function afterDeleteAdAccount(account) {
  return {
    type: AFTER_DELETE_AD_ACCOUNT,
    account,
  };
}

export function reloadAdAccountList(rows, count) {
  return {
    type: RELOAD_AD_ACCOUNT_LIST,
    accounts: rows,
    count
  };
}

export function reloadList(rows, count) {
  return {
    type: RELOAD_LIST,
    ads: rows,
    count
  };
}

export function afterLoadAd(ad) {
  return {
    type: AFTER_LOAD_AD,
    ad
  };
}

export function reloadReports(reports, count) {
  return {
    type: RELOAD_REPORTS,
    reports,
    count
  };
}

export function reloadAdsPreview(preview) {
  return {
    type: RELOAD_PREVIEW,
    preview
  };
}

export function listAds() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }
    dispatch(onUpdateLoadingList(true));
    const query = getState().ads.filterQuery;
    const url = `${__CONFIG__.API.SERVER_URL}/ads?${HTTP.param(query)}`;

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function getAd(adId) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }
    dispatch(onUpdateLoadingList(true));
    const url = `${__CONFIG__.API.SERVER_URL}/ads/${adId}`;

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(afterLoadAd(data));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function getAdsPreview(adId) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }
    dispatch(onUpdateLoadingList(true));
    const url = `${__CONFIG__.API.SERVER_URL}/ads/${adId}/preview`;

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadAdsPreview(data.data[0].body));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function updateAd(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const formattedValues = {
      note: values.note
    };
    dispatch(onUpdateLoadingCreate(true));
    const url = `${__CONFIG__.API.SERVER_URL}/ads/${values.id}/review`;
    HTTP.put(formattedValues, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
  };
}

export function listAdsReports(query) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const url = `${__CONFIG__.API.SERVER_URL}/issues?${HTTP.param(query)}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadReports(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function reportAds(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const formData = new FormData();
    _.each(values, (value, key) => {
      formData.append(key, value);
    });

    dispatch(onUpdateLoadingCreate(true));
    const url = `${__CONFIG__.API.SERVER_URL}/issues`;
    HTTP.postForm(formData, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
  };
}

export function rejectReport(id, values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));
    const url = `${__CONFIG__.API.SERVER_URL}/issues/${id}`;
    HTTP.put(values, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
  };
}

export function resolveReport(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const formattedValues = _.pick(values, ['ad', 'note']);
    dispatch(onUpdateLoadingCreate(true));
    const url = `${__CONFIG__.API.SERVER_URL}/issues/${values.id}/resolve`;
    HTTP.put(formattedValues, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
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
    const url = `${__CONFIG__.API.SERVER_URL}/ad-accounts`;

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadAdAccountList(data.rows, data.count));
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
  ads: {},
  adAccounts: {},
  filterQuery: {},
  reports: {},
  isLoadingList: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  pagination: {
    count: 0,
    page: 1,
    limit: 20,
  },
  preview: '&nbsp;'
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
        ads: _.reduce(action.ads, (hashAds, ad) =>
          Object.assign({}, hashAds, {
            [ad.id]: ad
          }), {})
      });
    case AFTER_LOAD_AD:
      return Object.assign({}, state, {
        ads: Object.assign({}, state.ads, {
          [action.ad.id]: action.ad
        })
      });
    case RELOAD_AD_ACCOUNT_LIST:
      return Object.assign({}, state, {
        adAccounts: _.reduce(action.accounts, (hashAdAccount, account) =>
          Object.assign({}, hashAdAccount, {
            [account.id]: account
          }), {})
      });
    case RELOAD_REPORTS:
      return Object.assign({}, state, {
        reports: _.reduce(action.reports, (hashReport, report) =>
          Object.assign({}, hashReport, {
            [report.id]: report
          }), {})
      });
    case RELOAD_PREVIEW:
      return Object.assign({}, state, {
        preview: action.preview
      });
    case AFTER_CREATE_AD_ACCOUNT: {
      return Object.assign({}, state, {
        adAccounts: Object.assign({}, state.adAccounts, {
          [action.account.id]: action.account
        })
      });
    }
    case AFTER_DELETE_AD_ACCOUNT: {
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
