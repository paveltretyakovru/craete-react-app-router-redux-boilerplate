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

// Images
import logoImage from './shared/components/sections/DukovAppeal/shared/images/logo.svg';

// Constants
import {fullpageOptions} from './LandingConstants';

// Actions
import {updateActiveSection, fetchLandingData} from './LandingActions';

class LandingComponent extends Component {
  onScroll(p) {
    const { activeSection } = this.props;

    if (activeSection !== p.activeSection) {
      this.props.updateActiveSection(p.activeSection);
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchLandingData(userId);
  }

  render() {
    const { loading, client, activeSection } = this.props;
    const onScroll = this.onScroll.bind(this);

    const loaderStyle = {
      width: '100%', height: '100%', display: 'flex', position: 'absolute',
      alignItems: 'center', justifyContent: 'center', backgroundColor: '#2f2f2f',
    }

    if (loading) {
      return (
        <div style={loaderStyle} className="fadeInEffect">
          <img src={logoImage} alt="Gasprom logo"/>
        </div>
      )
    }

    return (
      <div style={{overflow: 'hidden'}}>
        <SectionsContainer
          {...fullpageOptions}
          scrollCallback={onScroll}
          activeSection={activeSection}
        >
          <Section>
            <DukovAppealSectionComponent
              client={client}
              active={activeSection === 0}
            />
          </Section>

          <Section>
            <InformationSectionComponent
              active={activeSection === 1}
            />
          </Section>
          
          <Section>
            <SlideshowContainer
              active={activeSection === 2}
            >
              <DeminReviewSectionComponent
                active={
                  this.props.slideshow.active === 0
                  && activeSection === 2
                }
              />
              <WinnerInterviewSectionComponent
                active={this.props.slideshow.active === 1}
              />
              <WinnerElbrusSectionComponent
                active={this.props.slideshow.active === 2}
              />
            </SlideshowContainer>
          </Section>

          <Section>
            <CallToActionSectionComponent
              active={activeSection === 3}
            />
          </Section>
        </SectionsContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    client: state.landing.client,
    loading: state.landing.loading,
    slideshow: state.slideshow,
    activeSection: state.landing.activeSection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchLandingData,
    updateActiveSection,
    goToPortal: () => push('/portal'),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingComponent);