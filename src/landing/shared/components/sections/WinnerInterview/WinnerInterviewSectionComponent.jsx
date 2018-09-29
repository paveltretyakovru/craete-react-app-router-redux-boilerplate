import React, {Component} from 'react';

import './WinnerInterviewSectionComponent.scss';
import { TITLE_TEXT, DESCRIPTION_TEXT, QUESTIONS_TEXT, QUOTE_TEXT, QUOTE_SIGNATURE_LINK_TEXT, QUOTE_SIGNATURE_TEXT, TITLE_WIN_TEXT } from './WinnerInterviewSectionConstants';

export class WinnerInterviewSectionComponent extends Component {
  render() {
    return (
      <div className="winner-interview-section__wrapper">
        
        <div className="winner-interview-section__content">

          <div className="winner-interview-section__title-wrapper">
            <div className="winner-interview-section__title">
              <span className="blue-text">{TITLE_WIN_TEXT}</span>
              &nbsp;{TITLE_TEXT}
            </div>
          </div>

          <div className="winner-interview-section__sides">
            <div className="winner-interview-section__sides-left">
              
              <div className="winner-interview-section__description">
                {DESCRIPTION_TEXT}
              </div>

              <div className="winner-interview-section__questions">
                {QUESTIONS_TEXT.map((item, index) => {
                  return (<div
                      key={`winner-interview-question-${index}`}
                      className="winner-interview-section__questions-item"
                    >
                    <div className="winner-interview-section__questions-item-num">
                      <div>
                        {index + 1}
                      </div>
                    </div>
                    <div className="winner-interview-section__questions-item-text">
                      {item}
                    </div>
                  </div>)
                })}
              </div>

            </div>

            <div className="winner-interview-section__sides-right">
              
              <div className="winner-interview-section__quote">
                {QUOTE_TEXT}
              </div>

              <div className="winner-interview-section__quote-signature">
                <a href="/">{QUOTE_SIGNATURE_LINK_TEXT}</a> {QUOTE_SIGNATURE_TEXT}
              </div>

            </div>
          </div>

        </div>
        
      </div>
    );
  }
};