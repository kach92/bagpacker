import React from 'react';
import PropTypes from 'prop-types';
import PacklistForm from './packlist-form';

class Home extends React.Component {
	render() {
		return (
			<PacklistForm history={this.props.history} packlist={this.props.packlist} updatePacklist={this.props.updatePacklist}/>
		);
	}
}
Home.propTypes ={
	updatePacklist: PropTypes.func,
	history: PropTypes.object
};
export default Home;