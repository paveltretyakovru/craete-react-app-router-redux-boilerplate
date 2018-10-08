import React, {Component} from 'react';
import { TITLE_WIN_TEXT, TITLE_TEXT, DESCRIPTION_TEXT, QUESTIONS_TEXT, QUOTE_TEXT, QUOTE_SIGNATURE_LINK_TEXT, QUOTE_SIGNATURE_TEXT } from '../../sections/WinnerInterview/WinnerInterviewSectionConstants';

import './WinnerInterviewMobileComponent.scss';
export class WinnerInterviewMobileComponent extends Component {
  render() {
    const questions = QUESTIONS_TEXT.map((item, i) => {
      return(
        <div
          key={`winner-interview-mobile-list-key-${i}`}
          className="winner-interview-mobile__item"
        >
          <div className="winner-interview-mobile__item-number">{i+1}</div>
          <div className="winner-interview-mobile__item-text">{item}</div>
        </div>
      );
    });

    return (
      <div className="winner-interview-mobile">
        <div className="gpn-slideshow-mobile__title winner-interview-mobile__title">
          <span className="blue-text">{TITLE_WIN_TEXT}</span>
          &nbsp;{TITLE_TEXT}
        </div>
        <div className="winner-interview-mobile__text gpn-slideshow-mobile__text">
          {DESCRIPTION_TEXT}
        </div>
        <div className="winner-interview-mobile__list">
          {questions}
        </div>
        <div className="gpn-slideshow-mobile__text winner-interview-mobile__quote">
          {QUOTE_TEXT}
        </div>
        <div className="gpn-slideshow-mobile__text winner-interview-mobile__quote-signature">
          {QUOTE_SIGNATURE_LINK_TEXT} {QUOTE_SIGNATURE_TEXT}
        </div>
      </div>
    );
  }
}