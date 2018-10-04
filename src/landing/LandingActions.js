import {
  UPDATE_ACTIVE_SECTION, FETCH_LANDING_DATA_START, FETCH_LANDING_DATA_SUCCESS,
  FETCH_USER_URL,
} from "./LandingConstants";

export const fetchLandingDataBegin = () => ({type: FETCH_LANDING_DATA_START});

export const fetchLandingDataSuccess = (client) => {
  return dispatch => dispatch({type: FETCH_LANDING_DATA_SUCCESS, payload: client});
}

export const fetchLandingData = (userId = '') => {
  return (dispatch) => {
    dispatch(fetchLandingDataBegin());

    return fetch(`${FETCH_USER_URL}/${userId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchLandingDataSuccess(json.data.jsonBody));
        return json.data.jsonBody;
      })
      .catch(error => console.error('Error on fetch landing data', { error }));
  }
}

export const updateActiveSection = (section = 0) => {
  return (dispatch) => {
    return dispatch({ type: UPDATE_ACTIVE_SECTION, payload: section });
  };
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}