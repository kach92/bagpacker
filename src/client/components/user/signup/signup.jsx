import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import {Link} from "react-router-dom";
import {Form} from 'react-bootstrap';

class Signup extends React.Component {
	constructor(){
		super();
		this.state = {
			formInputs: {
				firstName: "",
				lastName: "",
				gender: "",
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
		Object.keys(formInputs).forEach(function (item) {
			if (formInputs[item] === "")
				validated = false;
		});

		if (formInputs['password'] != formInputs['confirmPassword'])
			validated = false;

		if (validated) {
			delete formInputs.confirmPassword;
			this.signupUser(formInputs);
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
				this.props.history.push('/')
			})
			.catch(error => console.error('Error:', error));
	};

	render() {
		return (
			<Form className={mainStyles.signupForm}>
				<h2>Sign Up</h2>
				<Form.Group>
					<label>First Name</label>
					<Form.Control type="text" value={this.state.formInputs.firstName} onChange={this.updateFirstName}></Form.Control>
				</Form.Group>
				<Form.Group>
					<label>Last Name</label>
					<Form.Control type="text" value={this.state.formInputs.lastName} onChange={this.updateLastName}></Form.Control>
				</Form.Group>

				<Form.Group>
					<label>Gender</label>
					<label>
						<input type="radio" value="F" checked={this.state.formInputs.gender === 'F'} onChange={this.updateGender}/>
						Female
					</label>
					<label>
						<input type="radio" value="M" checked={this.state.formInputs.gender === 'M'} onChange={this.updateGender}/>
						Male
					</label>
				</Form.Group>

				<Form.Group>
					<label>Email</label>
					<Form.Control type="email" value={this.state.formInputs.email} onChange={this.updateEmail}></Form.Control>
				</Form.Group>
				<Form.Group>
					<label>Password</label>
					<Form.Control type="password" value={this.state.formInputs.password} onChange={this.updatePassword}></Form.Control>
				</Form.Group>
				<Form.Group>
					<label>Confirm Password</label>
					<Form.Control type="password" value={this.state.formInputs.confirmPassword} onChange={this.updateConfirmPassword}></Form.Control>
				</Form.Group>

				<button type="submit" onClick={this.submit} className={mainStyles.btn}>Sign Up</button>
				<br/>
				<div className="error">
				</div>

				<div>
					<p>Existing user?</p>
					<Link to="/login/">Log in now!</Link>
				</div>
			</Form>

		);
	}
}
Signup.propTypes ={
	history: PropTypes.object
};
export default Signup;