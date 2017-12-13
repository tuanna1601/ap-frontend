import { reduce } from 'lodash';
import HTTP from '@/helpers/http';

/*
 * Action types
 */
const UPDATE_LOADING = 'REPORT_UPDATE_LOADING';
const RELOAD_LIST = 'REPORT_RELOAD_LIST';
const SET_FILTER_QUERY = 'REPORT_SET_FILTER_QUERY';
const SET_CURRENT_PAGE = 'REPORT_SET_CURRENT_PAGE';

/*
 * Actions
 */
export function onUpdateLoading(isLoading) {
  return {
    type: UPDATE_LOADING,
    isLoading,
  };
}

export function reloadList(rows, count) {
  return {
    type: RELOAD_LIST,
    reports: rows,
    count,
  };
}

export function loadReport(type) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoading(true));
    const filterQuery = getState().report.filterQuery;
    const pagination = getState().report.pagination;

    const query = {
      ...filterQuery,
      page: pagination.page,
      limit: pagination.limit,
    };

    HTTP.get(auth, `${__CONFIG__.API.SERVER_URL}/reports/${type}?${HTTP.param(query)}`,
      dispatch,
      (data) => dispatch(reloadList(data.rows, data.count)))
      .finally(dispatch(onUpdateLoading(false)));
  };
}

export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    page,
  };
}

export function setFilterQuery(filterQuery) {
  return {
    type: SET_FILTER_QUERY,
    filterQuery,
  };
}

export function goToPage(page, type) {
  return (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(loadReport(type));
  };
}


/*
 * Initial state
 */
const initialState = {
  reports: {},
  filterQuery: {},
  isLoading: false,
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
    case UPDATE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case RELOAD_LIST:
      return {
        ...state,
        reports: reduce(action.reports, (hashReport, report) => ({
          ...hashReport,
          [report.id]: report,
        }), {}),
        pagination: {
          ...state.pagination,
          count: action.count,
        }
      };
    case SET_FILTER_QUERY: {
      return {
        ...state,
        filterQuery: action.filterQuery,
      };
    }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.page,
        },
      };
    default:
      return state;
  }
}
