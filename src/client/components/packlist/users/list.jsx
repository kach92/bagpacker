import React from 'react';
import PropTypes from 'prop-types';
import Category from './category';
import {CardColumns} from "react-bootstrap";
import mainStyles from "../../../style.scss";

class List extends React.Component {
	constructor(){
		super();
		this.state=({
			editing:false,
			currentItem: 0,
			currentItemQty:0,
			currentItemValue: "",
			currentItemQtyValue: 0
		});
	}

	packItem = (e,item_id) => {
		let data = {
			item_id,
			packed: e.target.checked
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
	editItemName = (e,index) => {
		if (!this.state.editing){
			this.setState({
				currentItem:index,
				currentItemValue:e.target.innerText,
				editing:true
			})
		}
		else {
			this.setState({
				currentItem:0,
				currentItemValue:"",
				editing:false
			});
		}
	};
	editItemQty = (e,index) => {
		if (!this.state.editing){
			this.setState({
				currentItemQty:index,
				currentItemQtyValue:parseInt(e.target.innerText),
				editing:true
			})
		}
		else {
			this.setState({
				currentItemQty:0,
				currentItemQtyValue: 0,
				editing:false
			});
		}
	};
	updateItemValue = (e) => {
		this.setState({
			currentItemValue: e.target.value
		});
	};
	updateItemQtyValue = (e) => {
		let quantity = parseInt(e.target.value);
		this.setState({
			currentItemQtyValue: quantity
		});
		this.submitQtyEdit(this.state.currentItemQty,quantity);
	};
	checkKey = (e) => {
		if(e.keyCode == 13){
			this.submitNameEdit(this.state.currentItem,e.target.value);
			this.setState({
				currentItem:0,
				currentItemValue:"",
				editing:false
			});
		}
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
		let categories = Object.keys(list).map(function(category,index) {
			return (
				<Category
					key={index}
					category={category}
					items={list[category]}
					packItem={ListComponent.packItem}
					editItemName={ListComponent.editItemName}
					currentItem={ListComponent.state.currentItem}
					currentItemValue={ListComponent.state.currentItemValue}
					updateItemValue={ListComponent.updateItemValue}
					checkKey={ListComponent.checkKey}
					editItemQty={ListComponent.editItemQty}
					currentItemQty={ListComponent.state.currentItemQty}
					currentItemQtyValue={ListComponent.state.currentItemQtyValue}
					updateItemQtyValue={ListComponent.updateItemQtyValue}
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