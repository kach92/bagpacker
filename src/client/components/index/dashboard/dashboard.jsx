import React from 'react';
import {Col,Row,ButtonToolbar, Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import PacklistForm from "./packlist-form-modal";
import Trips from "./trips";

function PacklistFormModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
		>
			<Modal.Body>
				<h4>Create New Trip</h4>
				<PacklistForm/>
			</Modal.Body>
		</Modal>
	);
}

function Dashboard() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<Row>
			<Col>
				<ButtonToolbar>
					<Button variant="primary" onClick={() => setModalShow(true)}>
						Create New Trip
					</Button>

					<PacklistFormModal
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
				</ButtonToolbar>
			</Col>
			<Col>
				<Trips/>
			</Col>
		</Row>
	);
}

export default Dashboard;