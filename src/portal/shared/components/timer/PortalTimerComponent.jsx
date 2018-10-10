import React, {Component} from 'react';
import ReactGA from 'react-ga';
import declint from 'declint-ru';

// Styles
import './PortalTimerComponent.scss';
import { PORTAL_TIMER_LABEL, PORTAL_TIMER_BIG_LINK_VALUE, PORTAL_TIMER_LABEL_NEXT } from './PortalTimerConstants';
import declint from 'declint-ru';

export class PortalTimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainTime: {},
      currentPartEndDate: {
        text: PORTAL_TIMER_LABEL,
        date: 'October 10, 2018 15:30:00',
      },
      nextPartEndDate: {
        text: PORTAL_TIMER_LABEL_NEXT,
        date: 'October 25, 2018 23:59:00',
      },
    };
  }

  getEndDate() {
    const nowDate = new Date();
    const currentPartEndDate = new Date(this.state.currentPartEndDate.date);

    return nowDate > currentPartEndDate
      ? this.state.nextPartEndDate
      : this.state.currentPartEndDate;
  }

   componentDidMount() {
      const endDate = new Date(this.getEndDate().date);

      this.calculatedTime(endDate);
      
      this.intervalId = setInterval(() => {
        const endDate = new Date(this.getEndDate().date);

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
          {this.getEndDate().text}
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