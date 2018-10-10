import React, {Component} from 'react';
import ReactGA from 'react-ga';
import declint from 'declint-ru';

// Styles
import './PortalTimerComponent.scss';


import { PORTAL_TIMER_LABEL, PORTAL_TIMER_BIG_LINK_VALUE } from './PortalTimerConstants';


export class PortalTimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainTime: {}
    };
  }

   componentDidMount() {
      const endDate = new Date(2018, 9, 10, 15, 30, 0);
      this.calculatedTime(endDate);
      
      this.intervalId = setInterval(() => {
        this.calculatedTime(endDate)
      }, 1000 * 60);
     
   };

   componentWillUnmount() {
    clearInterval(this.intervalId);
   }

  calculatedTime = (endDate) => {

    const now = new Date();

    if (now < endDate) {
      const remainTime = endDate.getTime() - now.getTime();

      const millisecondsInDay = 1000 * 3600 * 24;
      const secondsInDay = 1000 * 3600;

      const days = Math.floor(remainTime / (millisecondsInDay));
      const hours =  Math.floor((remainTime - days * (millisecondsInDay)) / (secondsInDay));
      const minutes = Math.floor((remainTime - (days * (millisecondsInDay) + hours * (secondsInDay))) / (1000 * 60))

      this.setState({
        remainTime: {
          days: days,
          hours: hours,
          minutes: minutes
        }
      });
    }
  }

  render() {
    return (
      <div className="portal-timer">

        <div className="portal-timer__label">
          {PORTAL_TIMER_LABEL}
        </div>

        <div className="portal-timer__counter">
          <div className="portal-timer__counter-box">
            <div className="portal-timer__counter-number">
              {this.state.remainTime.days}
            </div>
            <div className="portal-timer__counter-string">
              {declint(this.state.remainTime.days || 0, ['день', 'дня', 'дней'])}
            </div>
          </div>

          <div className="portal-timer__counter-box">
            <div className="portal-timer__counter-number">
              {this.state.remainTime.hours}
            </div>
            <div className="portal-timer__counter-string">
              {declint(this.state.remainTime.hours || 0, ['час', 'часа', 'часов'])}
            </div>
          </div>

          <div className="portal-timer__counter-box">
            <div className="portal-timer__counter-number">
              : {this.state.remainTime.minutes}
            </div>
            <div className="portal-timer__counter-string">
              {declint(this.state.remainTime.minutes || 0, ['минута', 'минуты', 'минут'])}
            </div>
          </div>
        </div>

        <div className="portal-timer__link">

            <ReactGA.OutboundLink
                eventLabel="registerLink"
                className="big-link"
                to="https://лидерыроссии.рф"
                rel="noopener noreferrer"
                target="_blank">
                {PORTAL_TIMER_BIG_LINK_VALUE}
            </ReactGA.OutboundLink>
        </div>
      </div>
    );
  }
}