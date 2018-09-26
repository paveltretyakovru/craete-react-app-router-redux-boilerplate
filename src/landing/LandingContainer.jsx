import React from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SectionsContainer, Section} from 'react-fullpage';

import {DukovAppealSectionComponent} from './shared/components/sections/DukovAppeal/DukovAppealSectionComponent';
import {InformationSectionComponent} from './shared/components/sections/Information/InformationSectionComponent';
import {DukovReviewSectionComponent} from './shared/components/sections/DukovReview/DukovReviewSectionComponent';
import {DeminReviewSectionComponent} from './shared/components/sections/DeminReview/DeminReviewSectionComponent';
import {CallToActionSectionComponent} from './shared/components/sections/CallToAction/CallToActionSectionComponent';

let options = {
  anchors: [
    'dukovAppealSection',
    'informationSection',
    'dukovReviewSection',
    'deminReviewSection',
    'callToActionSection',
  ],
  sectionClassName: 'section',
};

const LandingComponent = props => (
  <SectionsContainer className="sections__wrapper" {...options}>
    <DukovAppealSectionComponent />
    <InformationSectionComponent />
    <DukovReviewSectionComponent />
    <DeminReviewSectionComponent />
    <CallToActionSectionComponent />
  </SectionsContainer>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/portal')
}, dispatch);

export default connect(null, mapDispatchToProps)(LandingComponent);