import React from 'react';
import PropTypes from 'prop-types';
import PacklistForm from './packlist-form';

import {Col,Row} from 'react-bootstrap';

class Home extends React.Component {
	render() {
		return (
			<Row>
				<Col>
					<PacklistForm history={this.props.history} packlist={this.props.packlist} updatePacklist={this.props.updatePacklist}/>
				</Col>
			</Row>
		);
	}
}
Home.propTypes ={
	updatePacklist: PropTypes.func,
	history: PropTypes.object
};
export default Home;