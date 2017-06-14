/*
 * Action types
 */
const HIDE_SIDEBAR = 'THEME_HIDE_SIDEBAR';
const TOGGLE_SIDEBAR = 'THEME_TOGGLE_SIDEBAR';
const TOGGLE_MENU = 'THEME_TOGGLE_MENU';
const UPDATE_SIDEBAR_ITEM = 'THEME_UPDATE_SIDEBAR_ITEM';
/*
 * Actions
 */

export function hideSideBar() {
  return {
    type: HIDE_SIDEBAR,
  };
}

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

export function toggleMenu(menu) {
  return {
    type: TOGGLE_MENU,
    menu,
  };
}

export function updateSidebarItem(item) {
  return {
    type: UPDATE_SIDEBAR_ITEM,
    item
  };
}

const initialState = {
  isSidebarOpen: true,
  tree: {},
  item: ''
};

/*
 * Reducer
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_SIDEBAR:
      return Object.assign({}, state, {
        isSidebarOpen: false,
      });
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        isSidebarOpen: !state.isSidebarOpen,
      });
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        tree: Object.assign({}, state.tree, {
          [action.menu]: !state.tree[action.menu],
        })
      });
    case UPDATE_SIDEBAR_ITEM:
      return Object.assign({}, state, {
        item: action.item
      });
    default:
      return state;
  }
}
