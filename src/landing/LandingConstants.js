export const UPDATE_ACTIVE_SECTION = 'UPDATE_ACTIVE_SECTION';
export const FETCH_LANDING_DATA_START = 'FETCH_LANDING_DATA_START';
export const FETCH_LANDING_DATA_SUCCESS = 'FETCH_LANDING_DATA_SUCCESS';

export const FETCH_USER_URL = '/ny2018/webapi-1/info';

export const getConfirmInviteUrl = (id = '') => `${process.env.PUBLIC_URL}/info/${id}/confirm`

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