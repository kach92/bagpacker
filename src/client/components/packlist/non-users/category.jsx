import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";

class Category extends React.Component {
	render() {
		let items = this.props.items.map((item, index)=> {
			return(
				<Row key={index}>
					<Col xs={1}>
						<Form>
							<Form.Check checked={item.packed} onChange={this.packItem}/>
						</Form>
					</Col>
					<Col xs={1}>
						{item.quantity}
					</Col>
					<Col xs={9}>
						{item.name}
					</Col>
				</Row>
			);
		});
		return (
			<Card>
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
	category: PropTypes.string
};
export default Category;