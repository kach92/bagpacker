import React from 'react';
import {Col,Row,Tabs,Tab} from 'react-bootstrap';
import PropTypes from 'prop-types';
import TripCard from "./trip-card";
import mainStyles from "../../../style.scss";

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
		fetch('/get_all_trips', {
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
		let soloTripsLength = 0;
		let groupTripsLength = 0;
		if (trips) {
			if (trips.solo.length > 0) {
				soloTripsLength = trips.solo.length;
				soloTrips = trips.solo.map((trip, index) => {
					return (
						<Col key={index} xs={12} sm={6} md={4} className={mainStyles.tripCard}>
							<TripCard trip={trip}/>
						</Col>
					)
				})
			}
			if (trips.group.length > 0) {
				groupTripsLength = trips.group.length;
				groupTrips = trips.group.map((trip, index) => {
					return (
						<Col key={index} xs={12} sm={6} md={4} className={mainStyles.tripCard}>
							<TripCard trip={trip}/>
						</Col>
					)
				})
			}
		}
		return (
			<Tabs variant="pills" className={`nav-fill mb-5 ${mainStyles.tab}`} id="uncontrolled-tab-example">
				<Tab eventKey="solo" title={`Solo Trips (${soloTripsLength})`}>
					<Row>{soloTrips}</Row>
				</Tab>
				<Tab eventKey="group" title={`Group Trips (${groupTripsLength})`}>
					<Row>{groupTrips}</Row>
				</Tab>
			</Tabs>


		);
	}
}
Trips.propTypes ={
	list: PropTypes.object
};
export default Trips;