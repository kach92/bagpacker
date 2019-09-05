import React from 'react';
import Trip from '../trip';
import List from '../list';

class Packlist extends React.Component {
	render() {
		let packlist = this.props.packlist;
		return (
			<React.Fragment>
				<h2>Packlist</h2>
				<Trip location={packlist.location} startDate={packlist.startDate} endDate={packlist.endDate}/>
				<List list={packlist.items}></List>
			</React.Fragment>

		);
	}
}
export default Packlist;