import React from 'react';
import PropTypes from 'prop-types';
import Category from './category';
import {Card, CardColumns, Col, Row} from "react-bootstrap";
import mainStyles from "../../../style.scss";
import ItemAdd from "./item-add";

class List extends React.Component {
	constructor(){
		super();
		this.state = {
			adding: false
		};
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
	addItem = (name, quantity) => {
		console.log('add');
		console.log(quantity, name);
		let data = {
			user_id: this.props.userId,
			trip_id: this.props.tripId,
			item_name: name,
			quantity: quantity
		};
		console.log(data);
		// let user_id = parseInt(request.body.user_id);
		// let item_name = request.body.item_name;
		// let quantity = parseInt(request.body.quantity);
		// let category = request.body.category;
		// let trip_id = parseInt(request.body.trip_id);

		// fetch('/update_item_quantity', {
		// 	method: 'POST',
		// 	body: JSON.stringify(data),
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// }).then(res => console.log(res))
		// 	.catch(error => console.error('Error:', error));
	};
    deleteItem = (item_id) =>{
        let data = {
            item_id
        };
        fetch('/delete_item', {
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

    checkAdding = () => {
		this.setState({adding:true});
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
					addItem={ListComponent.addItem}
                    deleteItem={ListComponent.deleteItem}
				/>
			);
		});
		let newCategory = null;

		if (this.state.adding) {
			newCategory = (
				<Card className={mainStyles.listCard}>
					<Card.Body>
						<Row>
							<Col>
								<h4>New Category</h4>
							</Col>
						</Row>
						<ItemAdd addItem={this.props.addItem}/>
					</Card.Body>
				</Card>
			)
		}
		return (
			<Row className="mb-5">
				<Col>
					<CardColumns className={mainStyles.packlist}>
						{categories}
						{newCategory}
					</CardColumns>
					<div className="text-center">
						<div className={`mt-3 ${mainStyles.addButton}`} onClick={this.checkAdding}><i className='bx bx-plus'></i> Add new category</div>
					</div>
				</Col>
			</Row>

		);
	}
}
List.propTypes ={
	list: PropTypes.object,
	userId: PropTypes.number,
	tripId: PropTypes.number
};
export default List;