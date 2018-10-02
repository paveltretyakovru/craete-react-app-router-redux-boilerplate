import React, {Component} from 'react';

// Styles
import './PortalTimerComponent.scss';
import { PORTAL_TIMER_LABEL, PORTAL_TIMER_BIG_LINK_VALUE } from './PortalTimerConstants';

export class PortalTimerComponent extends Component {
  render() {
    return (
      <div className="portal-timer">

        <div className="portal-timer__counter">
          <div className="portal-timer__counter-box">
            <div className="portal-timer__counter-number">
              3
            </div>
            <div className="portal-timer__counter-string">
              дня
            </div>
          </div>

          <div className="portal-timer__counter-box">
            <div className="portal-timer__counter-number">
              14
            </div>
            <div className="portal-timer__counter-string">
              часов
            </div>
          </div>

          <div className="portal-timer__counter-box">
            <div className="portal-timer__counter-number">
              : 48
            </div>
            <div className="portal-timer__counter-string">
              минут
            </div>
          </div>
        </div>

        <div className="portal-timer__label">
          {PORTAL_TIMER_LABEL}
        </div>

        <div className="portal-timer__link">
          <a href="/" className="big-link">{PORTAL_TIMER_BIG_LINK_VALUE}</a>
        </div>
      </div>
    );
  }
}