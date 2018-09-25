import React, {Component} from 'react';
import {Section} from 'react-fullpage';

import './firstSectionComponent.scss';

export class FirstSectionComponent extends Component {
  render() {
    return (
      <Section className="first-section-component__wrapper" verticalAlign="true" color="#69D2E7">
        <button onClick={this.props.changePage}>Go to portal</button>
        <header>
          <a href="#sectionOne">Section One</a>
          <a href="#sectionTwo">Section Two</a>
          <a href="#sectionThree">Section Three</a>
        </header>
      </Section>
    );
  }
}