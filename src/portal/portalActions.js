import {
  CHANGE_TAB_INDEX
} from './portalConstants';

export const updateMenuItem = (tabIndex = 0) => {
  return dispatch => {
    dispatch({
      action: CHANGE_TAB_INDEX,
      payload: +tabIndex,
    })
  }
}