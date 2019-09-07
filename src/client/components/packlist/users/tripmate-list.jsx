import React from 'react';
import PropTypes from 'prop-types';
import TripmateCategory from './tripmate-category';
import {CardColumns} from "react-bootstrap";
import mainStyles from "../../../style.scss";

class TripmateList extends React.Component {
	render() {
		let list = this.props.list;
		let categories = Object.keys(list).map(function(category,index) {
			return (
				<TripmateCategory
					key={index}
					category={category}
					items={list[category]}
				/>
			);
		});
		return (
			<CardColumns className={mainStyles.packlist}>
				{categories}
			</CardColumns>

		);
	}
}
TripmateList.propTypes ={
	list: PropTypes.object
};
export default TripmateList;