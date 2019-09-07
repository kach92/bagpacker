import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";

class Category extends React.Component {
	render() {
		let items = this.props.items.map((item, index)=> {
			let itemName = <div onClick={(e)=>this.props.editItemName(e,item.id)}><p>{item.name}</p></div>;
			let itemQty = <div onClick={(e)=>this.props.editItemQty(e,item.id)}><p>{item.quantity}</p></div>;
			if (this.props.currentItem === item.id) {
				itemName = (
					<input type="text" value={this.props.currentItemValue} onChange={(e) => this.props.updateItemValue(e)} onKeyDown={(e)=>this.props.checkKey(e)}/>
				)
			}
			if (this.props.currentItemQty === item.id) {
				itemQty = (
					<input type="number" value={this.props.currentItemQtyValue} min="1" onChange={(e) => this.props.updateItemQtyValue(e)}/>
				)
			}
			return(
				<Row key={index}>
					<Col xs={1}>
						<Form>
							<Form.Check checked={item.packed} onChange={(e)=>this.props.packItem(e,item.id)}/>
						</Form>
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
	editItemName: PropTypes.func,
	checkKey: PropTypes.func,
	currentItem: PropTypes.number,
	currentItemValue: PropTypes.string,
	updateItemValue: PropTypes.func,
	editItemQty: PropTypes.func,
	currentItemQty: PropTypes.number,
	currentItemQtyValue: PropTypes.number,
	updateItemQtyValue: PropTypes.func
};
export default Category;