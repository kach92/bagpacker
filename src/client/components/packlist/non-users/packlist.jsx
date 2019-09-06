import React from 'react';
import PropTypes from 'prop-types';
import {Col,Row} from 'react-bootstrap';
import SidePanel from '../../side-panel/side-panel';
import mainStyles from "../../../style.scss";
import Trip from '../trip';
import List from '../list';

class Packlist extends React.Component {
	redirectToLogin = (e) => {
		this.props.history.push('/login')
	};
	render() {
		let packlist = this.props.packlist;
		return (
			<Row>
				<Col md={4}>
					<SidePanel>
						<h2>Packing List</h2>
						<Trip location={packlist.location} startDate={packlist.startDate} endDate={packlist.endDate}/>
						<button onClick={this.redirectToLogin} className={mainStyles.btn}>Save Trip</button>
					</SidePanel>
				</Col>
				<Col md={{span:6, offset:1}}>
					<List list={packlist.items}></List>
				</Col>
			</Row>
		);
	}
}
Packlist.propTypes ={
	history: PropTypes.object
};
export default Packlist;