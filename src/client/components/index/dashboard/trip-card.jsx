import React from 'react';
import {Card} from 'react-bootstrap';
import {Link, NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

class TripCard extends React.Component {
	render() {
		let tripLink = "/trips/"+1;
		return (
			<Link to={tripLink}>
				<Card className="mb-3">
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
						<Card.Title>
							Title
						</Card.Title>
						<Card.Text>
							Date here
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