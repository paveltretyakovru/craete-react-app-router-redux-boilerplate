import React, {Component} from 'react';

// Constants
import { WINNER_ELBRUS_TITLE_WINNERS, WINNER_ELBRUS_TITLE, WINNER_ELBRUS_DESCRIPTION_LEFT, WINNER_ELBRUS_DESCRIPTION_RIGHT, WINNER_ELBRUS_LINK } from './WinnerElbrusSectionConstants';

// Images
import winnerElbrusImage from './shared/assets/images/elbrus-winner-photo.png';

// Styles
import './WinnerElbrusSectionComponent.scss';

export class WinnerElbrusSectionComponent extends Component {
  render() {
    const descriptionLeft = WINNER_ELBRUS_DESCRIPTION_LEFT.map((p, i) => {
      return <p key={`winner-elbrus-description-left-${i}`}>{p}</p>;
    });

    const descriptionRight = WINNER_ELBRUS_DESCRIPTION_RIGHT.map((p, i) => {
      return <p key={`winner-elbrus-description-right-${i}`}>{p}</p>;
    });

    return (
      <div className="winner-elbrus-section__wrapper">
        
        <div className="winner-elbrus-section__side-left">
          <div className="winner-elbrus-section__title">
            <span className="blue-text">{WINNER_ELBRUS_TITLE_WINNERS}</span>
            &nbsp;{WINNER_ELBRUS_TITLE}
          </div>
          
          <div className="winner-elbrus-section__description-left">
            {descriptionLeft}
          </div>

          <div className="winner-elbrus-section__link">
            <a href="#" className="big-link">
              {WINNER_ELBRUS_LINK}
            </a>
          </div>
        </div>

        <div className="winner-elbrus-section__side-right">
          <div className="winner-elbrus-section__image">
            <img src={winnerElbrusImage} alt="Elburs winners photo"/>
          </div>

          <div className="winner-elbrus-section__description-right">
            {descriptionRight}
          </div>
        </div>

      </div>
    );
  }
};