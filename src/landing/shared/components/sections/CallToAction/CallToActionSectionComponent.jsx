import {Animated} from 'react-animated-css';
import React, {Component} from 'react';

import './CallToActionSectionComponent.scss';
import { CALL_TO_ACTION_TITLE_SPECIAL, CALL_TO_ACTION_TITLE, CALL_TO_ACTION_DESCRIPTION, CALL_TO_ACTION_LINK_DESCRIPTION, CALL_TO_ACTION_LINK, CALL_TO_ACTION_COPYRIGHT } from './CallToActionConstants';

export class CallToActionSectionComponent extends Component {
  render() {
    const {confirmInvite, client, switchNopersonInviteModal} = this.props;

    return (
      <div className="call-to-action-section__wrapper">
        <Animated
          isVisible={this.props.active}
          animationIn="slideInLeft"
          animationOut="fadeOut"
          animationInDelay={300}
          className="call-to-action-section__side-left"
        >
          <div className="call-to-action-section__title">
            <span className="blue-text">{CALL_TO_ACTION_TITLE_SPECIAL}</span>
            &nbsp;{CALL_TO_ACTION_TITLE}
          </div>

          <div className="call-to-action-section__description">
            {CALL_TO_ACTION_DESCRIPTION.map((d, i) => <p key={`qta-${i}`}>{d}</p>)}
          </div>

          <div className="call-to-action-section__link">
            <div className="call-to-action-section__link-description">
              {CALL_TO_ACTION_LINK_DESCRIPTION}
            </div>

            <a
              className="big-link"
              onClick={!!client.id ? confirmInvite : switchNopersonInviteModal}
            >
              {CALL_TO_ACTION_LINK}
            </a>
          </div>
        </Animated>

        <div className="call-to-action-section__side-right">
          <div className="call-to-action-section__copyright">
            {CALL_TO_ACTION_COPYRIGHT}
          </div>
        </div>  
      </div>
    );
  }
};