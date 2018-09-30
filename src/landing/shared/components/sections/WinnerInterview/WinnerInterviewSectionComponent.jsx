import {Animated} from 'react-animated-css';
import React, {Component} from 'react';

import './WinnerInterviewSectionComponent.scss';
import { TITLE_TEXT, DESCRIPTION_TEXT, QUESTIONS_TEXT, QUOTE_TEXT, QUOTE_SIGNATURE_LINK_TEXT, QUOTE_SIGNATURE_TEXT, TITLE_WIN_TEXT } from './WinnerInterviewSectionConstants';

export class WinnerInterviewSectionComponent extends Component {
  render() {
    return (
      <div className="winner-interview-section__wrapper">
        
        <div className="winner-interview-section__content">

          <div className="winner-interview-section__title-wrapper">
            <div className="winner-interview-section__title">
              <Animated
                isVisible={this.props.active}
                animationIn="fadeInDown"
                animationOut="fadeOut"
                animationInDelay={300}
              >
                <span className="blue-text">{TITLE_WIN_TEXT}</span>
                &nbsp;{TITLE_TEXT}
              </Animated>
            </div>
          </div>

          <div className="winner-interview-section__sides">
            <div className="winner-interview-section__sides-left">
              
              <div className="winner-interview-section__description">
                <Animated
                  isVisible={this.props.active}
                  animationIn="fadeInLeft"
                  animationOut="fadeOut"
                  animationInDelay={300}
                >
                  {DESCRIPTION_TEXT}
                </Animated>
              </div>

              <div className="winner-interview-section__questions">

                  <Animated
                    isVisible={this.props.active}
                    animationIn="fadeInLeft"
                    animationOut="fadeOut"
                    animationInDelay={2000}
                  >
                    <div className="winner-interview-section__questions-item">
                      <div className="winner-interview-section__questions-item-num">
                        <div>
                          1
                        </div>
                      </div>
                      <div className="winner-interview-section__questions-item-text">
                        {QUESTIONS_TEXT[0]}
                      </div>
                    </div>
                  </Animated>

                  <Animated
                    isVisible={this.props.active}
                    animationIn="fadeInLeft"
                    animationOut="fadeOut"
                    animationInDelay={2500}
                  >
                    <div className="winner-interview-section__questions-item">
                      <div className="winner-interview-section__questions-item-num">
                        <div>
                          2
                        </div>
                      </div>
                      <div className="winner-interview-section__questions-item-text">
                        {QUESTIONS_TEXT[1]}
                      </div>
                    </div>
                  </Animated>

                  <Animated
                    isVisible={this.props.active}
                    animationIn="fadeInLeft"
                    animationOut="fadeOut"
                    animationInDelay={3000}
                  >
                    <div className="winner-interview-section__questions-item">
                      <div className="winner-interview-section__questions-item-num">
                        <div>
                          3
                        </div>
                      </div>
                      <div className="winner-interview-section__questions-item-text">
                        {QUESTIONS_TEXT[2]}
                      </div>
                    </div>
                  </Animated>
              </div>

            </div>

            <div className="winner-interview-section__sides-right">
              
              <div className="winner-interview-section__quote">
                <Animated
                  isVisible={this.props.active}
                  animationIn="fadeInRight"
                  animationOut="fadeOut"
                  animationInDelay={1500}
                >
                  {QUOTE_TEXT}
                </Animated>
              </div>

              <div className="winner-interview-section__quote-signature">
                <Animated
                  isVisible={this.props.active}
                  animationIn="fadeInRight"
                  animationOut="fadeOut"
                  animationInDelay={1500}
                >
                  <a href="/">{QUOTE_SIGNATURE_LINK_TEXT}</a> {QUOTE_SIGNATURE_TEXT}
                </Animated>
              </div>

            </div>
          </div>

        </div>
        
      </div>
    );
  }
};