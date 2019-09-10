import React from 'react';
import {Card} from 'react-bootstrap';
import {Link, NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import mainStyles from "../../..//style.scss";

class TripCard extends React.Component {
	render() {
		let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		let trip = this.props.trip;
		let tripLink = "/trips/"+trip.id;
		let startDate = new Date(trip.destinations[0].start_date);
		let endDate = new Date(trip.destinations[0].end_date);
		let startDateDisplay = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
		let endDateDisplay = `${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;

		let tripImage = null;
		if (trip.destinations[0].image !== "#") {
			tripImage = {backgroundImage: `url(${trip.destinations[0].image})`};
		}
		return (
			<Link to={tripLink}>
				<Card className="mb-3">
					<div className={mainStyles.tripImage} style={tripImage}>
						<Card.Title>{trip.name}</Card.Title>
					</div>
					<Card.Body>
						<Card.Text>
							<span className="d-block mb-3">{startDateDisplay} — {endDateDisplay}</span>
							<span className={`d-block ${mainStyles.tripCardDetails}`}>
								<i className='bx bxs-map'></i>
								<p>{trip.destinations[0].name}</p>
							</span>
						</Card.Text>
					</Card.Body>
				</Card>
			</Link>

		);
	}
}
TripCard.propTypes ={
	list: PropTypes.object
};
export default TripCard;