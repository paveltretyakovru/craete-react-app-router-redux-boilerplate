import React, {Component} from 'react';

import './WinnerElbrusMobileComponent.scss';
import { WINNER_ELBRUS_TITLE_WINNERS, WINNER_ELBRUS_TITLE, WINNER_ELBRUS_DESCRIPTION_LEFT } from '../../sections/WinnerElbrus/WinnerElbrusSectionConstants';

import photo from '../../sections/WinnerElbrus/shared/assets/images/elbrus-winner-photo.png';

export class WinnerElbrusMobileComponent extends Component {
  render() {
    return (
      <div className="winner-elbrus-mobile">
        <img
          src={photo}
          alt="Победители конкурса Лидеры России на горе Эльбрус"
          className="winner-interview-mobile__image"
        />

        <div className="winner-elbrus-mobile__title gpn-slideshow-mobile__title">
          <span className="blue-text">{WINNER_ELBRUS_TITLE_WINNERS}</span>
          &nbsp;{WINNER_ELBRUS_TITLE}
        </div>
        <div className="winner-elbrus-mobile__text gpn-slideshow-mobile__text">
          {
            WINNER_ELBRUS_DESCRIPTION_LEFT.map((item, i) => {
              return <p key={`winner-elbrus-mobile-text-${i}`}>{item}</p>
            })
          }
        </div>
      </div>
    );
  }
}