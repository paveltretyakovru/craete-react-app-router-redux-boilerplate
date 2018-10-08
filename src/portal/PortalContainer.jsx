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
import { PORTAL_BLUE_BLOCK_LABEL } from './portalConstants';

// Images
import blueBlockElementsImage from './shared/assets/images/elements.svg';
import { NewsComponent } from './shared/components/contents/news/NewsComponent';
import { HowRegisterComponent } from './shared/components/contents/how-register/HowRegisterComponent';

class PortalContainer extends Component {
  componentDidMount() {
    document.body.classList.add('light-background');
  }

  render() {
    const {client} = this.props;
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
              client={client}
              updateTabIndex={updTabIndex}
              tabIndex={this.props.tabIndex}
            />
          </div>
    
          <div className="portal__content">
            <div className="portal__mobile-menu">
              <PortalHeaderComponent
                client={client}
                updateTabIndex={updTabIndex}
                tabIndex={this.props.tabIndex}
              />
            </div>
            <main className="portal__main">
              {
                (() => {
                  switch (this.props.tabIndex) {
                    case 0: return <NewsComponent />;
                    case 1: return <HowRegisterComponent />;
                    default: return <p>Main containt default value</p>;
                  }
                })()  
              }
            </main>
    
            <aside className="portal__right-blocks">
              <PortalTimerComponent />
              <div className="portal__blue-block">
                <div className="portal__blue-block-label">
                  {PORTAL_BLUE_BLOCK_LABEL}
                </div>
                {/* <a href="./" className="portal__blue-block-link">
                  {PORTAL_BLUE_BLOCK_LINK_LABEL}
                </a> */}
    
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

const mapStateToProps = ({landing, portal }) => ({
  client: landing.client,
  tabIndex: portal.tabIndex,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTabIndex,
  changePage: () => push('/'),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);