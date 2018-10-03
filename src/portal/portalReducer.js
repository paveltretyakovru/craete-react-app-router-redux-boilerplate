import {
  CHANGE_TAB_INDEX
} from './portalConstants';

const initialState = {
  tabIndex: 1,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_TAB_INDEX: return { ...state, tabIndex: action.payload };
    default: return { ...state };
  }
}
