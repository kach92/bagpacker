import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";
import Item from './item/item';
import ItemQty from './item/item-qty';
import ItemChecked from './item/item-checked';
import ItemAdd from './item/item-add';
import DeleteCategory from './delete-category';
import CategoryTitle from './category-title';
import ItemPrivate from './item/item-private'

class Category extends React.Component {
    constructor(){
        super();
        this.state = {
            items:null
        }
    }
    componentDidMount(){
        console.log("category did mount")
        let items = this.props.items;
        this.setState({items:items})
    }


    deleteItem = (e,item_id) => {
        let updatedItems = this.state.items;
        updatedItems = updatedItems.filter(item => item.id !== item_id);
        console.log("filtered", updatedItems);
        this.setState({items:updatedItems});
        this.props.deleteItem(item_id);
    };

	render() {
        let items = this.props.items? this.props.items.sort((a,b)=> a.name.toLowerCase()<b.name.toLowerCase()? -1:1).sort((x,y)=>x.packed === y.packed? 0 : (x.packed? 1 : -1)).map((item)=> {
            let wholeRow = ""
            let itemName = <Item item_name={item.name} item_id={item.id} submitNameEdit={this.props.submitNameEdit} item_packed={item.packed}/>
            let itemQty = <ItemQty item_quantity={item.quantity} item_id={item.id} submitQtyEdit={this.props.submitQtyEdit}/>
            let itemChecked = <ItemChecked item_packed={item.packed} packItem={this.props.packItem} item_id={item.id} updateTripInfo={this.props.updateTripInfo} />

            let itemPrivate = <ItemPrivate item_id={item.id} privacy={item.private}/>
            if(this.props.solo){
                wholeRow = <Row key={item.id} className={mainStyles.item}>
                    <Col xs={1}>
                        {itemChecked}
                    </Col>
                    <Col xs={2} className="pr-0">
                        {itemQty}
                    </Col>
                    <Col xs={7} md={8} className="pr-0">
                        {itemName}
                    </Col>
                    <Col xs={1} className="p-0">
                        <i className={`bx bx-x ${mainStyles.deleteButton}`} onClick={(e)=>{this.deleteItem(e,item.id)}}></i>
                    </Col>
                </Row>
            }else{
                wholeRow = <Row key={item.id} className={mainStyles.item}>
                    <Col xs={1} className={mainStyles.itemPrivate}>
                        {itemPrivate}
                    </Col>
                    <Col xs={1}>
                        {itemChecked}
                    </Col>
                    <Col xs={2} className={`pr-0 ${mainStyles.itemQty}`}>
                        {itemQty}
                    </Col>
                    <Col xs={7} className={`pr-0 ${mainStyles.itemName}`}>
                        {itemName}
                    </Col>
                    <Col xs={1} className="p-0">
                        <i className={`bx bx-x ${mainStyles.deleteButton}`} onClick={(e)=>{this.deleteItem(e,item.id)}}></i>
                    </Col>
                </Row>
            }

			return(
                wholeRow
			);
		}) : "";
		return (
			<Card className={mainStyles.listCard}>
				<Card.Body>
					<Row>
						<Col>
                            <CategoryTitle category={this.props.category} category_id={this.props.category_id} submitCategoryTitleEdit={this.props.submitCategoryTitleEdit}/>
						</Col>
					</Row>
					{items}
                    <Row>
                        <Col xs={9}>
                            <ItemAdd category={this.props.category} addItem={this.props.addItem}/>
                        </Col>
                        <Col xs={3} className="text-right">
                            <DeleteCategory category={this.props.category} updateTripInfo={this.props.updateTripInfo} category_id={this.props.category_id}/>
                        </Col>
                    </Row>
				</Card.Body>
			</Card>

		);
	}
}
Category.propTypes ={
	items: PropTypes.array,
	category: PropTypes.string,
	packItem: PropTypes.func,
	addItem: PropTypes.func,
	deleteItem: PropTypes.func
};
export default Category;