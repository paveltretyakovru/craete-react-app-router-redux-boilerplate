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
      <div className="demin-review-section__wrapper">

        <aside className="demin-review-section__side-left">
          <div className="demin-review-section__title">
            <Animated
              isVisible={this.props.active}
              animationIn="fadeInDown"
              animationOut="fadeOut"
              animationInDelay={300}
            >
              <span className="blue-text">{WINNERS_TITLE_TEXT}&nbsp;</span>
              {TITLE_TEXT}
            </Animated>
          </div>

          <div className="demin-review-section__description">
            <Animated
                animationIn="fadeInUp"
                animationOut="fadeOut"
                isVisible={this.props.active}
            >
              { DESCRIPTION_TEXT.map((p, i) => <p key={`desc-${i}`}>{p}</p>) }
            </Animated>
          </div>
        </aside>

        <aside className="demin-review-section__side-right">
          <Animated
            animationIn="fadeInRight"
            animationOut="fadeOut"
            isVisible={this.props.active}
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}
          >
          <a href="/" className="big-link">{BIG_LINK_TEXT}</a>
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
          </Animated>
        </aside>
      </div>
    )
  }
}