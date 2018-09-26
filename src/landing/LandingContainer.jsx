import React, {Component} from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import {bindActionCreators} from 'redux';
import {SectionsContainer} from 'react-fullpage';

// Components
import {DukovAppealSectionComponent} from './shared/components/sections/DukovAppeal/DukovAppealSectionComponent';
import {InformationSectionComponent} from './shared/components/sections/Information/InformationSectionComponent';
import {DukovReviewSectionComponent} from './shared/components/sections/DukovReview/DukovReviewSectionComponent';
import {DeminReviewSectionComponent} from './shared/components/sections/DeminReview/DeminReviewSectionComponent';
import {CallToActionSectionComponent} from './shared/components/sections/CallToAction/CallToActionSectionComponent';
import {WinnerElbrusSectionComponent} from './shared/components/sections/WinnerElbrus/WinnerElbrusSectionComponent';
import {WinnerInterviewSectionComponent} from './shared/components/sections/WinnerInterview/WinnerInterviewSectionComponent';

// Constants
import {fullpageOptions, carouselOptions} from './LandingConstants';

// Styles
import "react-responsive-carousel/lib/styles/carousel.min.css";

class LandingComponent extends Component {
  render() {
    return (
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
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  goToPortal: () => push('/portal')
}, dispatch);

export default connect(null, mapDispatchToProps)(LandingComponent);