import React from 'react';
import {Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import mainStyles from "../..//style.scss";

function DeleteTripModal(props) {
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className={mainStyles.deleteModal}
		>
			<Modal.Body>
				<h4>Delete Trip?</h4>
				<Button className={mainStyles.btn} onClick={(e)=>{props.deleteTrip(e)}}>
					Delete
				</Button>
			</Modal.Body>
		</Modal>
	);
}

function TripDelete(props) {
	const [modalShow, setModalShow] = React.useState(false);
    const deleteTrip = props.deleteTrip;
	return (
		<React.Fragment>
			<Button onClick={() => setModalShow(true)} className={`${mainStyles.btn} ${mainStyles.btnSecondary}`}>
				Delete Trip <i className='bx bx-x'></i>
			</Button>

			<DeleteTripModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				history={props.history}
                deleteTrip={deleteTrip}
			/>
		</React.Fragment>
	);
}
TripDelete.propTypes ={
	history: PropTypes.object
};
export default TripDelete;