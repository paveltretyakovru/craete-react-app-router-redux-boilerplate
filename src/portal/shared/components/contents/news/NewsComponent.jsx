import React, {Component} from 'react';

// Styles
import './NewsComponent.scss';

// Constants
import { DEMIN_FULLNAME_TEXT, DEMIN_POSITION_TEXT, WINNERS_TITLE_TEXT, TITLE_TEXT, DESCRIPTION_TEXT, DEMIN_LETTER_TEXT } from '../../../../../landing/shared/components/sections/DeminReview/DeminReviewSectionConstants';

// Images
import deminAvatarImage from '../../../../../landing/shared/components/sections/DeminReview/shared/assets/images/demin-avatar.png';

export class NewsComponent extends Component {
	render() {
		return(
			<div className="portal-news">
				<div className="portal-news__block">
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

				<div className="portal-news__block">
					<p className="portal-news__label">
						Интервью
					</p>

					<p className="portal-news__title">
						{WINNERS_TITLE_TEXT} {TITLE_TEXT}
					</p>
					<p className="portal-news__text">
						{ DESCRIPTION_TEXT.map((p, i) => <p key={`desc1-${i}`}>{p}</p>) }							
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
			</div>
		);
	}
}