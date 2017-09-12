import * as _ from 'lodash';
import HTTP from '@/helpers/http';

const RELOAD_DEPARTMENTS = 'COMMON_RELOAD_DEPARTMENTS';
const AFTER_CREATE_DEPARTMENT = 'COMMON_AFTER_CREATE_DEPARTMENT';
const RELOAD_INVENTORIES = 'COMMON_RELOAD_INVENTORIES';
const RELOAD_USERS = 'COMMON_RELOAD_USERS';
const RELOAD_CRITERIA = 'COMMON_RELOAD_CRITERIA';
const RELOAD_AD_ACCOUNTS = 'COMMON_RELOAD_AD_ACCOUNTS';
const RELOAD_AD_CAMPAIGNS = 'COMMON_RELOAD_AD_CAMPAIGNS';
const RELOAD_AD_SETS = 'COMMON_RELOAD_AD_SETS';
const RELOAD_ADS = 'COMMON_RELOAD_ADS';
const RELOAD_PAGES = 'COMMON_RELOAD_PAGES';

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

export function reloadAdAccounts(rows) {
  return {
    type: RELOAD_AD_ACCOUNTS,
    accounts: rows
  };
}

export function reloadAdCampaigns(rows) {
  return {
    type: RELOAD_AD_CAMPAIGNS,
    campaigns: rows
  };
}

export function resetAdCampaigns() {
  return {
    type: RELOAD_AD_CAMPAIGNS,
    campaigns: []
  };
}

export function reloadAdSets(rows) {
  return {
    type: RELOAD_AD_SETS,
    sets: rows
  };
}

export function resetAdSets() {
  return {
    type: RELOAD_AD_SETS,
    sets: []
  };
}

export function reloadAds(ads) {
  return {
    type: RELOAD_ADS,
    ads
  };
}

export function reloadPages(pages) {
  return {
    type: RELOAD_PAGES,
    pages
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

export function listAdAccount(query) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const url = `${__CONFIG__.API.SERVER_URL}/businesses/ad-accounts?${HTTP.param(query)}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadAdAccounts(data.rows));
    });
  };
}

export function listAdCampaign(accountId) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    if (accountId) {
      const url = `${__CONFIG__.API.SERVER_URL}/businesses/${accountId}/ad-campaigns`;
      HTTP.get(auth, url, dispatch, (data) => {
        dispatch(reloadAdCampaigns(data.data));
      }, () => {
        dispatch(reloadAdCampaigns([]));
      });
    }
  };
}

export function listAdSets(campaignId) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    if (campaignId) {
      const url = `${__CONFIG__.API.SERVER_URL}/businesses/${campaignId}/adsets`;
      HTTP.get(auth, url, dispatch, (data) => {
        dispatch(reloadAdSets(data.data));
      }, () => {
        dispatch(reloadAdSets([]));
      });
    }
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

export function listPages() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const url = `${__CONFIG__.API.SERVER_URL}/businesses/pages`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadPages(data.rows));
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
    case RELOAD_AD_ACCOUNTS: {
      return Object.assign({}, state, {
        adAccounts: action.accounts
      });
    }
    case RELOAD_AD_CAMPAIGNS: {
      return Object.assign({}, state, {
        adCampaigns: action.campaigns
      });
    }
    case RELOAD_AD_SETS: {
      return Object.assign({}, state, {
        adSets: action.sets
      });
    }
    case RELOAD_ADS: {
      return Object.assign({}, state, {
        ads: action.ads
      });
    }
    case RELOAD_PAGES: {
      return Object.assign({}, state, {
        pages: action.pages
      });
    }
    default:
      return state;
  }
}
