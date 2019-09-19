import React from 'react';
import {Col,Row, Button,Modal} from 'react-bootstrap';
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
			className={mainStyles.createModal}
		>
			<Modal.Body>
				<Row>
					<Col>
						<Modal.Header closeButton className="px-0 pt-0">
							<Modal.Title>Create New Trip</Modal.Title>
						</Modal.Header>
						<PacklistForm history={props.history}/>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
}

function Dashboard(props) {
	const [modalShow, setModalShow] = React.useState(false);
	return (
		<Row>
			<Col lg={4}>
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
			<Col lg={{span:8}}>
				<Trips/>
			</Col>
		</Row>
	);
}
Dashboard.propTypes ={
	history: PropTypes.object
};
export default Dashboard;