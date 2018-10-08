import React, {Component} from 'react';

import './CallToActionMobileComponent.scss';
import { WINNER_ELBRUS_TITLE_WINNERS, WINNER_ELBRUS_TITLE } from '../../sections/WinnerElbrus/WinnerElbrusSectionConstants';
import { CALL_TO_ACTION_DESCRIPTION, CALL_TO_ACTION_LINK_DESCRIPTION, CALL_TO_ACTION_LINK, CALL_TO_ACTION_COPYRIGHT } from '../../sections/CallToAction/CallToActionConstants';

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
          <span className="blue-text">{WINNER_ELBRUS_TITLE_WINNERS}</span>
          &nbsp;{WINNER_ELBRUS_TITLE}
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