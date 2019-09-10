import React from 'react';
import PropTypes from 'prop-types';
import SidePanel from '../side-panel/side-panel';
import List from '../packlist/users/list';
import GroupList from '../packlist/users/group-list';
import TripDelete from './trip-delete';
import TripName from './trip-name';
import mainStyles from "../../style.scss";

import {Col, Row} from 'react-bootstrap';
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
		};
        this.updateTripInfo = this.updateTripInfo.bind(this);
	}

	componentDidMount(){
		this.getTripInfo(this.props.match.params.id);
	};

	getTripInfo(id) {
		let fetchUrl = '/get_trip/'+id;
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
        let fetchUrl = '/get_trip/'+this.state.trip_id;
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
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

    updateTripName = (trip_id,name) =>{
        let data = {
            trip_id,
            name
        };
        fetch('/edit_trip_name', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res))
            .catch(error => console.error('Error:', error));
    };

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
            this.props.history.push('/');
        })
        .catch(error => console.error('Error:', error));

    };

	render() {
		let tripName = "";
		let tripDestination = "";
		let tripStartDate = "";
		let tripEndDate = "";
		let tripDetails = "";
		let tripImage = "";
		let trip=this.state.trip;
        let list = this.state.list;
		let listDisplay = <h4 className="text-center">No such trip</h4>;
        let tripHeadCount = null;

		if (trip && list) {
			tripName = trip.name;
			tripDestination = trip.destinations[0].name;
			tripImage = trip.destinations[0].image;
			tripStartDate = trip.destinations[0].start_date;
			tripEndDate = trip.destinations[0].end_date;
            tripHeadCount = list.length;
			tripDetails = (
				<div className={mainStyles.tripDetails}>
					<div>
						<TripName tripName={tripName} tripId={this.state.trip_id} updateTripName={this.updateTripName}/>
						<TripDetails location={tripDestination} startDate={tripStartDate} endDate={tripEndDate} tripHeadCount={tripHeadCount}/>
					</div>
					<div>
						<TripDelete deleteTrip={this.deleteTrip}/>
					</div>
				</div>
			);
			listDisplay = <h4 className="text-center">No items found</h4>;
		}
		if (this.state.solo) {
			let list = this.state.list;
			if (list) {
				listDisplay = <List userId={this.props.userId} list={this.state.list} tripId={this.state.trip.id} updateTripInfo={this.updateTripInfo} solo={this.state.solo}/>
			}
		}
		else {
			listDisplay = <GroupList userId={this.props.userId} list={this.state.list} shared={this.state.shared} tripId={this.state.trip.id} updateTripInfo={this.updateTripInfo} solo={this.state.solo}/>
		}
		return (
			<Row>
				<Col md={4} className={mainStyles.tripPanel}>
					<SidePanel tripImage={tripImage}>
						{tripDetails}
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