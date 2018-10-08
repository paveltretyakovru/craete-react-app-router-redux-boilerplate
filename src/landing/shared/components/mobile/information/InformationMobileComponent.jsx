import React, {Component} from 'react';

import './InformationMobileComponent.scss'; 
import { INFORMATION_ITEMS, INFORMATION_LEADERS, INFORMATION_TITLE, INFORMATION_TEXT } from '../../sections/Information/InformationSectionComponentConstants';

import vectorImage from '../../sections/Information/shared/images/vector.svg';

export class InformationMobileComponent extends Component {
  render() {
    const infromationPageItems = INFORMATION_ITEMS.map((item, index) => {
      return (
        <div
          key={`information-mobile-item-image-${index}`}
          className="information-mobile__item"
         >
          <img
            src={vectorImage}
            alt="List item"
            className="information-mobile__item-image"
          />
          <div className="information-mobile__item-text">
            {item}
          </div>
        </div>
      );
    });

    const informationPageText = INFORMATION_TEXT.map((item, index) => {
      return <p key={`inforamtion-mobile-text-key-${index}`}>{item}</p>
    });

    return (
      <div className="information-mobile">
        <div className="information-mobile__title">
          <span className="information-mobile__title-blue">
            {INFORMATION_LEADERS}
          </span>
          &nbsp;{INFORMATION_TITLE}
        </div>
        <div className="information-mobile__text">
          {informationPageText}
        </div>
        <div className="information-mobile__list">
          {infromationPageItems}
        </div>
      </div>
    );
  }
}