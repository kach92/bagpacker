import React from 'react';
import PropTypes from 'prop-types';
import SidePanel from '../../side-panel/side-panel';
import PacklistForm from './packlist-form';

import {Col,Row} from 'react-bootstrap';

class Home extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.checkUser();
    }

	render() {
		return (
			<Row>
				<Col md={4}>
					<SidePanel><h2>Create Packing List</h2></SidePanel>
				</Col>
				<Col md={{span:6, offset:1}}>
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