import { UPDATE_ACTIVE_SECTION } from "./LandingConstants";

const initialState = {
  activeSection: null,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_ACTIVE_SECTION: {
      return {
        ...state,
        activeSection: action.payload,
      };
    }

    default: return { ...state };
  }  
}