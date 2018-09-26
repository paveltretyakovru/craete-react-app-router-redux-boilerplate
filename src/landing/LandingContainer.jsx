import React from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SectionsContainer, Section} from 'react-fullpage';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import {DukovAppealSectionComponent} from './shared/components/sections/DukovAppeal/DukovAppealSectionComponent';
import {InformationSectionComponent} from './shared/components/sections/Information/InformationSectionComponent';
import {DukovReviewSectionComponent} from './shared/components/sections/DukovReview/DukovReviewSectionComponent';
import {DeminReviewSectionComponent} from './shared/components/sections/DeminReview/DeminReviewSectionComponent';
import {CallToActionSectionComponent} from './shared/components/sections/CallToAction/CallToActionSectionComponent';

const fullpageOptions = {
  anchors: [
    'dukovAppealSection',
    'informationSection',
    'dukovReviewSection',
    'deminReviewSection',
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

    <Section>
      <Carousel {...carouselOptions}>
        <DukovReviewSectionComponent />
        <DeminReviewSectionComponent />
      </Carousel>
    </Section>

    <CallToActionSectionComponent />
  </SectionsContainer>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/portal')
}, dispatch);

export default connect(null, mapDispatchToProps)(LandingComponent);