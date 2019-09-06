import React from 'react';
import {Card} from 'react-bootstrap';
import {Link, NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

class TripCard extends React.Component {
	render() {
		let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        console.log(this.props.trip)
		let trip = this.props.trip;
		let tripLink = "/trips/"+trip.id;
		let startDate = new Date(trip.destinations[0].start_date);
		let endDate = new Date(trip.destinations[0].end_date);
		let startDateDisplay = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
		let endDateDisplay = `${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
		return (
			<Link to={tripLink}>
				<Card className="mb-3">
					<Card.Img variant="top" src={trip.destinations[0].image} />
					<Card.Body>
						<Card.Title className="mb-5">{trip.name}</Card.Title>
						<Card.Text>
							<span className="d-block mb-3">{startDateDisplay} — {endDateDisplay}</span>
							<span className="d-block">{trip.destinations[0].name}</span>
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