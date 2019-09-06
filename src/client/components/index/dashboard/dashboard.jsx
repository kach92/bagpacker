import React from 'react';
import {Col,Row,ButtonToolbar, Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import PacklistForm from "./packlist-form-modal";
import Trips from "./trips";
import SidePanel from "../../side-panel/side-panel";
import mainStyles from "../../..//style.scss";

function PacklistFormModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
		>
			<Modal.Body>
				<h4>Create New Trip</h4>
				<PacklistForm history={props.history}/>
			</Modal.Body>
		</Modal>
	);
}

function Dashboard(props) {
	const [modalShow, setModalShow] = React.useState(false);
	return (
		<Row>
			<Col md={4}>
				<SidePanel>
					<h2>Trips</h2>
					<Button onClick={() => setModalShow(true)} className={mainStyles.btn}>
						Create New Trip
					</Button>

					<PacklistFormModal
						show={modalShow}
						onHide={() => setModalShow(false)}
						history={props.history}
					/>
				</SidePanel>
			</Col>
			<Col md={{span:8}}>
				<Trips/>
			</Col>
		</Row>
	);
}
Dashboard.propTypes ={
	history: PropTypes.object
};
export default Dashboard;