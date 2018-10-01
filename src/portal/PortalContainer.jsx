import React from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {updateTabIndex} from './portalActions';

const PortalContainer = props => (
  <div>
    <h1>Portal Container</h1>
    <div>
      <p>Tab index: { props.tabIndex }</p>
      <button onClick={() => props.updateTabIndex(5)}>Update tab index</button>
      <button onClick={() => props.changePage()}>Go to landing</button>
    </div>
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