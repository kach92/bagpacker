import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";
import Item from "./item/item";
import ItemQty from "./item/item-qty";
import ItemChecked from "./item/item-checked";
import ItemAdd from "./item/item-add";
import SharedItemOwner from "./item/shared-item-owner";


class SharedList extends React.Component {

    constructor(){
        super();
        this.state ={
            items:null
        };
    }

    componentDidMount(){
        this.setState({items:this.props.list})
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
	updateSharedItem = (userId,itemId) => {
		let data = {
			item_id: itemId,
			user_id: userId,
			trip_id: this.props.tripId
		};
		fetch('/update_shared_item', {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res =>{
                console.log(res)
                this.props.updateTripInfo();
            })
			.catch(error => console.error('Error:', error));
	};

    deleteItem = (e,item_id) => {
        let updatedItems = this.state.items;
        updatedItems = updatedItems.filter(item => item.id !== item_id);
        this.setState({items:updatedItems});
        this.props.deleteItem(item_id);
    };

	render() {
		let items = this.props.list? this.props.list.map((item, index)=> {
			let itemName = <Item item_name={item.name} item_id={item.id} submitNameEdit={this.submitNameEdit}/>
			let itemQty = <ItemQty item_quantity={item.quantity} item_id={item.id} submitQtyEdit={this.submitQtyEdit}/>
			let itemChecked = <ItemChecked item_packed={item.packed} packItem={this.packItem} item_id={item.id} />
			return(
				<Row key={item.id} className={mainStyles.item}>
					<Col xs={1}>
						{itemChecked}
					</Col>
					<Col xs={1} className={mainStyles.itemQty}>
						{itemQty}
					</Col>
					<Col xs={8} sm={5} className={`${mainStyles.itemName} pr-0 pr-lg-2`}>
						{itemName}
					</Col>
                    <Col xs={1}>
                        <i className={`bx bx-x ${mainStyles.deleteButton}`} onClick={(e)=>{this.deleteItem(e,item.id)}}></i>
                    </Col>
					<Col xs={{ span: 9, offset: 3 }} sm={{ span: 3, offset: 0 }} className={`mb-4 mb-lg-0`}>
						<SharedItemOwner itemId={item.id} item_packinglist_id={item.packing_list_id}tripmates={this.props.tripmates} updateSharedItem={this.updateSharedItem} updateTripInfo={this.props.updateTripInfo}/>
					</Col>
				</Row>
			);
		}):null;
		return (
			<Card className={mainStyles.listCard}>
				<Card.Body>
					<Row>
						<Col xs={12}>
							<h4 className={mainStyles.sharedListTitle}>Shared Items</h4>
						</Col>
					</Row>
					{items}
					<ItemAdd addItem={this.props.addItem} category="Shared"/>
				</Card.Body>
			</Card>

		);
	}
}
SharedList.propTypes ={
	list: PropTypes.array,
	tripmates: PropTypes.array,
	tripId: PropTypes.number
};
export default SharedList;