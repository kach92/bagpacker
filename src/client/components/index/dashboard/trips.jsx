import React from 'react';
import {Col,Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import TripCard from "./trip-card";

class Trips extends React.Component {
	constructor() {
		super();
		this.state = {
			trips:null
		}
	}

	componentDidMount() {
		console.log("TRIPS mounted");
		this.getTrips();
	}

	getTrips() {
		fetch('/trips', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
				this.setState({trips : res});
			})
			.catch(error => console.error('Error:', error));
	}
	render() {
		let trips = this.state.trips;
		let soloTrips = (
			<Col>
				No trips found. Create one now!
			</Col>
		);
		let groupTrips = (
			<Col>
				No trips found. Create one now!
			</Col>
		);
		if (trips) {
			if (trips.solo.length > 0) {
				soloTrips = trips.solo.map((trip, index) => {
					return (
						<Col key={index} md={4}>
							<TripCard trip={trip}/>
						</Col>
					)
				})
			}
			if (trips.group.length > 0) {
				groupTrips = trips.group.map((trip, index) => {
					return (
						<Col key={index} md={4}>
							<TripCard trip={trip}/>
						</Col>
					)
				})
			}
		}
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
							{groupTrips}
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