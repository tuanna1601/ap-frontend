import { cloneDeep, each, findIndex, map, pick, reduce, remove } from 'lodash';
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
const AFTER_CREATE_STEP = 'DEPARTMENT_AFTER_CREATE_STEP';
const AFTER_UPDATE_STEP = 'DEPARTMENT_AFTER_UPDATE_STEP';
const AFTER_DELETE_STEP = 'DEPARTMENT_AFTER_DELETE_STEP';
const RELOAD_STEP_LIST = 'DEPARTMENT_RELOAD_STEP_LIST';
const RELOAD_CRITERIA_LIST = 'DEPARTMENT_RELOAD_CRITERIA_LIST';

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

export function afterCreateStep(step) {
  return {
    type: AFTER_CREATE_STEP,
    step,
  };
}

export function afterUpdateStep(step) {
  return {
    type: AFTER_UPDATE_STEP,
    step,
  };
}

export function afterDeleteStep(step) {
  return {
    type: AFTER_DELETE_STEP,
    step,
  };
}

export function reloadStepList(steps) {
  return {
    type: RELOAD_STEP_LIST,
    steps,
  };
}

export function reloadCriteriaList(criteria) {
  return {
    type: RELOAD_CRITERIA_LIST,
    criteria,
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

    const formattedValue = pick(department, ['name', 'parent', 'reviewers', 'ordinators', 'isHidden']);
    formattedValue.reviewers = map(formattedValue.reviewers, (reviewer) => {
      if (typeof reviewer === 'string') {
        return reviewer;
      }
      return reviewer.id;
    });

    formattedValue.ordinators = map(formattedValue.ordinators, (ordinator) => {
      if (typeof ordinator === 'string') {
        return ordinator;
      }
      return ordinator.id;
    });

    HTTP.put(formattedValue, auth,
      `${__CONFIG__.API.SERVER_URL}/departments/${department.id}`, dispatch, (data) => {
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

export function createStep(step, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));

    const formattedValue = Object.assign({}, step, {
      criteria: map(step.criteria, c => c.value),
    });
    HTTP.post(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/steps`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterCreateStep(data));
    }).then(() => {
      dispatch(onUpdateLoadingCreate(true));
    });
  };
}

export function updateStep(step, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));

    const formattedValue = pick(step, 'autoClearanceAfter', 'autoClearanceType',
      'notification', 'notificationType', 'reviewingDepartment', 'title');
    formattedValue.criteria = map(step.criteria, c => c.value);
    HTTP.put(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/steps/${step.id}`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterUpdateStep(data));
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(true));
    });
  };
}

export function deleteStep(step, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));
    HTTP.delete(auth, `${__CONFIG__.API.SERVER_URL}/steps/${step.id}`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterDeleteStep(data));
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(true));
    });
  };
}

export function listSteps(department) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    HTTP.get(auth, `${__CONFIG__.API.SERVER_URL}/steps?${HTTP.param({ department })}`, dispatch, (data) => {
      dispatch(reloadStepList(data));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function changeStepOrder(step) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const formattedValue = {
      order: step.order,
    };
    HTTP.put(formattedValue, auth, `${__CONFIG__.API.SERVER_URL}/steps/${step.id}/order`, dispatch, (data) => {
      dispatch(reloadStepList(data));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function listCriteria(query) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }
    dispatch(onUpdateLoadingList(true));
    const url = `${__CONFIG__.API.SERVER_URL}/criteria?${HTTP.param(query)}`;

    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadCriteriaList(data.rows));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

/*
 * Initial state
 */
const initialState = {
  departments: {},
  steps: [],
  nestedDepartments: [],
  criteria: [],
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
      const departments = reduce(action.departments, (hashDept, department) =>
        Object.assign({}, hashDept, { [department.id]: department }), {});
      const nestedDepartments = [];
      each(action.departments, (department) => {
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
      each(departments, (department) => {
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
      return state;
    case RELOAD_STEP_LIST:
      return Object.assign({}, state, {
        steps: action.steps,
      });
    case RELOAD_CRITERIA_LIST:
      return Object.assign({}, state, {
        criteria: action.criteria,
      });
    case AFTER_CREATE_STEP:
      return Object.assign({}, state, {
        steps: [...state.steps, action.step],
      });
    case AFTER_UPDATE_STEP: {
      const index = findIndex(state.steps, step => step.id === action.step.id);
      const steps = cloneDeep(state.steps);
      if (index !== -1) {
        steps[index] = action.step;
      }
      return Object.assign({}, state, {
        steps,
      });
    }
    case AFTER_DELETE_STEP: {
      const steps = cloneDeep(state.steps);
      remove(steps, step => step.id === action.step.id);
      return Object.assign({}, state, {
        steps,
      });
    }
    default:
      return state;
  }
}
