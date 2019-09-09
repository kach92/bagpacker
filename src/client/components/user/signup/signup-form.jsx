import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import {Link} from "react-router-dom";
import {Form} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";

class SignupForm extends React.Component {
	constructor(){
		super();
		this.state = {
			formInputs: {
				firstName: "",
				lastName: "",
				gender: "F",
				email: "",
				password: "",
				confirmPassword: ""
			},
			errorMessage: ""
		};
	}

	submit = (e) => {
		e.preventDefault();
		let formInputs = this.state.formInputs;
		let validated = true;
		let errorMessage = "";
		Object.keys(formInputs).forEach(function (item) {
			if (formInputs[item] === "") {
				validated = false;
				errorMessage = "Please fill in all fields"
			}
		});

		if (formInputs['password'] != formInputs['confirmPassword']) {
			validated = false;
			errorMessage = "Passwords does not match"
		}
		if (validated) {
			delete formInputs.confirmPassword;
			this.signupUser(formInputs);
		}else {
			this.setState({errorMessage})
		}
	};
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
	updateGender = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.gender = e.target.value;
		this.setState({formInputs: formInputs});
	};
	updateEmail = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.email = e.target.value;
		this.setState({formInputs: formInputs});
	};
	updatePassword = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.password = e.target.value;
		this.setState({formInputs: formInputs});
	};
	updateConfirmPassword = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.confirmPassword = e.target.value;
		this.setState({formInputs: formInputs});
	};
	signupUser = (data) => {
		fetch('/signup', {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
				if (res) {
					this.props.history.push('/')
				}else{
					this.setState({errorMessage: "The email is already in use"})
				}
			})
			.catch(error => console.error('Error:', error));
	};

	render() {
		let errorMessage = null;
		if (this.state.errorMessage !== ""){
			errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
		}
		return (
			<Form className={mainStyles.signupForm}>
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
							<Form.Control type="email" value={this.state.formInputs.email} onChange={this.updateEmail}></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group>
							<label>Gender</label><br/>
							<Form.Check inline type='radio' label={`Female`} value="F" checked={this.state.formInputs.gender === 'F'} onChange={this.updateGender}/>
							<Form.Check inline type='radio' label={`Male`} value="M" checked={this.state.formInputs.gender === 'M'} onChange={this.updateGender}/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group>
							<label>Password</label>
							<Form.Control type="password" value={this.state.formInputs.password} onChange={this.updatePassword}></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<label>Confirm Password</label>
							<Form.Control type="password" value={this.state.formInputs.confirmPassword} onChange={this.updateConfirmPassword}></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-5">
						<button type="submit" onClick={this.submit} className={mainStyles.btn}>Sign Up</button>
					</Col>
					{errorMessage}
					<Col xs={12} className="my-5">
						<p>Existing user? <Link to="/login/">Log in now!</Link></p>
					</Col>
				</Row>
			</Form>

		);
	}
}
SignupForm.propTypes ={
	history: PropTypes.object
};
export default SignupForm;