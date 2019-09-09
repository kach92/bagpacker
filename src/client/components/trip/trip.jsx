import React from 'react';
import PropTypes from 'prop-types';
import SidePanel from '../side-panel/side-panel';
import List from '../packlist/users/list';
import GroupList from '../packlist/users/group-list';
import TripDelete from './trip-delete';

import {Col, Row, Button} from 'react-bootstrap';
import TripDetails from "./trip-details";

class Trip extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			trip: null,
			list: null,
			solo: true,
			shared: null,
            trip_id:null
		}
        this.updateTripInfo = this.updateTripInfo.bind(this);
	}

	componentDidMount(){
		this.getTripInfo(this.props.match.params.id);
	}
	getTripInfo(id) {
		let fetchUrl = '/get_trip/'+id;
		fetch(fetchUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
                console.log(res)
				let solo = true;
				let shared = null;
				if (res.trip.group_id) {
					solo = false;
					shared = res.shared.sort((a,b)=>parseInt(a.id)>parseInt(b.id)? 1:-1);
				}
				this.setState({
					trip: res.trip,
					list: res.list,
                    trip_id:res.trip.id,
					solo,
					shared

				})
			})
			.catch(error => console.error('Error:', error));
	}

    updateTripInfo () {
        console.log("TESTSETSETESTSETESTESTEST")
        let fetchUrl = '/get_trip/'+this.state.trip_id;
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            let solo = true;
            let shared = null;
            if (res.trip.group_id) {
                solo = false;
                shared = res.shared.sort((a,b)=>parseInt(a.id)>parseInt(b.id)? 1:-1);
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

    deleteTrip = (e) =>{
        let data ={
            trip_id:this.state.trip.id
        };
        let fetchUrl = '/delete_trip';
        fetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log("DELETE TRIP OK");
            this.props.history.push('/');
        })
        .catch(error => console.error('Error:', error));

    }

	render() {
		let tripName = "";
		let tripDestination = "";
		let tripStartDate = "";
		let tripEndDate = "";
		let tripImage = "";

		let trip=this.state.trip;
		if (trip) {
			tripName = trip.name;
			tripDestination = trip.destinations[0].name;
			tripImage = trip.destinations[0].image;
			tripStartDate = trip.destinations[0].start_date;
			tripEndDate = trip.destinations[0].end_date
		}

		let listDisplay = "No items found";
		if (this.state.solo) {
			let list = this.state.list;
			if (list) {
				listDisplay = <List userId={this.props.userId} list={this.state.list} tripId={this.state.trip.id}/>
			}
		}
		else {
			listDisplay = <GroupList userId={this.props.userId} list={this.state.list} shared={this.state.shared} tripId={this.state.trip.id} updateTripInfo={this.updateTripInfo}/>
		}
		return (
			<Row>
				<Col md={4}>
					<SidePanel tripImage={tripImage}>

						<h2>{tripName}</h2>
						<TripDetails location={tripDestination} startDate={tripStartDate} endDate={tripEndDate}/>
						<TripDelete deleteTrip={this.deleteTrip}/>
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