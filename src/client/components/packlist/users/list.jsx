import React from 'react';
import PropTypes from 'prop-types';
import Category from './category';
import {Card, CardColumns, Col, Row} from "react-bootstrap";
import mainStyles from "../../../style.scss";
import ItemAdd from "./item/item-add";
import TripmateCategory from './tripmate-category';
import AddCategory from './add-category';
import SharedItemCategory from "./shared-item-category";

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

    submitCategoryTitleEdit = (category_id,category) =>{
        console.log("TESTTTTTTT")
        let data = {
            category_id,
            category
        };
        fetch('/change_category_name', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res))
            .catch(error => console.error('Error:', error));
    }
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
	addItem = (name, quantity,category) => {
		let data = {
			trip_id: this.props.tripId,
			category,
			item_name: name,
			quantity: quantity
		};
		fetch('/add_custom_item', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => window.location.reload())
			.catch(error => console.error('Error:', error));
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

	render() {
		let list = this.props.list;
        let updateTripInfo = this.props.updateTripInfo
		let ListComponent = this;
		let categories = Object.keys(list).map(function(category,index) {
            if(category !== "Shared"){
                return (
                    <Category
                        key={list[category].id}
                        category={category}
                        category_id={list[category].id}
                        items={list[category].items}
                        packItem={ListComponent.packItem}
                        submitNameEdit={ListComponent.submitNameEdit}
                        submitQtyEdit={ListComponent.submitQtyEdit}
                        addItem={ListComponent.addItem}
                        deleteItem={ListComponent.deleteItem}
                        updateTripInfo={updateTripInfo}
                        submitCategoryTitleEdit={ListComponent.submitCategoryTitleEdit}
                    />
                );
            }else{
                return (
                    <SharedItemCategory
                        key={index}
                        category={category}
                        items={list[category]}
                    />
                )
            }

		});
		let newCategory = null;

		return (
			<Row className="mb-5">
				<Col>
					<CardColumns className={mainStyles.packlist}>
						{categories}
						{newCategory}
					</CardColumns>
					<div className="text-center">
                        <AddCategory tripId = {this.props.tripId} updateTripInfo={this.props.updateTripInfo}/>
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