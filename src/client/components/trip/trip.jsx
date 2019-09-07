import React from 'react';
import PropTypes from 'prop-types';
import SidePanel from '../side-panel/side-panel';
import List from '../packlist/users/list';
import GroupList from '../packlist/users/group-list';

import {Col,Row,CardColumns,Card} from 'react-bootstrap';

class Trip extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			trip: null,
			list: null,
			solo: true,
			shared: null
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
				let solo = true;
				let shared = null;
				if (res.trip.group_id) {
					solo = false;
					shared = res.shared;
				}
				this.setState({
					trip: res.trip,
					list: res.list,
					solo,
					shared

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
		let tripName = "";
		let tripDestination = "";
		let tripDate = "";
		let tripImage = "";

		let trip=this.state.trip;
		if (trip) {
			tripName = trip.name;
			tripDestination = trip.destinations[0].name;
			tripImage = trip.destinations[0].image;
			tripDate = this.dateDisplay(trip.destinations[0].start_date,trip.destinations[0].end_date);
		}

		let listDisplay = "No items found";
		if (this.state.solo) {
			let list = this.state.list;
			if (list) {
				listDisplay = <List list={this.state.list}/>
			}
		}
		else {
			listDisplay = <GroupList userId={this.props.userId} list={this.state.list} shared={this.state.shared}/>
		}
		return (
			<Row>
				<Col md={4}>
					<SidePanel tripImage={tripImage}>
						<h2>{tripName}</h2>
						<p><i className='bx bxs-map'></i>{tripDestination}</p>
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
	userId: PropTypes.number
};
export default Trip;