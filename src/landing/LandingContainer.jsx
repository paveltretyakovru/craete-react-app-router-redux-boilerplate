import React from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import {bindActionCreators} from 'redux';
import {SectionsContainer} from 'react-fullpage';

import {DukovAppealSectionComponent} from './shared/components/sections/DukovAppeal/DukovAppealSectionComponent';
import {InformationSectionComponent} from './shared/components/sections/Information/InformationSectionComponent';
import {DukovReviewSectionComponent} from './shared/components/sections/DukovReview/DukovReviewSectionComponent';
import {DeminReviewSectionComponent} from './shared/components/sections/DeminReview/DeminReviewSectionComponent';
import {CallToActionSectionComponent} from './shared/components/sections/CallToAction/CallToActionSectionComponent';
import {WinnerElbrusSectionComponent} from './shared/components/sections/WinnerElbrus/WinnerElbrusSectionComponent';
import {WinnerInterviewSectionComponent} from './shared/components/sections/WinnerInterview/WinnerInterviewSectionComponent';

import "react-responsive-carousel/lib/styles/carousel.min.css";

const fullpageOptions = {
  anchors: [
    'dukovAppealSection',
    'informationSection',
    'carouselSection',
    'callToActionSection',
  ],
  navigation: false,
  sectionClassName: 'section',
};

const carouselOptions = {
  showArrows: false,
  showThumbs: false,
  showStatus: false,
  emulateTouch: true, 
}

const LandingComponent = props => (
  <SectionsContainer {...fullpageOptions}>
    <DukovAppealSectionComponent />
    <InformationSectionComponent />

    <Carousel {...carouselOptions}>
      <DukovReviewSectionComponent />
      <DeminReviewSectionComponent />
      <WinnerInterviewSectionComponent />
      <WinnerElbrusSectionComponent />
    </Carousel>

    <CallToActionSectionComponent />
  </SectionsContainer>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/portal')
}, dispatch);

export default connect(null, mapDispatchToProps)(LandingComponent);