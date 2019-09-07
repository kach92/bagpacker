import React from 'react';
import PropTypes from 'prop-types';
import Category from './category';
import {CardColumns} from "react-bootstrap";
import mainStyles from "../../../style.scss";

class List extends React.Component {
	constructor(){
		super();
	}

	packItem = (checked,item_id) => {
		let data = {
			item_id,
			packed: checked
		};
		fetch('/update_item_packed', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
			})
			.catch(error => console.error('Error:', error));
	};

	submitNameEdit = (item_id,name) => {
		let data = {
			item_id,
			name
		};
		fetch('/update_item_name', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => console.log(res))
			.catch(error => console.error('Error:', error));
	};
	submitQtyEdit = (item_id,quantity) => {
        console.log("YESSSSSS")
        console.log(item_id);
        console.log(quantity)
		let data = {
			item_id,
			quantity
		};
		fetch('/update_item_quantity', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => console.log(res))
			.catch(error => console.error('Error:', error));
	};
	render() {
		let list = this.props.list;
		let ListComponent = this;
		let categories = Object.keys(list).sort((a,b)=> a.toLowerCase()<b.toLowerCase()? -1:1).map(function(category,index) {
			return (
				<Category
					key={index}
					category={category}
					items={list[category]}
					packItem={ListComponent.packItem}
                    submitNameEdit={ListComponent.submitNameEdit}
                    submitQtyEdit={ListComponent.submitQtyEdit}
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
List.propTypes ={
	list: PropTypes.object
};
export default List;