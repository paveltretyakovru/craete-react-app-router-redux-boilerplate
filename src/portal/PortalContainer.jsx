import React, {Component} from 'react';
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

class PortalContainer extends Component {
  render() {
    const updTabIndex = (index) => {
      this.props.updateTabIndex(index);
    }

    return (
      <div className="portal">
        <aside className="portal__left-side">
          <PortalChecklistComponent />
        </aside>
    
        <aside className="portal__right-side">
          <div className="portal__header">
            <PortalHeaderComponent
              updateTabIndex={updTabIndex}
              tabIndex={this.props.tabIndex}
            />
          </div>
    
          <div className="portal__content">
    
            <main className="portal__main">
              Main content
            </main>
    
            <aside className="portal__right-blocks">
              <PortalTimerComponent />
              <div className="portal__blue-block">
                <div className="portal__blue-block-label">
                  {PORTAL_BLUE_BLOCK_LABEL}
                </div>
                <a href="./" className="portal__blue-block-link">
                  {PORTAL_BLUE_BLOCK_LINK_LABEL}
                </a>
    
              </div>
              <img
                src={blueBlockElementsImage}
                alt="elements"
                className="portal__blue-block-elements" />
            </aside>
    
          </div>
        </aside>
      </div>
    );
  }
}

const mapStateToProps = ({ portal }) => ({
  tabIndex: portal.tabIndex,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTabIndex,
  changePage: () => push('/'),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);