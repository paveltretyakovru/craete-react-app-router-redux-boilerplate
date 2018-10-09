import React, {Component} from 'react';

// Constants
import { PORTAL_CHECKLIST_TITLE, PORTAL_CHECKLIST_ITEMS } from './PortalChecklistConstants';

// Styles
import './PortalChecklistComponent.scss';

// Images
import portalLogoImage from './shared/assets/images/portal-logo.png';
import portalCheckboxImage from './shared/assets/images/portal-checkbox.png';
import portalCheckboxCheckedImage from './shared/assets/images/portal-checkbox-checked.png';
import lockImage from '../../../shared/components/header/shared/assets/images/lock.svg';

export class PortalChecklistComponent extends Component {
  render() {
    return (
      <div className="portal-checklist">

        <div className="portal-checklist__logo">
          <img src={portalLogoImage} alt="Gasprom Logo"/>
        </div>

        <div className="portal-checklist__list">
          <div className="portal-checklist__list-title">
              <img src={lockImage} alt="Lock section"/> {PORTAL_CHECKLIST_TITLE}
          </div>
          <ul className="portal-checklist__list-items">
            {
              PORTAL_CHECKLIST_ITEMS.map((checkbox) => {
                return (
                  <li
                    key={`portal-checkbox-item-${checkbox.id}`}
                    className={
                      checkbox.checked
                        ? 'portal-checklist__list-item portal-checklist__list-item_checked'
                        : 'portal-checklist__list-item portal-checklist__list-item_unchecked'
                    }
                  >
                      {
                        checkbox.checked
                          ? <img
                              alt="✓"
                              src={portalCheckboxCheckedImage}
                              className="portal-checklist__list-item-image" />
                          : <img
                              alt="✓"
                              src={portalCheckboxImage}
                              className="portal-checklist__list-item-image" />
                      }
                    <div className="portal-checklist__list-item-value">
                      {checkbox.value}
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  handleInputChange(event) {
    console.log('Change event', event);
  }
}