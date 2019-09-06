import React from 'react';
import PropTypes from 'prop-types';
import SidePanel from '../side-panel/side-panel';
import List from '../packlist/users/list';

import {Col,Row,CardColumns,Card} from 'react-bootstrap';

class Trip extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			trip: null,
			list: null
		}
	}

	componentDidMount(){
		this.getTripInfo(this.props.match.params.id);
	}
	getTripInfo(id) {
		let fetchUrl = '/get_trip/'+id;
		console.log(fetchUrl);
		fetch(fetchUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
				this.setState({
					trip: res.trip,
					list: res.list
				})
			})
			.catch(error => console.error('Error:', error));
	}
	dateDisplay(start,end) {
		let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		let startDate = new Date(start);
		let endDate = new Date(end);
		let startDateDisplay = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
		let endDateDisplay = `${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
		return(`${startDateDisplay} — ${endDateDisplay}`);
	}
	render() {
		console.log(this.state);
		let tripName = "";
		let tripDestination = "";
		let tripDate = "";

		let trip=this.state.trip;
		if (trip) {
			tripName = trip.name;
			tripDestination = trip.destinations[0].name;
			tripDate = this.dateDisplay(trip.destinations[0].start_date,trip.destinations[0].end_date);
		}

		let listDisplay = "No items found";
		let list=this.state.list;
		if (list){
			listDisplay = <List list={this.state.list}/>
		}
		return (
			<Row>
				<Col md={4}>
					<SidePanel>
						<h2>{tripName}</h2>
						<p>{tripDestination}</p>
						<p>{tripDate}</p>
					</SidePanel>
				</Col>
				<Col md={{span:8}}>
					{listDisplay}
				</Col>
			</Row>
		);
	}
}
Trip.propTypes ={
};
export default Trip;