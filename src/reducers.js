import { combineReducers } from 'redux';

import portal from './portal/portalReducer';
import landing from './landing/LandingReducer';
import slideshow from './landing/shared/containers/Slideshow/SlideshowReducer';

export default combineReducers({ portal, slideshow, landing });