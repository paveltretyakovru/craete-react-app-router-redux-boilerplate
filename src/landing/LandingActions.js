import {push} from 'connected-react-router';
import ReactGA from 'react-ga';

import {
  UPDATE_ACTIVE_SECTION, FETCH_LANDING_DATA_START, FETCH_LANDING_DATA_SUCCESS,
  FETCH_USER_URL,
  getConfirmInviteUrl,
  ENABLE_NOPERSONE_STATE,
  FETCH_LANDING_DATA_FAILURE,
  SWITCH_NOPERSON_INVITE_MODAL,
} from "./LandingConstants";

export const fetchLandingDataBegin = () => ({type: FETCH_LANDING_DATA_START});

export const fetchLandingDataSuccess = (client) => {
  return dispatch => dispatch({type: FETCH_LANDING_DATA_SUCCESS, payload: client});
}

export const fetchLandingData = (userId = '') => {
  return (dispatch) => {
    dispatch(fetchLandingDataBegin());
    // return fetch(`${process.env.PUBLIC_URL}${FETCH_USER_URL}/${userId}`)
    let start_time = new Date().getTime();
    return fetch(`${FETCH_USER_URL}/${userId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        let request_time = new Date().getTime() - start_time;
        ReactGA.timing({
            category: 'JS App',
            variable: 'load',
            value: request_time, // in milliseconds
            label: 'info.load'
        });

        // Запрос успешно выполнен и пользователь НЕ нажимал стать лидером
        if (json.success && !json.data.state) {
          // console.log('Пользователь НЕ нажимал на стать лидером');

          return json;
        } else {

          // state=0 initital
          // state=1 button press
          // state=2 page visited
          // Если пользователь нажимал стать лидером
          if (json.data.state === 1) {
            // console.log('Пользователь нажимал на стать лидером');

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
      .catch((error) => {
        console.error('Error on fetch landing data', { error });
        dispatch({ type: FETCH_LANDING_DATA_FAILURE });
      });
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
      ReactGA.event({
        category: 'User',
        action: 'Click on button'
      });
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

export const switchNopersonInviteModal = () => {
  return (dispatch) => {
    dispatch({type: SWITCH_NOPERSON_INVITE_MODAL});
  } 
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error({text: response.statusText, code: response.code});
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