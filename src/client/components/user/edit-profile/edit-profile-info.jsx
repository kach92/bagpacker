import React from 'react';
import mainStyles from "../../../style.scss";
import {Col, Form, Row} from 'react-bootstrap';


class EditProfileInfo extends React.Component {
	constructor(){
		super();
		this.state = {
			formInputs: {
				email: "email",
				firstName: "",
				lastName: ""
			},
			errorMessage: ""
		};
	}

	updateFirstName = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.firstName = e.target.value;
		this.setState({formInputs: formInputs});
	};
	updateLastName = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.lastName = e.target.value;
		this.setState({formInputs: formInputs});
	};

	submit = (e) => {
		e.preventDefault();
		let formInputs = this.state.formInputs;
		let validated = true;
		if (formInputs.firstName.trim() === "" || formInputs.lastName.trim() === "" || formInputs.email.trim() === ""){
			validated = false;
			this.setState({errorMessage: "The fields cannot be blank"})
		}
		if (validated) {
			this.setState({errorMessage: ""});
			this.updateInfo();
		}
	};
	updateInfo = () => {
		let data = {
			first_name: this.state.formInputs.firstName,
			last_name: this.state.formInputs.lastName
		};
		fetch('/edit_profile_general', {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => this.props.history.push('/'))
			.catch(error => console.error('Error:', error));
	};
	render() {
		let errorMessage = null;
		if (this.state.errorMessage !== ""){
			errorMessage = (<Col className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
		}
		return (
			<Form className={mainStyles.profileInfoForm}>
				<Row>
					<Col>
						<Form.Group>
							<label>First Name</label>
							<Form.Control type="text" value={this.state.formInputs.firstName} onChange={this.updateFirstName}></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<label>Last Name</label>
							<Form.Control type="text" value={this.state.formInputs.lastName} onChange={this.updateLastName}></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group>
							<label>Email</label>
							<Form.Control type="email" value={this.state.formInputs.email} disabled></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-5">
						<button type="submit" onClick={this.submit} className={mainStyles.btn}>Update Profile</button>
					</Col>
					{errorMessage}
				</Row>

			</Form>
        )
    }
}

EditProfileInfo.propTypes ={
};
export default EditProfileInfo;
