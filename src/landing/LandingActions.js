import {push} from 'connected-react-router';

import {
  UPDATE_ACTIVE_SECTION, FETCH_LANDING_DATA_START, FETCH_LANDING_DATA_SUCCESS,
  FETCH_USER_URL,
  getConfirmInviteUrl,
} from "./LandingConstants";

export const fetchLandingDataBegin = () => ({type: FETCH_LANDING_DATA_START});

export const fetchLandingDataSuccess = (client) => {
  return dispatch => dispatch({type: FETCH_LANDING_DATA_SUCCESS, payload: client});
}

export const fetchLandingData = (userId = '') => {
  return (dispatch) => {
    dispatch(fetchLandingDataBegin());

    // return fetch(`${process.env.PUBLIC_URL}${FETCH_USER_URL}/${userId}`)
    return fetch(`${FETCH_USER_URL}/${userId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        // Запрос успешно выполнен и пользователь НЕ нажимал стать лидером
        if (json.success && !json.data.state) {
          console.log('Пользователь НЕ нажимал на стать лидером');

          return json;
        } else {

          // state=0 initital
          // state=1 button press
          // state=2 page visited
          // Если пользователь нажимал стать лидером
          if (json.data.state === 1) {
            console.log('Пользователь нажимал на стать лидером');

            // Сохраняем полученные данные
            dispatch(fetchLandingDataSuccess({
              id: json.data.id,
              ...json.data.jsonBody,
              state: json.data.state,
            }));

            // Перенаправляем пользователя на портал
            dispatch(push('/s/'));
          }

          return json;
        }
      })
      .then((json) => {
        dispatch(fetchLandingDataSuccess({
          id: json.data.id,
          ...json.data.jsonBody,
          state: json.data.state,
        }));
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

export const confirmInvite = (id = '') => {
  return (dispatch) => {
    if (id) {
      postData(getConfirmInviteUrl(id))
        .then((json) => {
          // Сохраняем полученные данные
          dispatch(fetchLandingDataSuccess({
            id: json.data.id,
            ...json.data.jsonBody,
            state: json.data.state,
          }));

          // Перенаправляем пользователя на портал
          dispatch(push('/s/'));
        })
        .catch((error) => {
          console.error('Error on fetch landing data', { error })
        });
    } else {
      console.error('No user id');
    }
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
}