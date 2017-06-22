import * as _ from 'lodash';
import HTTP from '@/helpers/http';

const RELOAD_DEPARTMENTS = 'COMMON_RELOAD_DEPARTMENTS';
const RELOAD_INVENTORIES = 'COMMON_RELOAD_INVENTORIES';

export function reloadDeparments(rows) {
  return {
    type: RELOAD_DEPARTMENTS,
    departments: rows
  };
}

export function reloadInventories(rows) {
  return {
    type: RELOAD_INVENTORIES,
    inventories: rows
  };
}

export function listDepartments() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    HTTP.get(auth, `${__CONFIG__.API.SERVER_URL}/departments`, dispatch, (data) => {
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

const initialState = {
  departments: {},
  inventories: {},
  users: {},
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case RELOAD_DEPARTMENTS: {
      const departments = _.reduce(action.departments, (hashDept, department) =>
        Object.assign({}, hashDept, { [department.id]: department }), {});
      // const nestedDepartments = _.reduce(action.departments, (nestedDept, department) => {
      //   if (!department.parent) {
      //     if (department.descendants && department.descendants.length) {
      //       nestedDept.push(Object.assign({}, nestDescendants(department.id, departments)));
      //     } else {
      //       nestedDept.push(department);
      //     }
      //     return nestedDept;
      //   }
      //   return nestedDept;
      // }, []);
      return Object.assign({}, state, {
        departments,
        // nestedDepartments
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
    default:
      return state;
  }
}
