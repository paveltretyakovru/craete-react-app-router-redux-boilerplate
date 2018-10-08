import React, {Component} from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import Responsive from 'react-responsive';
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

// Styles
import './LandingContainer.scss';

// Images
import logoImage from './shared/components/sections/DukovAppeal/shared/images/logo.svg';

// Constants
import {fullpageOptions} from './LandingConstants';

// Actions
import {updateActiveSection, fetchLandingData} from './LandingActions';
import { DukovAppealMobileComponent } from './shared/components/mobile/dukovAppeal/DukovAppealMobileComponent';
import { InformationMobileComponent } from './shared/components/mobile/information/InformationMobileComponent';
import { DeminReviewMobileComponent } from './shared/components/mobile/DeminReview/DeminReviewMobileComponent';
import { WinnerInterviewMobileComponent } from './shared/components/mobile/WinnerInterview/WinnerInterviewMobileComponent';
import { WinnerElbrusMobileComponent } from './shared/components/mobile/WinnerElbrus/WinnerElbrusMobileComponent';
import { CallToActionMobileComponent } from './shared/components/mobile/CallToAction/CallToActionMobileComponent';


const Mobile = props => <Responsive {...props} maxWidth={768} />;
const Default = props => <Responsive {...props} minWidth={768} />;

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

    if (loading) {
      return (
        <div className="fadeInEffect loader__wrapper">
          <img className="loader__image" src={logoImage} alt="Gasprom logo"/>
        </div>
      )
    }

    return (
      <div style={{overflow: 'hidden'}}>

        {/* Default view */}
        <Default>
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
        </Default>

        {/* Mobile View */}
        <Mobile>
          <SectionsContainer
              {...fullpageOptions}
              scrollCallback={onScroll}
              activeSection={activeSection}
            >
              <Section>
                <DukovAppealMobileComponent
                  client={client}
                  active={activeSection === 0}
                />
              </Section>

              <Section>
                <InformationMobileComponent
                  active={activeSection === 0}
                />
              </Section>
            
              <Section>
                <SlideshowContainer
                  active={activeSection === 2}
                >
                  <DeminReviewMobileComponent
                    active={
                      this.props.slideshow.active === 0
                      && activeSection === 2
                    }
                  />

                  <WinnerInterviewMobileComponent
                    active={this.props.slideshow.active === 1}
                  />

                  <WinnerElbrusMobileComponent
                    active={this.props.slideshow.active === 3}
                  />
                </SlideshowContainer>
              </Section>

              <Section>
                <CallToActionMobileComponent 
                  active={activeSection === 3}
                />
              </Section>
            </SectionsContainer>
        </Mobile>

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