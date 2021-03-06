import * as types from 'types';
import { combineReducers } from 'redux';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
      return '';
    case types.LOGIN_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const profile = (
    state = false,
    action
) => {
    switch (action.type) {
        case types.LOGOUT_SUCCESS_USER:
            return false;
        default:
            return state;
    }
}

const google = (
    state = false,
    action
) => {
    switch (action.type) {
        case types.LOGOUT_SUCCESS_USER:
            return false;
        default:
            return state;
    }
}

const isOwner = (
    state = false,
    action
) => {
    switch (action.type) {
        case types.IS_OWNER_SUCCESS:
            return action.res.data;
        case types.LOGOUT_SUCCESS_USER:
        case types.IS_OWNER_FAILURE:
            return false;
        default:
            return state;

    }
}

const userReducer = combineReducers({
    isLogin,
    isWaiting,
    authenticated,
    message,
    profile,
    google,
    isOwner
});

export default userReducer;
