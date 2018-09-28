import {
  UPDATE_ACTIVE
} from './SlideshowConstants';

export const updateActive = (active = 0) => {
  return dispatch => dispatch({ type: UPDATE_ACTIVE, payload: active });
} 