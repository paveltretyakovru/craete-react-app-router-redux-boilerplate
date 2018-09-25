import React from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const PortalContainer = props => (
  <div>
    <h1>Portal Container</h1>
    <div>
      <p>Tab index: { props.tabIndex }</p>
      <button onClick={() => props.changePage()}>Go to landing</button>
    </div>
  </div>
);

const mapStateToProps = ({ portal }) => ({
  tabIndex: portal.tabIndex,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/')
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);