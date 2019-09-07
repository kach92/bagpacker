import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";
import Item from './item';
import ItemQty from './item-qty';
import ItemChecked from './item-checked';

class Category extends React.Component {
	render() {
        console.log(this.props.items.sort((a,b)=> a.name<b.name? -1:1))
		let items = this.props.items.sort((a,b)=> a.name.toLowerCase()<b.name.toLowerCase()? -1:1).sort((x,y)=>x.packed === y.packed? 0 : (x.packed? 1 : -1)).map((item, index)=> {
            let itemName = <Item item_name={item.name} item_id={item.id} submitNameEdit={this.props.submitNameEdit}/>
            let itemQty = <ItemQty item_quantity={item.quantity} item_id={item.id} submitQtyEdit={this.props.submitQtyEdit}/>
            let itemChecked = <ItemChecked item_packed={item.packed} packItem={this.props.packItem} item_id={item.id} />
			// let itemName = <div onClick={(e)=>this.props.editItemName(e,item.id)}><p>{item.name}</p></div>;
			// let itemQty = <div onClick={(e)=>this.props.editItemQty(e,item.id)}><p>{item.quantity}</p></div>;
			// if (this.props.currentItem === item.id) {
			// 	itemName = (
			// 		<input type="text" value={this.props.currentItemValue} onChange={(e) => this.props.updateItemValue(e)} onKeyDown={(e)=>this.props.checkKey(e)}/>
			// 	)
			// }
			// if (this.props.currentItemQty === item.id) {
			// 	itemQty = (
			// 		<input type="number" value={this.props.currentItemQtyValue} min="1" onChange={(e) => this.props.updateItemQtyValue(e)}/>
			// 	)
			// }
			return(
				<Row key={index}>
					<Col xs={1}>
                            {itemChecked}
					</Col>
					<Col xs={2}>
						{itemQty}
					</Col>
					<Col xs={9} className="pl-0">
						{itemName}
					</Col>
				</Row>
			);
		});
		return (
			<Card className={mainStyles.listCard}>
				<Card.Body>
					<Row>
						<Col>
							<h4>{this.props.category}</h4>
						</Col>
					</Row>
					{items}
				</Card.Body>
			</Card>

		);
	}
}
Category.propTypes ={
	items: PropTypes.array,
	category: PropTypes.string,
	packItem: PropTypes.func,
	checkKey: PropTypes.func,
	currentItem: PropTypes.number,
	currentItemValue: PropTypes.string,
	updateItemValue: PropTypes.func,
	currentItemQty: PropTypes.number,
	currentItemQtyValue: PropTypes.number,
	updateItemQtyValue: PropTypes.func
};
export default Category;