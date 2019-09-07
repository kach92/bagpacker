import React from 'react';
import mainStyles from "../../../style.scss";
import {Col, Form, Row} from 'react-bootstrap';


class EditProfilePassword extends React.Component {

	render() {
		return (
			<Form className={mainStyles.profileInfoForm}>
				<Row>
					<Col xs={12}>
						<h4>Update Password</h4>
					</Col>
					<Col xs={12}>
						<Form.Group>
							<label>Old Password</label>
							<Form.Control type="password"></Form.Control>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group>
							<label>New Password</label>
							<Form.Control type="password"></Form.Control>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group>
							<label>Confirm New Password</label>
							<Form.Control type="password"></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-5">
						<button type="submit" onClick={this.submit} className={mainStyles.btn}>Update Password</button>
					</Col>
				</Row>
			</Form>
        )
    }
}

EditProfilePassword.propTypes ={
};
export default EditProfilePassword;
