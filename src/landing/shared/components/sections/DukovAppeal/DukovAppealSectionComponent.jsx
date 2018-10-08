import React, {Component} from 'react';
import {Animated} from 'react-animated-css';

// Constants
import {
  DUKOV_APPEAL_TEXT, DUKOV_APPEAL_TITLE,
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
    const {confirmInvite} = this.props;

    return (
      <Animated
        isVisible={this.props.active}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDelay={500}
        className="dukov-appeal-section__wrapper"
      >
        <img src={leftFiguresImage} alt="" className="dukov-appeal-section__left-figures"/>
        
        <img src={logoImage} alt="" className="dukov-appeal-section__logo"/>

        <img src={dukovPhotoImage} alt="" className="dukov-appeal-section__photo"/>
        
        <div className="dukov-appeal-section__content">
          <div className="dukov-appeal-section__name">{this.props.client.clientName}</div>
          <div className="dukov-appeal-section__title">{DUKOV_APPEAL_TITLE}</div>
          <div className="dukov-appeal-section__text">{DUKOV_APPEAL_TEXT}</div>

          <div className="dukov-appeal-section__button" onClick={confirmInvite}>
            {DUKOV_APPEAL_BUTTONN_VALUE}
          </div>

          <div className="dukov-appeal-section__signature">
            <div className="dukov-appeal-section__signature-name">{DUKOV_APPEAL_FULL_NAME}</div>
            <div className="dukov-appeal-section__signature-position">{DUKOV_APPEAL_POSITION}</div>
          </div>
        </div>
        <img src={rightFiguresImage} alt="" className="dukov-appeal-section__right-figures"/>
      </Animated>
    );
  }
}