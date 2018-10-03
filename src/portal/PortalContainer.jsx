import React from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Actions
import {updateTabIndex} from './portalActions';

// Styles
import './PortalContainer.scss';
import { PortalChecklistComponent } from './shared/components/checklist/PortalChecklistComponent';
import { PortalHeaderComponent } from './shared/components/header/PortalHeaderComponent';
import { PortalTimerComponent } from './shared/components/timer/PortalTimerComponent';
import { PORTAL_BLUE_BLOCK_LABEL, PORTAL_BLUE_BLOCK_LINK_LABEL } from './portalConstants';

// Images
import blueBlockElementsImage from './shared/assets/images/elements.svg';

const PortalContainer = props => (
  <div className="portal">
    <aside className="portal__left-side">
      <PortalChecklistComponent />
    </aside>

    <aside className="portal__right-side">
      <PortalTimerComponent />
      <div className="portal__blue-block">
        <div className="portal__blue-block-label">
          {PORTAL_BLUE_BLOCK_LABEL}
        </div>
        <a href="./" className="portal__blue-block-link">
          {PORTAL_BLUE_BLOCK_LINK_LABEL}
        </a>

        <img
          src={blueBlockElementsImage}
          alt="elements"
          className="portal__blue-block-elements" />
      </div>
    </aside>

    <header className="portal__header">
      <PortalHeaderComponent />
    </header>

    <main className="portal__content">
      Main content
    </main>

  </div>
);

const mapStateToProps = ({ portal }) => ({
  tabIndex: portal.tabIndex,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTabIndex,
  changePage: () => push('/'),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);