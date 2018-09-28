import {connect} from 'react-redux';
import {Animated} from 'react-animated-css';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

// Images
import arrowLeftImage from './shared/assets/images/arrow-left.svg';
import arrowRightImage from './shared/assets/images/arrow-right.svg';

// Actions
import { updateActive } from './SlideshowActions';

// Styles
import './SlideshowContainer.scss';

class SlideshowContainer extends Component {
  render() {
    const toBack = () => this.updateActive(false);
    const toFront = () => this.updateActive(true);
    const children = this.props.children.map((child) => {
      return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          {child}
        </Animated>
      );
    })

    return(
      <div className="gpb-slideshow">
        <div className="gpb-slideshow__arrow-left" onClick={toBack}>
          <img src={arrowLeftImage} alt="←" />
        </div>

        <div className="gpb-slideshow__content">
          {
            this.props.children.map((child, index) => {
              return (
                <div style={{display: (this.props.slideshow.active === index) ? 'block' : 'none'}}>
                  <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.props.slideshow.active === index}>
                    {child}
                  </Animated>
                </div>
              );
            })
          }
        </div>

        <div className="gpb-slideshow__arrow-right" onClick={toFront}>
          <img src={arrowRightImage} alt="→" />
        </div>
      </div>
    );
  }

  updateActive(next = true) {
    let max = this.props.children.length - 1;
    let active = this.props.slideshow.active;

    if (next && ((active + 1) <= max)) {
      this.props.updateActive(active + 1);
    } else if (!next && (active !== 0)) {
      this.props.updateActive(active - 1);
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