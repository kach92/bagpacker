import React from 'react';
import PropTypes from 'prop-types';
import Category from './category';
import {CardColumns} from "react-bootstrap";
import mainStyles from "../../../style.scss";

class List extends React.Component {
	render() {
		let list = this.props.list;
		let categories = Object.keys(list).map(function(category,index) {
			return <Category key={index} category={category} items={list[category]}/>;
		});
		return (
			<CardColumns className={mainStyles.packlist}>
				{categories}
			</CardColumns>

		);
	}
}
List.propTypes ={
	list: PropTypes.object
};
export default List;