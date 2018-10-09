export const UPDATE_ACTIVE_SECTION = 'UPDATE_ACTIVE_SECTION';
export const FETCH_LANDING_DATA_START = 'FETCH_LANDING_DATA_START';
export const FETCH_LANDING_DATA_FAILURE = 'FETCH_LANDING_DATE_FAILURE';
export const FETCH_LANDING_DATA_SUCCESS = 'FETCH_LANDING_DATA_SUCCESS';
export const SWITCH_NOPERSON_INVITE_MODAL = 'SWITCH_NOPERSON_INVITE_MODAL';

export const FETCH_USER_URL = '/ny2018/webapi-1/info';

export const getConfirmInviteUrl = (id = '') => `/ny2018/webapi-1/info/${id}/confirm`

export const fullpageOptions = {
  anchors: [
    'dukovAppealSection',
    'informationSection',
    'slideshowSection',
    'callToActionSection',
  ],
  navigation: false,
  sectionClassName: 'section',
};