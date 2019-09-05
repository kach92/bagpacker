import React from 'react';
import PropTypes from 'prop-types';
import Multiselect from 'multiselect-dropdown-react';

const data = [{
	name: 'Hiking',
	value: '1'
},{
	name: 'Leisure',
	value: '2'
},{
	name: 'Business',
	value: '3'
},{
	name: 'Beach',
	value: '4'
},{
	name: 'Snow Sports',
	value: '5'
},{
	name: 'Camping',
	value: '6'
}];

class ActivitiesForm extends React.Component {
	render() {
		return (
			<Multiselect options={data} onSelectOptions={this.props.updateActivities}/>
		)
	}
}

ActivitiesForm.propTypes ={
	updateActivities: PropTypes.func
};
export default ActivitiesForm;