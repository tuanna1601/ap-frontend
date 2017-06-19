import HTTP from '@/helpers/http';
import * as _ from 'lodash';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'INVENTORY_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'INVENTORY_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_UPDATE = 'INVENTORY_UPDATE_LOADING_UPDATE';
const EDIT = 'INVENTORY_EDIT';
const RELOAD_LIST = 'INVENTORY_RELOAD_LIST';
const LOAD = 'INVENTORY_LOAD';
const SET_CURRENT_PAGE = 'INVENTORY_SET_CURRENT_PAGE';
const RESET_CURRENT_PAGE = 'INVENTORY_RESET_CURRENT_PAGE';
const SET_FILTER_QUERY = 'INVENTORY_SET_FILTER_QUERY';
const AFTER_CREATE = 'INVENTORY_AFTER_CREATE';
const AFTER_EDIT = 'INVENTORY_AFTER_EDIT';
/*
 * Actions
 */

export function setFilterQuery(filterQuery) {
  return {
    type: SET_FILTER_QUERY,
    filterQuery
  };
}

export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    page,
  };
}

export function resetCurrentPage() {
  return {
    type: RESET_CURRENT_PAGE,
  };
}

export function onUpdateLoadingList(isLoading) {
  return {
    type: UPDATE_LOADING_LIST,
    isLoading
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

export function afterCreateInventory(inventory) {
  return {
    type: AFTER_CREATE,
    inventory
  };
}

export function afterEditInventory(inventory) {
  return {
    type: AFTER_EDIT,
    inventory,
  };
}

export function reloadList(inventories, count) {
  return {
    type: RELOAD_LIST,
    inventories,
    count,
  };
}

export function loadInventory(inventory) {
  return {
    type: LOAD,
    inventory
  };
}

export function listInventories() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const pagination = getState().inventory.pagination;
    const filterQuery = getState().inventory.filterQuery;

    const query = Object.assign({}, filterQuery, {
      limit: pagination.limit,
      page: pagination.page,
    });

    const url = `${__CONFIG__.API.SERVER_URL}/inventories?${HTTP.param(query)}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function listInventory(inventoryId) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const url = `${__CONFIG__.API.SERVER_URL}/inventories/${inventoryId}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(loadInventory(data));
    });
  };
}

export function createInventory(formValues, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));
    const formData = new FormData();
    _.each(formValues, (formValue, key) => {
      if (formValue instanceof Array) {
        _.each(formValue, (val) => {
          formData.append(key, val.value);
        });
      } else {
        formData.append(key, formValue);
      }
    });

    HTTP.postForm(formData, auth, `${__CONFIG__.API.SERVER_URL}/inventories`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterCreateInventory(data));
    }).then(() => dispatch(onUpdateLoadingCreate(false)));
  };
}

export function editInventory(id) {
  return {
    type: EDIT,
    id,
  };
}

export function updateInventory(formValues, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));

    const formData = new FormData();
    const formattedData = _.pick(formValues, ['text', 'headlines', 'medias', 'newMedias', 'descriptions']);
    _.each(formattedData, (formValue, key) => {
      if (formValue instanceof Array) {
        _.each(formValue, (val) => {
          formData.append(key, val.value);
        });
      } else {
        formData.append(key, formValue);
      }
    });

    const url = `${__CONFIG__.API.SERVER_URL}/inventories/${formValues.id}`;
    HTTP.putForm(formData, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterEditInventory(data));
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(false));
    });
  };
}

export function goToPage(page) {
  return (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(listInventories());
  };
}

/*
 * Initial state
 */
const initialState = {
  inventories: {},
  isLoadingList: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  pagination: {
    count: 0,
    page: 1,
    limit: 50,
  },
  filterQuery: {},
};

/*
 * Reducer
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_QUERY: {
      return Object.assign({}, state, {
        filterQuery: action.filterQuery,
      });
    }
    case SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        pagination: Object.assign({}, state.pagination, {
          page: action.page,
        }),
      });
    case RESET_CURRENT_PAGE:
      return Object.assign({}, state, {
        pagination: Object.assign({}, state.pagination, {
          page: 1,
        }),
      });
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
    case RELOAD_LIST: {
      const inventories = _.reduce(action.inventories, (hashInventories, inventory) =>
        Object.assign({}, hashInventories, {
          [inventory.id]: inventory,
        }), {});
      return Object.assign({}, state, {
        inventories,
      });
    }
    case LOAD:
    case AFTER_CREATE: {
      return Object.assign({}, state, {
        inventories: Object.assign({}, state.inventories, {
          [action.inventory.id]: action.inventory
        })
      });
    }
    case EDIT: {
      const editedInventory = Object.assign({}, state.inventories[action.id], {
        permissions: state.inventories[action.id].permissions ? state.inventories[action.id].permissions : [],
      });
      const inventories = Object.assign({}, state.inventories, {
        [action.id]: editedInventory,
      });
      return Object.assign({}, state, {
        inventories,
      });
    }
    case AFTER_EDIT: {
      // break if not in current view
      if (!state.inventories[action.inventory.id]) {
        return state;
      }
      const inventories = Object.assign({}, state.inventories, {
        [action.inventory.id]: Object.assign({}, action.inventory, {
          isHighlighted: true,
        }),
      });
      return Object.assign({}, state, {
        inventories,
      });
    }
    default:
      return state;
  }
}
