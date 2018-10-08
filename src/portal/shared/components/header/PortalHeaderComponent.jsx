import React, {Component} from 'react';

// Styles
import './PortalHeaderComponent.scss';
import { PORTAL_HEADER_ITEMS } from '../checklist/PortalChecklistConstants';

// Images
import lockImage from './shared/assets/images/lock.svg';
import alarmImage from './shared/assets/images/alarm.svg';
// import rectangleImage from './shared/assets/images/rectangle.svg';

export class PortalHeaderComponent extends Component {
  render() {
    const {clientName} = this.props.client;

    return (
      <div className="portal-header">
        <div className="portal-header__menu">
          {
            PORTAL_HEADER_ITEMS.map((item, index) => {
              if (item.secret) {
                return (
                  <div
                    key={`portal-header-item-key-${item.id}`}
                    // onClick={() => this.props.updateTabIndex(index)}
                    className="portal-header__menu-item portal-header__menu-item_locked"
                  >
                    <img src={lockImage} alt="Lock section"/>
                    <span>{item.value}</span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={`portal-header-item-key-${item.id}`}
                    onClick={() => this.props.updateTabIndex(index)}
                    className={
                      this.props.tabIndex === index
                        ? 'portal-header__menu-item portal-header__menu-item_active'
                        : 'portal-header__menu-item'
                    }
                  >
                    {item.value}
                  </div>
                );
              }
            })
          }
        </div>
        <div className="portal-header__account">
          <div className="portal-header__menu-item">
            <span>{clientName}</span>
            {/* <img src={rectangleImage} alt="rectangle"/> */}
          </div>
          <div className="portal-header__menu-item">
            <img src={alarmImage} alt="alarm"/>
          </div>
        </div>
      </div>
    );
  }
}