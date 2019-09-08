import React from 'react';
import mainStyles from "../../../style.scss";
import {Col, Form, Row} from 'react-bootstrap';


class EditProfilePassword extends React.Component {
	constructor(){
		super();
		this.state={
			formInputs : {
				oldPassword: "",
				newPassword: "",
				confirmNewPassword: ""
			},
			errorMessage: ""
		}
	}
	updateOldPassword = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.oldPassword = e.target.value;
		this.setState({formInputs: formInputs});
	};
	updateNewPassword = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.newPassword = e.target.value;
		this.setState({formInputs: formInputs});
	};
	updateConfirmNewPassword = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.confirmNewPassword = e.target.value;
		this.setState({formInputs: formInputs});
	};
	submit = (e) => {
		e.preventDefault();
		let formInputs = this.state.formInputs;
		let validated = true;
		if (formInputs.oldPassword === "" || formInputs.newPassword === "" || formInputs.confirmNewPassword === ""){
			validated = false;
			this.setState({errorMessage: "Please fill in all the fields"})
		}
		else {
			if (formInputs.newPassword !== formInputs.confirmNewPassword){
				validated = false;
				this.setState({errorMessage: "The new passwords does not match"})
			}
		}
		if (validated) {
			this.setState({errorMessage: ""})
			this.updatePassword();
		}
	};

	updatePassword = () => {
		let data = {
			old_password: this.state.formInputs.oldPassword,
			new_password: this.state.formInputs.newPassword
		};
		fetch('/edit_profile_password', {
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
					<Col xs={12}>
						<h4>Update Password</h4>
					</Col>
					<Col xs={12}>
						<Form.Group>
							<label>Old Password</label>
							<Form.Control type="password" onChange={this.updateOldPassword}></Form.Control>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group>
							<label>New Password</label>
							<Form.Control type="password" onChange={this.updateNewPassword}></Form.Control>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group>
							<label>Confirm New Password</label>
							<Form.Control type="password" onChange={this.updateConfirmNewPassword}></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-5">
						<button type="submit" onClick={this.submit} className={mainStyles.btn}>Update Password</button>
					</Col>
					{errorMessage}
				</Row>
			</Form>
        )
    }
}

EditProfilePassword.propTypes ={
};
export default EditProfilePassword;
