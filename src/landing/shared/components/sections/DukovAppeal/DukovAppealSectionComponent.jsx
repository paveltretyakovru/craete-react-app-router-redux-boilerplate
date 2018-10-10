import React, {Component} from 'react';
import {Animated} from 'react-animated-css';

// Constants
import {
  DUKOV_APPEAL_TEXT, DUKOV_APPEAL_TITLE,
  DUKOV_APPEAL_FULL_NAME, DUKOV_APPEAL_POSITION, DUKOV_APPEAL_BUTTONN_VALUE,
  DUKOV_APPEAL_NAME_ANONIM
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
    const {confirmInvite, client, switchNopersonInviteModal} = this.props;

    // Формирование заголовка в зависимости от person || noperson
    const name = (() => {
      if(!!client.id) {
        return (
          <div className="dukov-appeal-section__name">
            {client.clientName}
          </div>
        )
      } else {
        return (
          <div className="dukov-appeal-section__name">
              {DUKOV_APPEAL_NAME_ANONIM}
          </div>
        )
      }
    })()

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
          {name}
          <div className="dukov-appeal-section__title">{DUKOV_APPEAL_TITLE}</div>

          <div className="dukov-appeal-section__text" dangerouslySetInnerHTML={{__html: DUKOV_APPEAL_TEXT.join('')}}></div>

          <div
            className="dukov-appeal-section__button"
            onClick={!!client.id ? confirmInvite : switchNopersonInviteModal}
          >
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