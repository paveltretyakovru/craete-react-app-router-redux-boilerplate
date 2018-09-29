import React, {Component} from 'react';
import {Animated} from 'react-animated-css';

// Constants
import {
  INFORMATION_ITEMS, INFORMATION_TEXT,
  INFORMATION_TITLE, INFORMATION_LEADERS,
} from './InformationSectionComponentConstants';

// Images
import vectorImage from './shared/images/vector.svg';

import './InformationSectionComponent.scss';

export class InformationSectionComponent extends Component {
  render() {
    const informationText = INFORMATION_TEXT.map((item, index) => <p key={`inf${index}`}>{item}</p>);

    return (
      <div className="information-section__wrapper">
        <div className="information-section__left-content">

          {/* Title */}
          <Animated
            isVisible={this.props.active}
            animationIn="fadeInDown"
            animationOut="fadeOut"
            animationInDelay={300}
          >
            <p className="information-section__title">
              <span className="blue-text">
                {INFORMATION_LEADERS}
                </span> {INFORMATION_TITLE}
            </p>
          </Animated>

          <div className="information-section__description">

            {/* Description */}
            <div className="information-section__description-text">
              <Animated
                isVisible={this.props.active}
                animationIn="fadeInUp"
                animationOut="fadeOut"
                animationInDelay={800}
              >
                {informationText}
              </Animated>
            </div>

            {/* Items */}
            <div className="information-section__items">
              <Animated
                animationIn="fadeInRight"
                animationOut="fadeOut"
                isVisible={this.props.active}
                animationInDelay={1500}
              >
                <div className="information-section__items-item">
                  <div className="information-section__items-image">
                    <img src={vectorImage} alt="✓" />
                  </div>
                    <div className="information-section__items-text">
                      {INFORMATION_ITEMS[0]}
                    </div>
                </div>
              </Animated>

              <Animated
                animationIn="fadeInRight"
                animationOut="fadeOut"
                isVisible={this.props.active}
                animationInDelay={2000}
              >
                <div className="information-section__items-item">
                  <div className="information-section__items-image">
                    <img src={vectorImage} alt="✓" />
                  </div>
                    <div className="information-section__items-text">
                      {INFORMATION_ITEMS[1]}
                    </div>
                </div>
              </Animated>

              <Animated
                animationIn="fadeInRight"
                animationOut="fadeOut"
                isVisible={this.props.active}
                animationInDelay={2500}
              >
                <div className="information-section__items-item">
                  <div className="information-section__items-image">
                    <img src={vectorImage} alt="✓" />
                  </div>
                    <div className="information-section__items-text">
                      {INFORMATION_ITEMS[2]}
                    </div>
                </div>
              </Animated>
            </div>

          </div>
        </div>
      </div>
    );
  }
}