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

const PortalContainer = props => (
  <div className="portal">
    <aside className="portal__left-side">
      <PortalChecklistComponent />
    </aside>

    <aside className="portal__right-side">
      Right side
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