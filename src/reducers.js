import { combineReducers } from 'redux';

import portal from './portal/portalReducer';
import slideshow from './landing/shared/containers/Slideshow/SlideshowReducer';

export default combineReducers({ portal, slideshow });