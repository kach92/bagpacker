import React from 'react';
import PropTypes from 'prop-types';
import SidePanel from '../side-panel/side-panel';

import {Col,Row} from 'react-bootstrap';

class Trip extends React.Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.getTripInfo(this.props.match.params.id);
	}
	getTripInfo(id) {
		let fetchUrl = '/getTrip/'+id;
		console.log(fetchUrl);
		fetch(fetchUrl, {
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
		return (
			<Row>
				<Col md={4}>
					<SidePanel>
						<h2>Taiwan 2019</h2>
						<p>Taiwan</p>
						<p>10 Oct 2019 — 17 Oct 2019</p>
					</SidePanel>
				</Col>
				<Col md={{span:6, offset:1}}>
					dfdaasd
				</Col>
			</Row>
		);
	}
}
Trip.propTypes ={
};
export default Trip;