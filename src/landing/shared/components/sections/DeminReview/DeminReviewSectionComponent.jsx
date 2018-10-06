import {Animated} from 'react-animated-css';
import React, {Component} from 'react';

// Constants
import {
  BIG_LINK_TEXT, DEMIN_FULLNAME_TEXT, TITLE_TEXT,
  WINNERS_TITLE_TEXT, DEMIN_LETTER_TEXT, DESCRIPTION_TEXT, DEMIN_POSITION_TEXT
} from './DeminReviewSectionConstants';

// Styels
import './DeminReviewSectionComponent.scss';

// Images
import deminAvatarImage from './shared/assets/images/demin-avatar.png';

export class DeminReviewSectionComponent extends Component {
  render() {
    return (
      <Animated
        isVisible={this.props.active}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDelay={300}
        className="demin-review-section__wrapper"
      >

        <aside className="demin-review-section__side-left">
          <div className="demin-review-section__title">
            <span className="blue-text">{WINNERS_TITLE_TEXT}&nbsp;</span>
            {TITLE_TEXT}
          </div>

          <div className="demin-review-section__description">
            { DESCRIPTION_TEXT.map((p, i) => <p key={`desc-${i}`}>{p}</p>) }
          </div>
        </aside>

        <aside className="demin-review-section__side-right">
          {/* <a href="/" className="big-link">{BIG_LINK_TEXT}</a> */}
          <div className="demin-review-section__letter">
            { DEMIN_LETTER_TEXT.map((p, i) => <p key={`letter-${i}`}>{p}</p>) }
          </div>

          <div className="demin-signature">
            <div className="demin-signature__avatar">
              <img src={deminAvatarImage} alt="Demin Denis Avatar"/>
            </div>
            <div className="demin-signature__text">
              <p className="demin-signature__fullname">
                {DEMIN_FULLNAME_TEXT}
              </p>
              <p className="demin-signature__position">
                {DEMIN_POSITION_TEXT}
              </p>
            </div>
          </div>
        </aside>
      </Animated>
    )
  }
}