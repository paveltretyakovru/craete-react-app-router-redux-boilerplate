import { UPDATE_ACTIVE_SECTION } from "./LandingConstants";

export const updateActiveSection = (section = 0) => {
  return (dispatch) => {
    return dispatch({ type: UPDATE_ACTIVE_SECTION, payload: section });
  };
};