import {
  UPDATE_ACTIVE
} from './SlideshowConstants';

const initialState = {
  active: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE: return { ...state, active: action.payload }

    default: return { ...state };
  };
}