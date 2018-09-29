import React, {Component} from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SectionsContainer, Section } from 'react-fullpage';

// Components
import SlideshowContainer from './shared/containers/Slideshow/SlideshowContainer';
import {DukovAppealSectionComponent} from './shared/components/sections/DukovAppeal/DukovAppealSectionComponent';
import {InformationSectionComponent} from './shared/components/sections/Information/InformationSectionComponent';
import {DeminReviewSectionComponent} from './shared/components/sections/DeminReview/DeminReviewSectionComponent';
import {CallToActionSectionComponent} from './shared/components/sections/CallToAction/CallToActionSectionComponent';
import {WinnerElbrusSectionComponent} from './shared/components/sections/WinnerElbrus/WinnerElbrusSectionComponent';
import {WinnerInterviewSectionComponent} from './shared/components/sections/WinnerInterview/WinnerInterviewSectionComponent';

// Constants
import {fullpageOptions} from './LandingConstants';

// Actions
import {updateActiveSection} from './LandingActions';

class LandingComponent extends Component {
  onScroll(p) {
    if (this.props.landing.activeSection !== p.activeSection) {
      this.props.updateActiveSection(p.activeSection);
    }
  }

  render() {
    const onScroll = this.onScroll.bind(this);

    return (
      <div>
        <SectionsContainer
          {...fullpageOptions}
          scrollCallback={onScroll}
          activeSection={this.props.landing.activeSection}
        >
          <Section>
            <DukovAppealSectionComponent
              active={this.props.landing.activeSection === 0}
            />
          </Section>

          <Section>
            <InformationSectionComponent
              active={this.props.landing.activeSection === 1}
            />
          </Section>
          
          <Section>
            <SlideshowContainer
              active={this.props.landing.activeSection === 2}
            >
              <DeminReviewSectionComponent />
              <WinnerInterviewSectionComponent />
              <WinnerElbrusSectionComponent />
            </SlideshowContainer>
          </Section>

          <Section>
            <CallToActionSectionComponent
              active={this.props.landing.activeSection === 3}
            />
          </Section>
        </SectionsContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    landing: state.landing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateActiveSection,
    goToPortal: () => push('/portal'),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingComponent);