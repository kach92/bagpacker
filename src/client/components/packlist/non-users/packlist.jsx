import React from 'react';
import PropTypes from 'prop-types';
import Trip from '../trip';
import List from '../list';

class Packlist extends React.Component {
	redirectToLogin = (e) => {
		this.props.history.push('/login')
	};
	render() {
		let packlist = this.props.packlist;
		return (
			<React.Fragment>
				<h2>Packlist</h2>
				<Trip location={packlist.location} startDate={packlist.startDate} endDate={packlist.endDate}/>
				<button onClick={this.redirectToLogin}>Save Trip</button>
				<List list={packlist.items}></List>
			</React.Fragment>

		);
	}
}
Packlist.propTypes ={
	history: PropTypes.object
};
export default Packlist;