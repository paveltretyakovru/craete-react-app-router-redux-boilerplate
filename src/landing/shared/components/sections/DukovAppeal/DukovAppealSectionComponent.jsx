import React, {Component} from 'react';
import {Animated} from 'react-animated-css';

// Constants
import {
  DUKOV_APPEAL_TEXT, DUKOV_APPEAL_NAME, DUKOV_APPEAL_TITLE,
  DUKOV_APPEAL_FULL_NAME, DUKOV_APPEAL_POSITION, DUKOV_APPEAL_BUTTONN_VALUE,
} from './dukovAppealSectionComponentConstants';

// Styles
import './DukovAppealSectionComponent.scss';

// SVG Images
import logoImage from './shared/images/logo.svg';
import dukovPhotoImage from './shared/images/dukov-photo.png';
import leftFiguresImage from './shared/images/left-figures.svg';
import rightFiguresImage from './shared/images/right-figures.svg';

export class DukovAppealSectionComponent extends Component {
  render() {
    return (
      <div className="dukov-appeal-section__wrapper">

        {/* Left side elements */}
        <div className="dukov-appeal-section__left-side">
          <div className="dukov-appeal-section__left-side-figures">
            <Animated
              isVisible={this.props.active}
              animationIn="slideInLeft"
              animationOut="fadeOut"
              animationInDelay={800}
            >
              <img src={leftFiguresImage} alt=""/>
            </Animated>
          </div>
          <div className="dukov-appeal-section__left-side-logo">
            <Animated
              isVisible={this.props.active}
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInDelay={800}
            >
              <img src={logoImage} alt="" />
            </Animated>
          </div>
        </div>
        
          <div className="dukov-appeal-section__right-side">
            <div className="dukov-appeal-section__right-side-figures">
              <Animated
                isVisible={this.props.active}
                animationIn="slideInRight"
                animationOut="fadeOut"
                animationInDelay={1500}
              >
                <img src={rightFiguresImage} alt=""/>
              </Animated>
            </div>
          </div>
        
        <div className="dukov-appeal-section__content">
          <div className="dukov-photo">
            <Animated
              isVisible={this.props.active}
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInDelay={0}
            >
              <img src={dukovPhotoImage} alt=""/>
            </Animated>
          </div>
          <Animated
            isVisible={this.props.active}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInDelay={400}
          >            
            <div className="text-block">
              <p className="text-block__name">
                {DUKOV_APPEAL_NAME}
              </p>

              <p className="text-block__title">
                {DUKOV_APPEAL_TITLE}
              </p>

              <p className="text-block__letter">
                <span>{DUKOV_APPEAL_TEXT[0]}</span>
                <br /><br />
                <span>{DUKOV_APPEAL_TEXT[1]}</span>
              </p>

              <button className="text-block__button">
                {DUKOV_APPEAL_BUTTONN_VALUE}
              </button>

              <p className="text-block__signature-name">
                {DUKOV_APPEAL_FULL_NAME}
              </p>

              <p className="text-block__signature-position">
                {DUKOV_APPEAL_POSITION}
              </p>
            </div>
          </Animated>
        </div>
      </div>
    );
  }
}