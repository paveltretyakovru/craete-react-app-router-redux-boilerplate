import React from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const LandingContainer = props => (
  <div>
    <h1>Landing Container</h1>
    <div>
      <button onClick={() => props.changePage()}>Go to portal</button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/portal')
}, dispatch);

export default connect(null, mapDispatchToProps)(LandingContainer);