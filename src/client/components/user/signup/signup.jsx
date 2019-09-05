import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import styles from './style.scss';

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
			<form className={styles.signupForm}>
				<h2>Sign Up</h2>
				<div className={styles.formField}>
					<label>First Name</label>
					<input type="text" value={this.state.formInputs.firstName} onChange={this.updateFirstName}></input>
				</div>
				<div className={styles.formField}>
					<label>Last Name</label>
					<input type="text" value={this.state.formInputs.lastName} onChange={this.updateLastName}></input>
				</div>

				<div className={styles.formField}>
					<label>Gender</label>
					<label>
						<input type="radio" value="F" checked={this.state.formInputs.gender === 'F'} onChange={this.updateGender}/>
						Female
					</label>
					<label>
						<input type="radio" value="M" checked={this.state.formInputs.gender === 'M'} onChange={this.updateGender}/>
						Male
					</label>
				</div>

				<div className={styles.formField}>
					<label>Email</label>
					<input type="email" value={this.state.formInputs.email} onChange={this.updateEmail}></input>
				</div>
				<div className={styles.formField}>
					<label>Password</label>
					<input type="password" value={this.state.formInputs.password} onChange={this.updatePassword}></input>
				</div>
				<div className={styles.formField}>
					<label>Confirm Password</label>
					<input type="password" value={this.state.formInputs.confirmPassword} onChange={this.updateConfirmPassword}></input>
				</div>

				<button type="submit" onClick={this.submit}>Sign Up</button>
				<br/>
				<div className="error">
				</div>

				<div>
					<p>Existing user?</p>
					<Link to="/login/">Log in now!</Link>
				</div>
			</form>

		);
	}
}
Signup.propTypes ={
	history: PropTypes.object
};
export default Signup;