import React, {Component} from 'react';

// Styles
import './NewsComponent.scss';

// Constants
import { DEMIN_FULLNAME_TEXT, DEMIN_POSITION_TEXT, WINNERS_TITLE_TEXT, TITLE_TEXT, DESCRIPTION_TEXT, DEMIN_LETTER_TEXT } from '../../../../../landing/shared/components/sections/DeminReview/DeminReviewSectionConstants';

// Images
import deminAvatarImage from '../../../../../landing/shared/components/sections/DeminReview/shared/assets/images/demin-avatar.png';
import winnersElbrusImage from '../../../../../landing/shared/components/sections/WinnerElbrus/shared/assets/images/elbrus-winner-photo.png';
import { WINNER_ELBRUS_DESCRIPTION_LEFT, WINNER_ELBRUS_DESCRIPTION_RIGHT } from '../../../../../landing/shared/components/sections/WinnerElbrus/WinnerElbrusSectionConstants';
import rectangleImage from '../how-register/shared/assets/images/rectangleImage.svg';
export class NewsComponent extends Component {
	state = {
		isOpened: false,
	}
		 
	handleOpen = () => this.setState({ isOpened: !this.state.isOpened });

	render() {
		const elbrusDescriptionLeft = WINNER_ELBRUS_DESCRIPTION_LEFT.map((p, i) => {
      return <p key={`winner-elbrus-description-left-${i}`}>{p}</p>;
    });

    const elbrusDescriptionRight = WINNER_ELBRUS_DESCRIPTION_RIGHT.map((p, i) => {
      return <p key={`winner-elbrus-description-right-${i}`}>{p}</p>;
		});

		return(
			<div className="portal-news">
				<div className={this.state.isOpened ? "portal-news__block" : "portal-news__block-closed"}>
					<p className="portal-news__label">
						Интервью
					</p>

					<p className="portal-news__title">
						{WINNERS_TITLE_TEXT} {TITLE_TEXT}
					</p>
					<p className="portal-news__text">
						{ DESCRIPTION_TEXT.map((p, i) => <p key={`desc-${i}`}>{p}</p>) }							
					</p>
					<p className="portal-news__quote">
						{DEMIN_LETTER_TEXT[0]}
					</p>
					<p className="portal-news__quote-small">
						{DEMIN_LETTER_TEXT[1]}
					</p>

					<div className="demin-signature">
						<div className="demin-signature__avatar">
							<img src={deminAvatarImage} alt="Demin Denis Avatar"/>
						</div>
						<div className="demin-signature__text">
							<p className="demin-signature__fullname">
								{DEMIN_FULLNAME_TEXT}
							</p>
							<p className="demin-signature__position">
								{DEMIN_POSITION_TEXT}
							</p>
						</div>
					</div>
				</div>

				<div className="portal-news__mobile-button" onMouseDown={this.handleOpen}>
          <span>{this.state.isOpened ? "Скрыть" : "Показать полностью"}</span>
        	<img src={rectangleImage} alt="rectangle" className={this.state.isOpened ? "rectangleImageOpen" : "rectangleImage"}/>
        </div>

				<div className="portal-news__block portal-news__elbrus-winners">
					<div className="portal-news__label-block">
						<p className="portal-news__label">
							Интервью
						</p>
						<p className="portal-news__label">
							Фоторепортаж
						</p>
					</div>

					<img src={winnersElbrusImage} alt="Elbrus Winners on Elbrus"/>

					<p className="portal-news__title">
						{WINNERS_TITLE_TEXT} {TITLE_TEXT}
					</p>
					<p className="portal-news__text">
						{elbrusDescriptionLeft}
						{elbrusDescriptionRight}							
					</p>
				</div>
			</div>
		);
	}
}