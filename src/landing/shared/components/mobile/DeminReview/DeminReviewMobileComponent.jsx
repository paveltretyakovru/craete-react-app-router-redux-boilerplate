import React, {Component} from 'react';

import './DeminReviewMobileComponent.scss';
import { WINNERS_TITLE_TEXT, TITLE_TEXT, DESCRIPTION_TEXT } from '../../sections/DeminReview/DeminReviewSectionConstants';

export class DeminReviewMobileComponent extends Component {
  render() {
    return (
      <div className="demin-review-mobile">
        <div className="demin-review-mobile__title gpn-slideshow-mobile__title">
          <span className="blue-text">{WINNERS_TITLE_TEXT}</span>
          &nbsp;{TITLE_TEXT}
        </div>
        <div className="demin-review-mobile__text gpn-slideshow-mobile__text">
          {
            DESCRIPTION_TEXT.map((item, i) => {
              return <p key={`demin-review-mobile-text-${i}`}>{item}</p>
            })
          }
        </div>
      </div>
    );
  }
}