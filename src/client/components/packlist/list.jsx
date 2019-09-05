import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';

class List extends React.Component {
	render() {
		// console.log(this.props.list["Beauty"]);
		let list = this.props.list;
		let categories = Object.keys(list).map(function(category,index) {
			return <Category key={index} category={category} items={list[category]}/>;
			// return (category)
		});
		return (
			<div>
				{categories}
			</div>

		);
	}
}
List.propTypes ={
	list: PropTypes.object
};
export default List;