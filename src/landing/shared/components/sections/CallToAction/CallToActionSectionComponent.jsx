import React, {Component} from 'react';

import './CallToActionSectionComponent.scss';
import { CALL_TO_ACTION_TITLE_SPECIAL, CALL_TO_ACTION_TITLE, CALL_TO_ACTION_DESCRIPTION, CALL_TO_ACTION_LINK_DESCRIPTION, CALL_TO_ACTION_LINK, CALL_TO_ACTION_COPYRIGHT } from './CallToActionConstants';

export class CallToActionSectionComponent extends Component {
  render() {
    return (
      <div className="call-to-action-section__wrapper">
        <div className="call-to-action-section__side-left">
          <div className="call-to-action-section__title">
            <span className="blue-text">{CALL_TO_ACTION_TITLE_SPECIAL}</span>
            &nbsp;{CALL_TO_ACTION_TITLE}
          </div>

          <div className="call-to-action-section__description">
            {CALL_TO_ACTION_DESCRIPTION}
          </div>

          <div className="call-to-action-section__link">
            <div className="call-to-action-section__link-description">
              {CALL_TO_ACTION_LINK_DESCRIPTION}
            </div>

            <a href="/" className="big-link">{CALL_TO_ACTION_LINK}</a>
          </div>
        </div>

        <div className="call-to-action-section__side-right">
          <div className="call-to-action-section__copyright">
            {CALL_TO_ACTION_COPYRIGHT}
          </div>
        </div>  
      </div>
    );
  }
};