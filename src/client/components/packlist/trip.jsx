import React from 'react';
import PropTypes from 'prop-types';

class Trip extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h2>{this.props.location}</h2>
				<h5>{this.props.startDate} — {this.props.endDate}</h5>
			</React.Fragment>

		);
	}
}
Trip.propTypes ={
	location: PropTypes.string,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
};
export default Trip;