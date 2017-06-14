/*
 * Action types
 */
const CONFIRM_SHOW = 'MODAL_CONFIRM_SHOW';
const CONFIRM_HIDE = 'MODAL_CONFIRM_HIDE';
const FORM_SHOW = 'MODAL_FORM_SHOW';
const FORM_HIDE = 'MODAL_FORM_HIDE';
const INFO_SHOW = 'MODAL_INFO_SHOW';
const INFO_HIDE = 'MODAL_INFO_HIDE';

/*
 * Actions
 */

export function showConfirm(message, callback, focusAccept = false) {
  return {
    type: CONFIRM_SHOW,
    message,
    callback,
    focusAccept,
  };
}

export function hideConfirm() {
  return {
    type: CONFIRM_HIDE,
  };
}

export function showForm(title, form, callback) {
  return {
    type: FORM_SHOW,
    title,
    form,
    callback,
  };
}

export function hideForm() {
  return {
    type: FORM_HIDE,
  };
}

export function showInfo(title, component, callback) {
  return {
    type: INFO_SHOW,
    title,
    component,
    callback,
  };
}

export function hideInfo() {
  return {
    type: INFO_HIDE,
  };
}

const initialState = {
  isShowingConfirmBox: false,
  isShowingFormbox: false,
  isShowingInfoBox: false,
  isFocusingAccept: false,
  formTitle: 'Form title',
  infoTitle: 'Info title',
};

/*
 * Reducer
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_SHOW:
      return Object.assign({}, state, {
        isShowingConfirmBox: true,
        confirmMessage: action.message,
        confirmCallback: action.callback,
        isFocusingAccept: action.focusAccept,
      });
    case CONFIRM_HIDE:
      return Object.assign({}, state, {
        isShowingConfirmBox: false,
        confirmMessage: undefined,
        confirmCallback: undefined,
        isFocusingAccept: false,
      });
    case FORM_SHOW:
      return Object.assign({}, state, {
        formTitle: action.title,
        isShowingFormbox: true,
        formComponent: action.form,
        formSubmitCallback: action.callback,
      });
    case FORM_HIDE:
      return Object.assign({}, state, {
        isShowingFormbox: false,
        formComponent: undefined,
        formSubmitCallback: undefined,
      });
    case INFO_SHOW:
      return Object.assign({}, state, {
        infoTitle: action.title,
        isShowingInfoBox: true,
        infoComponent: action.component,
        infoActionCallback: action.callback,
      });
    case INFO_HIDE:
      return Object.assign({}, state, {
        isShowingInfoBox: false,
        infoComponent: undefined,
        infoActionCallback: undefined,
      });
    default:
      return state;
  }
}
