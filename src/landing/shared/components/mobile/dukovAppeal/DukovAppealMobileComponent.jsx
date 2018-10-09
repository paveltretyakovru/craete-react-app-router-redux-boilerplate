import React, {Component} from 'react';

import './DukovAppealMobileComponent.scss';
import { DUKOV_APPEAL_TITLE, DUKOV_APPEAL_TEXT, DUKOV_APPEAL_FULL_NAME, DUKOV_APPEAL_POSITION, DUKOV_APPEAL_BUTTONN_VALUE } from '../../sections/DukovAppeal/dukovAppealSectionComponentConstants';

import logoImage from '../../sections/DukovAppeal/shared/images/logo.svg';
import dukovPhotoImage from '../../sections/DukovAppeal/shared/images/dukov-photo.svg';
import rightFiguresImage from '../../sections/DukovAppeal/shared/images/right-figures.svg';

export class DukovAppealMobileComponent extends Component {
  render() {
    const {confirmInvite, switchNopersonInviteModal, client} = this.props;

    return (
      <div className="dukov-appeal-mobile">
        <img src={rightFiguresImage} alt="abstract figures" className="dukov-appeal-mobile__right-figures"/>

        <div className="dukov-appeal-mobile__name">{this.props.client.clientName}</div>
        <div className="dukov-appeal-mobile__title">{DUKOV_APPEAL_TITLE}</div>
        <div className="dukov-appeal-mobile__text" dangerouslySetInnerHTML={{__html: DUKOV_APPEAL_TEXT.join('')}}></div>
        
        <div
          onClick={!!client.id ? confirmInvite : switchNopersonInviteModal}
          className="dukov-appeal-mobile__button"
        >
          {DUKOV_APPEAL_BUTTONN_VALUE}
        </div>

        <div className="dukov-appeal-mobile__footer">

          <img src={dukovPhotoImage} alt="Dukov" className="dukov-appeal-mobile__photo"/>

          <div className="dukov-appeal-mobile__signature">
            <img src={logoImage} alt="Gasporm" className="dukov-appeal-mobile__logo"/>
            <div className="dukov-appeal-mobile__signature-fullname">
              {DUKOV_APPEAL_FULL_NAME}
            </div>
            <div className="dukov-appeal-mobile__signature-position">
              {DUKOV_APPEAL_POSITION}
            </div>
          </div>
        </div>
      </div>
    );
  }
}