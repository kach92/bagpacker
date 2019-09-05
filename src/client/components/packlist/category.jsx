import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
	render() {
		let items = this.props.items.map((item, index)=> {
			return(<li key={index}>{item.name}</li>);
		});
		return (
			<div>
				{this.props.category}
				{items}
			</div>

		);
	}
}
Category.propTypes ={
	list: PropTypes.object
};
export default Category;