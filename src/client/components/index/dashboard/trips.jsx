import React from 'react';
import {Col,Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import TripCard from "./trip-card";

class Trips extends React.Component {
	constructor() {
		super();
		this.trips = null;
	}

	componentDidMount() {
		console.log("TRIPS mounted");
		this.getTrips();
	}

	getTrips() {
		console.log("fetching");
		fetch('/trips', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
				console.log(res);
			})
			.catch(error => console.error('Error:', error));
	}
	render() {
		let soloTrips = (
			<React.Fragment>
				<Col md={4}>
					<TripCard/>
				</Col>
				<Col md={4}>
					<TripCard/>
				</Col>
				<Col md={4}>
					<TripCard/>
				</Col>
				<Col md={4}>
					<TripCard/>
				</Col>
				<Col md={4}>
					<TripCard/>
				</Col>
				<Col md={4}>
					<TripCard/>
				</Col>
			</React.Fragment>

		);
		return (
			<React.Fragment>
				<Row className="mb-5">
					<Col>
						<Row>
							<Col>
								<h4>Solo Trips</h4>
							</Col>
						</Row>
						<Row>
							{soloTrips}
						</Row>

					</Col>
				</Row>
				<Row>
					<Col>
						<Row>
							<Col>
								<h4>Group Trips</h4>
							</Col>
						</Row>
						<Row>
							<Col>
								Group trips here
							</Col>
						</Row>

					</Col>
				</Row>
			</React.Fragment>

		);
	}
}
Trips.propTypes ={
	list: PropTypes.object
};
export default Trips;