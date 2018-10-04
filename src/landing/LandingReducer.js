import {
  UPDATE_ACTIVE_SECTION, FETCH_LANDING_DATA_START, FETCH_LANDING_DATA_SUCCESS
} from "./LandingConstants";

const initialState = {
  client: {sex: '', clientName: ''},
  loading: false,
  activeSection: 0,
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

    default: return { ...state };
  }  
}