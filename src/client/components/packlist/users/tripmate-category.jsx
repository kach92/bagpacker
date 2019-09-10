import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";

class TripmateCategory extends React.Component {
	render() {
        let items = this.props.items.items? this.props.items.items.filter(x=>!x.private).map((item, index)=> {
                    return(
                        <Row key={index}>
                            <Col xs={2}>
                                <p>{item.quantity}</p>
                            </Col>
                            <Col xs={10} className="pl-0">
                                <p>{item.name}</p>
                            </Col>
                        </Row>
                    );
                }) : "";


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
TripmateCategory.propTypes ={
	items: PropTypes.array,
	category: PropTypes.string,
};
export default TripmateCategory;