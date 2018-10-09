import React, {Component} from 'react';
import {push} from 'connected-react-router';
import ReactGA from "react-ga";
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
import crossImage from './shared/assets/images/cross.svg';

// Constants
import {fullpageOptions} from './LandingConstants';

// Actions
import { DukovAppealMobileComponent } from './shared/components/mobile/dukovAppeal/DukovAppealMobileComponent';
import { InformationMobileComponent } from './shared/components/mobile/information/InformationMobileComponent';
import { DeminReviewMobileComponent } from './shared/components/mobile/DeminReview/DeminReviewMobileComponent';
import { WinnerElbrusMobileComponent } from './shared/components/mobile/WinnerElbrus/WinnerElbrusMobileComponent';
import { CallToActionMobileComponent } from './shared/components/mobile/CallToAction/CallToActionMobileComponent';
import { WinnerInterviewMobileComponent } from './shared/components/mobile/WinnerInterview/WinnerInterviewMobileComponent';
import { updateActiveSection, fetchLandingData, confirmInvite, switchNopersonInviteModal } from './LandingActions';
import { DUKOV_NOPERSON_MODAL_THANKS, DUKOV_NOPERSON_MODAL_TEXT, DUKOV_NOPERSON_MDOAL_GOTO_MAIL, DUKOV_NOPERSON_MODAL_FOOTER_TEXT, DUKOV_NOPERSON_MODAL_MAIL } from './shared/components/sections/DukovAppeal/dukovAppealSectionComponentConstants';

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
    ReactGA.set({ page : '/s/private' });
    ReactGA.pageview('/s/private');

    const userId = this.props.match.params.id;
    if ((!this.props.client || !this.props.client.id) && !this.props.client.loading) {
        this.props.fetchLandingData(userId);
    }
  }

  render() {
    const onScroll = this.onScroll.bind(this);
    const {loading, client, activeSection} = this.props;
    
    // Формирование классов для отображения моадального окна noperson invite
    const noPersonInviteModalClasses = this.props.nopersonInviteModalVisiable
    ? 'noperson-invite-modal noperson-invite-modal--visble'
    : 'noperson-invite-modal noperson-invite-modal--hidden';
    
    const confirmInvite = () => {
      this.props.confirmInvite(this.props.client.id)
    }

    const switchNopersonInviteModal = () => {
      this.props.switchNopersonInviteModal();
    }

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
                confirmInvite={confirmInvite}
                switchNopersonInviteModal={switchNopersonInviteModal}
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
                client={client}
                active={activeSection === 3}
                confirmInvite={confirmInvite}
                switchNopersonInviteModal={switchNopersonInviteModal}
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
                  confirmInvite={confirmInvite}
                  switchNopersonInviteModal={switchNopersonInviteModal}
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
                  client={client}
                  active={activeSection === 3}
                  confirmInvite={confirmInvite}
                  switchNopersonInviteModal={switchNopersonInviteModal}
                />
              </Section>
            </SectionsContainer>
        </Mobile>

        <div className={
          (this.props.nopersonInviteModalVisiable)
            ? 'noperson-invite-modal noperson-invite-modal--visble'
            : 'noperson-invite-modal noperson-invite-modal--hidden'
        }>
          <div className="noperson-invite-modal__block">
            <div className="noperson-invite-modal__block-main">
              <div
                onClick={switchNopersonInviteModal}
                className="noperson-invite-modal__block-cross"
              >
                <img src={crossImage} alt="X"/>
              </div>
              <div className="noperson-invite-modal__block-title">
                {DUKOV_NOPERSON_MODAL_THANKS}
              </div>
              <div className="noperson-invite-modal__block-text">
                {DUKOV_NOPERSON_MODAL_TEXT}
              </div>
              <div className="noperson-invite-modal__block-link">
                <a href={`mailto:${DUKOV_NOPERSON_MODAL_MAIL}`} className="big-link">
                  {DUKOV_NOPERSON_MDOAL_GOTO_MAIL}
                </a>
              </div>
            </div>
            <div className="noperson-invite-modal__block-footer">
              <p>
                <span>{DUKOV_NOPERSON_MODAL_FOOTER_TEXT[0]}</span><br/>
                <span className="noperson-invite-modal__block-small-link">
                  {DUKOV_NOPERSON_MODAL_MAIL}
                </span>
                &nbsp;<span>{DUKOV_NOPERSON_MODAL_FOOTER_TEXT[1]}</span>
              </p>
            </div>
          </div>
        </div>
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
    nopersonInviteModalVisiable: state.landing.nopersonInviteModalVisiable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    confirmInvite,
    fetchLandingData,
    updateActiveSection,
    switchNopersonInviteModal,
    goToPortal: () => push('/portal'),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingComponent);