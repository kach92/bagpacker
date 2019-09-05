import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';

class List extends React.Component {
	render() {
		let list = this.props.list;
		let categories = Object.keys(list).map(function(category,index) {
			return <Category key={index} category={category} items={list[category]}/>;
		});
		return (
			<React.Fragment>
				{categories}
			</React.Fragment>

		);
	}
}
List.propTypes ={
	list: PropTypes.object
};
export default List;