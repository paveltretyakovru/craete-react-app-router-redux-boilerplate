import React, {Component} from 'react';

import './CallToActionMobileComponent.scss';
import { CALL_TO_ACTION_DESCRIPTION, CALL_TO_ACTION_LINK_DESCRIPTION, CALL_TO_ACTION_LINK, CALL_TO_ACTION_COPYRIGHT, CALL_TO_ACTION_TITLE_SPECIAL, CALL_TO_ACTION_TITLE } from '../../sections/CallToAction/CallToActionConstants';

export class CallToActionMobileComponent extends Component {
  render() {
    const description = CALL_TO_ACTION_DESCRIPTION.map(
      (d, i) => {
        return <p key={`qta-${i}`}>{d}</p>
      }
    );

    return (
      <div className="call-to-action-mobile">

        <div className="call-to-action-mobile__title gpn-slideshow-mobile__title">
          <span className="blue-text">{CALL_TO_ACTION_TITLE_SPECIAL}</span>
          &nbsp;{CALL_TO_ACTION_TITLE}
        </div>
        <div className="call-to-action-mobile__text gpn-slideshow-mobile__text">
          {description}
        </div>

        <div className="call-to-action-mobile__link">
          <div className="call-to-action-mobile__link-description">
            {CALL_TO_ACTION_LINK_DESCRIPTION}
          </div>

          <div className="call-to-action-mobile__link-block">
            <a href="/" className="big-link">{CALL_TO_ACTION_LINK}</a>
          </div>
        </div>

        <div className="call-to-action-mobile__copyright">
          {CALL_TO_ACTION_COPYRIGHT}          
        </div>
      </div>
    );
  }
}