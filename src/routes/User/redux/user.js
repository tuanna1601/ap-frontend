import HTTP from '@/helpers/http';
import * as _ from 'lodash';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'USER_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'USER_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_UPDATE = 'USER_UPDATE_LOADING_UPDATE';
const EDIT = 'USER_EDIT';
const RELOAD_LIST = 'USER_RELOAD_LIST';
const SET_CURRENT_PAGE = 'USER_SET_CURRENT_PAGE';
const RESET_CURRENT_PAGE = 'USER_RESET_CURRENT_PAGE';
const SET_FILTER_QUERY = 'USER_SET_FILTER_QUERY';
const AFTER_CREATE = 'USER_AFTER_CREATE';
const AFTER_IMPORT = 'USER_AFTER_IMPORT';
const AFTER_EDIT = 'USER_AFTER_EDIT';
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

export function afterCreateUser(user) {
  return {
    type: AFTER_CREATE,
    user
  };
}

export function afterImportUsers(users) {
  return {
    type: AFTER_IMPORT,
    users,
  };
}

export function afterEditUser(user) {
  return {
    type: AFTER_EDIT,
    user,
  };
}

export function reloadList(users, count) {
  return {
    type: RELOAD_LIST,
    users,
    count,
  };
}

export function listUsers() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const pagination = getState().user.pagination;
    const filterQuery = getState().user.filterQuery;

    const query = Object.assign({}, filterQuery, {
      limit: pagination.limit,
      page: pagination.page,
    });

    const url = `${__CONFIG__.API.SERVER_URL}/users?${HTTP.param(query)}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function createUser(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));

    HTTP.post(values, auth, `${__CONFIG__.API.SERVER_URL}/users`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterCreateUser(data));
    }).then(() => dispatch(onUpdateLoadingCreate(false)));
  };
}

export function importUser(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));
    const formData = new FormData();
    formData.append('file', values);

    HTTP.postForm(formData, auth, `${__CONFIG__.API.SERVER_URL}/users/import`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterImportUsers(data));
    }).then(() => dispatch(onUpdateLoadingCreate(false)));
  };
}

export function editUser(id) {
  return {
    type: EDIT,
    id,
  };
}

export function updateUser(user, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));

    const url = `${__CONFIG__.API.SERVER_URL}/users/${user.id}`;
    const updatedUser = _.pick(user, 'name', 'email', 'roles', 'deactivated');
    HTTP.put(updatedUser, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterEditUser(data));
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(false));
    });
  };
}

export function goToPage(page) {
  return (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(listUsers());
  };
}

/*
 * Initial state
 */
const initialState = {
  users: {},
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
      const users = _.reduce(action.users, (hashUsers, user) => Object.assign({}, hashUsers, {
        [user.id]: user,
      }), {});
      return Object.assign({}, state, {
        users,
        // pagination: Object.assign({}, state.pagination, {
        //   count: action.count,
        // }),
      });
    }
    case AFTER_CREATE: {
      return Object.assign({}, state, {
        users: Object.assign({}, state.users, {
          [action.user.id]: action.user
        })
      });
    }
    case AFTER_IMPORT: {
      const users = _.reduce(action.users, (hashUsers, user) => Object.assign({}, hashUsers, {
        [user.id]: user,
      }), {});
      return Object.assign({}, state, {
        users: Object.assign({}, state.users, users)
      });
    }
    case EDIT: {
      const editedUser = Object.assign({}, state.users[action.id], {
        permissions: state.users[action.id].permissions ? state.users[action.id].permissions : [],
      });
      const users = Object.assign({}, state.users, {
        [action.id]: editedUser,
      });
      return Object.assign({}, state, {
        users,
      });
    }
    case AFTER_EDIT: {
      // break if not in current view
      if (!state.users[action.user.id]) {
        return state;
      }
      const users = Object.assign({}, state.users, {
        [action.user.id]: Object.assign({}, action.user, {
          isHighlighted: true,
        }),
      });
      return Object.assign({}, state, {
        users,
      });
    }
    default:
      return state;
  }
}
