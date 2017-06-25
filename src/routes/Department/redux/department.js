import * as _ from 'lodash';
import HTTP from '@/helpers/http';
import { nestChildren } from '@/helpers/helper';
import { commonAfterCreateDepartment } from '@/store/common';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'DEPARTMENT_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'DEPARTMENT_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_UPDATE = 'DEPARTMENT_UPDATE_LOADING_UPDATE';
const UPDATE_LOADING_DELETE = 'DEPARTMENT_UPDATE_LOADING_DELETE';
const AFTER_EDIT = 'DEPARTMENT_AFTER_EDIT';
const AFTER_DELETE = 'DEPARTMENT_AFTER_DELETE';
const AFTER_CREATE = 'DEPARTMENT_AFTER_CREATE';
const RELOAD_LIST = 'DEPARMENT_RELOAD_LIST';

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

export function afterCreateDepartment(department) {
  return {
    type: AFTER_CREATE,
    department,
  };
}

export function afterEditDepartment(department) {
  return {
    type: AFTER_EDIT,
    department,
  };
}

export function afterDeleteDepartment(department) {
  return {
    type: AFTER_DELETE,
    department,
  };
}

export function reloadList(rows, count) {
  return {
    type: RELOAD_LIST,
    departments: rows,
    count
  };
}

export function listDepartments() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    HTTP.get(auth, `${__CONFIG__.API.SERVER_URL}/departments`, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    });
  };
}

export function createDepartment(department, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));
    const formattedValue = Object.assign({}, department);
    if (!formattedValue.parent) {
      delete formattedValue.parent;
    }

    HTTP.post(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/departments`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterCreateDepartment(data));
      dispatch(commonAfterCreateDepartment(data));
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
  };
}

export function updateDepartment(department, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));

    HTTP.put(_.pick(department, ['name', 'parent', 'reviewers', 'ordinators']),
      auth, `${__CONFIG__.API.SERVER_URL}/departments/${department.id}`, dispatch, (data) => {
        if (callback) {
          callback(data);
        }
        dispatch(afterEditDepartment(data));
      }).then(() => {
        dispatch(onUpdateLoadingUpdate(false));
      });
  };
}

export function deleteDepartment(id, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingDelete(true));

    HTTP.delete(auth, `${__CONFIG__.API.SERVER_URL}/departments/${id}`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterDeleteDepartment(data));
    }).then(() => {
      dispatch(onUpdateLoadingDelete(false));
    });
  };
}

/*
 * Initial state
 */
const initialState = {
  departments: {},
  nestedDepartments: [],
  criteria: {},
  isLoadingList: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
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
    case RELOAD_LIST: {
      const departments = _.reduce(action.departments, (hashDept, department) =>
        Object.assign({}, hashDept, { [department.id]: department }), {});
      const nestedDepartments = [];
      _.each(action.departments, (department) => {
        if (!department.parent) {
          nestedDepartments.push(Object.assign({}, department, {
            children: nestChildren(department.id, action.departments)
          }));
        }
      });
      return Object.assign({}, state, {
        departments,
        nestedDepartments
      });
    }
    case AFTER_EDIT:
    case AFTER_CREATE: {
      const departments = Object.assign({}, state.departments, {
        [action.department.id]: action.department
      });
      const nestedDepartments = [];
      _.each(departments, (department) => {
        if (!department.parent) {
          nestedDepartments.push(Object.assign({}, department, {
            children: nestChildren(department.id, departments)
          }));
        }
      });
      return Object.assign({}, state, {
        departments,
        nestedDepartments,
      });
    }
    case AFTER_DELETE:
    default:
      return state;
  }
}
