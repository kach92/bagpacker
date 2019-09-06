import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row} from "react-bootstrap";

class Category extends React.Component {
	render() {
		let items = this.props.items.map((item, index)=> {
			return(
				<Row key={index}>
					<Col>
					</Col>
					<Col>
						{item.quantity}
					</Col>
					<Col>
						{item.name}
					</Col>
				</Row>
			);
		});
		return (
			<Col>
				<h4>{this.props.category}</h4>
				<Card>
					<Card.Body>
						<Card.Text>
							{items}
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

		);
	}
}
Category.propTypes ={
	items: PropTypes.array,
	category: PropTypes.string
};
export default Category;