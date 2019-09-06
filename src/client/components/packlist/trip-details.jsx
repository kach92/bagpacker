import React from 'react';
import PropTypes from 'prop-types';

class TripDetails extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h2>{this.props.location}</h2>
				<h5>{this.props.startDate} — {this.props.endDate}</h5>
			</React.Fragment>

		);
	}
}
TripDetails.propTypes ={
	location: PropTypes.string,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
};
export default TripDetails;