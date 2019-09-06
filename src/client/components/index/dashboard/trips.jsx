import React from 'react';
import {Col,Row} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Trips extends React.Component {
	render() {
		return (
			<Row>
				<Col>
					<Row>
						<Col>
							<h4>Solo Trips</h4>
						</Col>
					</Row>
					<Row>
						<Col>
							Solo trips here
						</Col>
					</Row>
				</Col>
			</Row>

		);
	}
}
Trips.propTypes ={
	list: PropTypes.object
};
export default Trips;