import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";
import Item from "./item";
import ItemQty from "./item-qty";
import ItemChecked from "./item-checked";

class SharedList extends React.Component {
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
		let items = this.props.list.map((item, index)=> {
			let itemName = <Item item_name={item.name} item_id={item.id} submitNameEdit={this.submitNameEdit}/>
			let itemQty = <ItemQty item_quantity={item.quantity} item_id={item.id} submitQtyEdit={this.submitQtyEdit}/>
			let itemChecked = <ItemChecked item_packed={item.packed} packItem={this.packItem} item_id={item.id} />
			return(
				<Row key={index}>
					<Col xs={1}>
						{itemChecked}
					</Col>
					<Col xs={1}>
						{itemQty}
					</Col>
					<Col xs={10} className="pl-0">
						{itemName}
					</Col>
				</Row>
			);
		});
		return (
			<Card className={mainStyles.listCard}>
				<Card.Body>
					<Row>
						<Col xs={12}>
							<h4>Shared Items</h4>
						</Col>
					</Row>

					{items}
				</Card.Body>
			</Card>

		);
	}
}
SharedList.propTypes ={
	list: PropTypes.array
};
export default SharedList;