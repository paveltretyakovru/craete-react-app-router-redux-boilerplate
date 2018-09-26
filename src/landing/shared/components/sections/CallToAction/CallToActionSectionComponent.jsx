import React, {Component} from 'react';
import {Section} from 'react-fullpage';

import './CallToActionSectionComponent.scss';

export class CallToActionSectionComponent extends Component {
  render() {
    return (
      <Section className="section call-to-action-section__wrapper">
        Call to action
      </Section>
    )
  }
}