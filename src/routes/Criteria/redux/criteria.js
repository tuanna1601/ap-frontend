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
const SET_FILTER_QUERY = 'CRITERIA_SET_FILTER_QUERY';
const SET_CURRENT_PAGE = 'CRITERIA_SET_CURRENT_PAGE';

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

export function afterEditCriteria(criterion) {
  return {
    type: AFTER_EDIT,
    criterion,
  };
}

export function afterDeleteCriteria(criterion) {
  return {
    type: AFTER_DELETE,
    criterion,
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
    dispatch(onUpdateLoadingList(true));
    const query = getState().criteria.filterQuery;
    const url = `${__CONFIG__.API.SERVER_URL}/criteria?${HTTP.param(query)}`;

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function updateCriteria(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));
    const formattedValue = _.pick(values, 'name', 'department');
    HTTP.put(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/criteria/${values.id}`,
    dispatch, (data) => {
      dispatch(afterEditCriteria(data));
      callback(data);
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(false));
    });
  };
}

export function deleteCriteria(criterionId, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingDelete(true));
    HTTP.delete(auth, `${__CONFIG__.API.SERVER_URL}/criteria/${criterionId}`,
    dispatch, (data) => {
      dispatch(afterDeleteCriteria(data));
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
    dispatch(listCriteria());
  };
}


/*
 * Initial state
 */
const initialState = {
  criteria: {},
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
        criteria: _.reduce(action.criteria, (hashCriteria, criterion) =>
          Object.assign({}, hashCriteria, {
            [criterion.id]: criterion
          }), {})
      });
    case AFTER_CREATE: {
      const newCriteria = _.reduce(action.criteria, (hashCriteria, criterion) =>
        Object.assign({}, hashCriteria, {
          [criterion.id]: Object.assign({}, criterion, {
            isHighlighted: true
          })
        }), {});
      return Object.assign({}, state, {
        criteria: Object.assign({}, state.criteria, newCriteria)
      });
    }
    case AFTER_EDIT:
      return Object.assign({}, state, {
        criteria: Object.assign({}, state.criteria, {
          [action.criterion.id]: Object.assign({}, action.criterion, {
            isHighlighted: true
          })
        })
      });
    case AFTER_DELETE: {
      const newCriteria = Object.assign({}, state.criteria);
      delete newCriteria[action.criterion.id];
      return Object.assign({}, state, {
        criteria: newCriteria
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
