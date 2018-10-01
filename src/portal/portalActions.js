import {
  CHANGE_TAB_INDEX
} from './portalConstants';

export const updateTabIndex = (tabIndex = 0) => {
  return dispatch => dispatch({ type: CHANGE_TAB_INDEX, payload: +tabIndex })
}