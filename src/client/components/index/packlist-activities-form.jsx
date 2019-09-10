import React from 'react';
import PropTypes from 'prop-types';
import Multiselect from 'multiselect-dropdown-react';

const data = [{
	name: 'Hiking',
	value: 'Hiking'
},{
	name: 'Leisure',
	value: 'Leisure'
},{
	name: 'Business',
	value: 'Business'
},{
	name: 'Beach',
	value: 'Beach'
},{
	name: 'Snow Sports',
	value: 'Snow Sports'
},{
	name: 'Camping',
	value: 'Camping'
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