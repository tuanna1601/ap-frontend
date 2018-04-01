import * as _ from 'lodash';
import HTTP from '@/helpers/http';

const LIST_BUSINESSES = 'COMMON_LIST_BUSINESSES';
const LIST_AD_ACCOUNTS = 'COMMON_LIST_AD_ACCOUNTS';
const LIST_AD_CAMPAIGNS = 'COMMON_LIST_AD_CAMPAIGNS';
const LIST_AD_SETS = 'COMMON_LIST_AD_SETS';
const LIST_PAGES = 'COMMON_LIST_PAGES';

const RELOAD_DEPARTMENTS = 'COMMON_RELOAD_DEPARTMENTS';
const AFTER_CREATE_DEPARTMENT = 'COMMON_AFTER_CREATE_DEPARTMENT';
const RELOAD_INVENTORIES = 'COMMON_RELOAD_INVENTORIES';
const RELOAD_USERS = 'COMMON_RELOAD_USERS';
const RELOAD_CRITERIA = 'COMMON_RELOAD_CRITERIA';
const RELOAD_ADS = 'COMMON_RELOAD_ADS';

export function reloadDeparments(rows) {
  return {
    type: RELOAD_DEPARTMENTS,
    departments: rows
  };
}

export function commonAfterCreateDepartment(department) {
  return {
    type: AFTER_CREATE_DEPARTMENT,
    department
  };
}

export function reloadInventories(rows) {
  return {
    type: RELOAD_INVENTORIES,
    inventories: rows
  };
}

export function reloadUsers(rows) {
  return {
    type: RELOAD_USERS,
    users: rows
  };
}

export function reloadCriteria(rows) {
  return {
    type: RELOAD_CRITERIA,
    criteria: rows
  };
}

export function reloadAds(ads) {
  return {
    type: RELOAD_ADS,
    ads
  };
}

export function listDepartments(params) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    HTTP.get(auth, `${__CONFIG__.API.SERVER_URL}/departments?${HTTP.param(params)}`, dispatch, (data) => {
      dispatch(reloadDeparments(data.rows));
    });
  };
}

export function listInventories() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const url = `${__CONFIG__.API.SERVER_URL}/inventories`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadInventories(data.rows));
    });
  };
}

export function listUsers(userRole, department) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    let url = `${__CONFIG__.API.SERVER_URL}/users`;

    if (userRole === 'reviewer' && department) {
      url = `${__CONFIG__.API.SERVER_URL}/departments/${department.id}/reviewers`;
    }

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadUsers(data));
    });
  };
}

export function listCriteria(department) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    let query;
    if (department) {
      query = {
        department
      };
    }

    const param = HTTP.param(query);

    const url = `${__CONFIG__.API.SERVER_URL}/criteria?${param}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadCriteria(data.rows));
    });
  };
}

export function listAdAccounts(businessId) {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return undefined;
    }

    const url = '/businesses/ad-accounts';
    return dispatch({
      type: LIST_AD_ACCOUNTS,
      payload: {
        request: {
          url,
          method: 'GET',
          params: {
            businessId,
          },
        },
      },
    });
  };
}

export function listAdCampaigns(accountId, businessId) {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth || !accountId) {
      return undefined;
    }

    const url = `/businesses/${accountId}/ad-campaigns`;

    return dispatch({
      type: LIST_AD_CAMPAIGNS,
      payload: {
        request: {
          url,
          method: 'GET',
          params: {
            businessId,
          },
        },
      },
    });
  };
}

export function listAdSets(campaignId, businessId) {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth || !campaignId) {
      return undefined;
    }

    const url = `/businesses/${campaignId}/adsets`;

    return dispatch({
      type: LIST_AD_SETS,
      payload: {
        request: {
          url,
          method: 'GET',
          params: {
            businessId,
          },
        },
      },
    });
  };
}

export function listAds(keyword, isRemoved) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }
    const query = {};
    if (keyword) {
      query.text = keyword;
    }
    if (isRemoved !== undefined) {
      query.isRemoved = isRemoved;
    }

    const url = `${__CONFIG__.API.SERVER_URL}/ads?${HTTP.param(query)}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadAds(data.rows));
    });
  };
}

export function listPages(businessId) {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return undefined;
    }

    const url = '/businesses/pages';
    return dispatch({
      type: LIST_PAGES,
      payload: {
        request: {
          url,
          method: 'GET',
          params: {
            businessId,
          },
        },
      },
    });
  };
}

export function listBusinesses() {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return undefined;
    }

    const url = '/businesses';
    return dispatch({
      type: LIST_BUSINESSES,
      payload: {
        request: {
          url,
          method: 'GET',
        },
      },
    });
  };
}

const initialState = {
  departments: [],
  criteria: [],
  inventories: {},
  users: [],
  adAccounts: [],
  adCampaigns: [],
  adSets: [],
  ads: [],
  pages: [],
  businesses: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case RELOAD_DEPARTMENTS: {
      return Object.assign({}, state, {
        departments: _.sortBy(action.departments, ['name'])
      });
    }
    case AFTER_CREATE_DEPARTMENT: {
      return Object.assign({}, state, {
        departments: _.chain(state.departments)
          .concat(action.department)
          .sortBy(['name'])
          .value()
      });
    }
    case RELOAD_INVENTORIES: {
      const inventories = _.reduce(action.inventories, (hashInventories, inventory) =>
        Object.assign({}, hashInventories, {
          [inventory.id]: inventory,
        }), {});
      return Object.assign({}, state, {
        inventories,
      });
    }
    case RELOAD_USERS: {
      return Object.assign({}, state, {
        users: action.users
      });
    }
    case RELOAD_CRITERIA: {
      return Object.assign({}, state, {
        criteria: action.criteria
      });
    }
    case RELOAD_ADS: {
      return Object.assign({}, state, {
        ads: action.ads
      });
    }
    default:
      return state;
  }
}
