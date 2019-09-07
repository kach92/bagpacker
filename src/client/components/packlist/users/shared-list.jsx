import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";

class SharedList extends React.Component {
	render() {
		let items = this.props.list.map((item, index)=> {
			return(
				<Row key={index}>
					<Col xs={1}>
						<Form>
							<Form.Check checked={item.packed}/>
						</Form>
					</Col>
					<Col xs={1}>
						{item.quantity}
					</Col>
					<Col xs={10} className="pl-0">
						{item.name}
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