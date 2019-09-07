import React from 'react';
import mainStyles from "../../../style.scss";
import {Col, Form, Row} from 'react-bootstrap';


class EditProfileInfo extends React.Component {

	render() {
		return (
			<Form className={mainStyles.profileInfoForm}>
				<Row>
					<Col xs={12}>
						<h4>Update Profile</h4>
					</Col>
				</Row>
				<Row>
					<Col xs={2}>
						<div className={mainStyles.profileImage}></div>
					</Col>
					<Col xs={10} className={mainStyles.profileImageForm}>
						<label htmlFor="file-upload" className="my-3 custom-file-upload">
							<i className='bx bx-upload'></i> Upload Photo
						</label>
						<Form.Control id="file-upload" type="file" accept='.jpg,.jpeg,.png'/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group>
							<label>First Name</label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<label>Last Name</label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group>
							<label>Email</label>
							<Form.Control type="email"></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-5">
						<button type="submit" onClick={this.submit} className={mainStyles.btn}>Update Profile</button>
					</Col>
				</Row>

			</Form>
        )
    }
}

EditProfileInfo.propTypes ={
};
export default EditProfileInfo;
