import React from 'react';
import PropTypes from 'prop-types';

class TripDetails extends React.Component {
	dateDisplay(start,end) {
		let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		let startDate = new Date(start);
		let endDate = new Date(end);
		let startDateDisplay = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
		let endDateDisplay = `${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
		return(`${startDateDisplay} — ${endDateDisplay}`);
	}
	render() {
		let tripDate = this.dateDisplay(this.props.startDate,this.props.endDate);
		return (
			<React.Fragment>
				<p><i className='bx bxs-map'></i> {this.props.location}</p>
				<p>{tripDate}</p>
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