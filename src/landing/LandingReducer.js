import {
  UPDATE_ACTIVE_SECTION,FETCH_LANDING_DATA_START, FETCH_LANDING_DATA_SUCCESS,
  FETCH_LANDING_DATA_FAILURE,
  SWITCH_NOPERSON_INVITE_MODAL,
} from "./LandingConstants";

const initialState = {
  client: {sex: '', clientName: '', id: '', state: 0},
  loading: false,
  activeSection: 0,
  nopersonInviteModalVisiable: false,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_ACTIVE_SECTION: {
      return { ...state, activeSection: action.payload };
    }

    case FETCH_LANDING_DATA_START: {
      return { ...state, loading: true };
    }

    case FETCH_LANDING_DATA_SUCCESS: {
      return { ...state, loading: false, client: action.payload };
    }

    case FETCH_LANDING_DATA_FAILURE: {
      return {
          ...state,
          loading: false,
          client: { ...initialState.client }
      }
    }

    case SWITCH_NOPERSON_INVITE_MODAL: {
      return {
        ...state, 
        nopersonInviteModalVisiable: !state.nopersonInviteModalVisiable
      };
    }

    default: return { ...state };
  }  
}