import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

// Images
import arrowLeftImage from './shared/assets/images/arrow-left.png';
import arrowRightImage from './shared/assets/images/arrow-right.png';

// Actions
import { updateActive } from './SlideshowActions';

// Styles
import './SlideshowContainer.scss';

class SlideshowContainer extends Component {
  render() {
    const toBack = () => this.updateActive(false);
    const toFront = () => this.updateActive(true);

    const children = this.props.children.map((child, index) => {
      return (
        <div
          key={`slideshow-page-${index}`}
          style={{
            display: (this.props.slideshow.active === index) ? 'block' : 'none'
          }}>
          {child}
        </div>
      );
    });

    return(
      <MediaQuery minDeviceWidth={768}>
        {(matches) => {
          if (matches) {

            // Desktop
            return (
              <div className="gpn-slideshow">
                <div className="gpn-slideshow__arrow-left" onClick={toBack}>
                  <img src={arrowLeftImage} alt="←" />
                </div>

                <div className="gpn-slideshow__content">
                  {children}
                </div>

                <div className="gpn-slideshow__arrow-right" onClick={toFront}>
                  <img src={arrowRightImage} alt="→" />
                </div>
              </div>
            );
          } else {

            // Mobile
            return (
              <div className="gpn-slideshow-mobile">
                <div className="gpn-slideshow-mobile__content">
                  {children}
                </div>
                <div className="gpn-slideshow-mobile__navigation">
                  <img
                    alt="←"
                    src={arrowLeftImage}
                    className="gpn-slideshow-mobile__navigation-left"

                    onClick={toBack}
                  />
                  <img
                    alt="→"
                    src={arrowRightImage}
                    className="gpn-slideshow-mobile__navigation-right"

                    onClick={toFront}
                  />
                </div>
              </div>
            );
          }
        }}
      </MediaQuery>
    );
  }

  updateActive(next = true) {
    let max = this.props.children.length - 1;
    let active = this.props.slideshow.active;

    if (next && ((active + 1) <= max)) {
      this.props.updateActive(active + 1);
    } else if (!next && (active !== 0)) {
      this.props.updateActive(active - 1);
    } else if (next && ((active + 1) > max)) {
      this.props.updateActive(0);
    } else if (!next && (active === 0)) {
      this.props.updateActive(max);
    }
  }
}

function mapStateToProps (state) {
  return {
    slideshow: state.slideshow,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updateActive: bindActionCreators(updateActive, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideshowContainer);