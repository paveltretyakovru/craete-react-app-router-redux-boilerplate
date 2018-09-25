import React from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SectionsContainer, Section} from 'react-fullpage';

import {FirstSectionComponent} from './shared/components/firstSection/FirstSectionComponent';

let options = {
  sectionClassName:     'section',
  anchors:              ['sectionOne', 'sectionTwo', 'sectionThree'],
  scrollBar:            false,
  navigation:           true,
  verticalAlign:        false,
  sectionPaddingTop:    '0',
  sectionPaddingBottom: '0',
  arrowNavigation:      true
};

const LandingComponent = props => (
  <div>
    <SectionsContainer className="container" {...options}>
      <FirstSectionComponent changePage={() => { props.changePage() }} />
      <Section color="#A7DBD8">Page 2</Section>
      <Section color="#E0E4CC">Page 3</Section>
    </SectionsContainer>
  </div>
);

// export default LandingComponent;

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/portal')
}, dispatch);

export default connect(null, mapDispatchToProps)(LandingComponent);