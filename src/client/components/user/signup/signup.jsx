import React from 'react';
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

	signup = (e) => {
		e.preventDefault();
		let formInputs = this.state.formInputs;
		let validated = true;
		Object.keys(formInputs).forEach(function (item) {
			console.log(formInputs[item]);
			if (formInputs[item] === "")
				validated = false;
		});

		if (formInputs['password'] != formInputs['confirmPassword'])
			validated = false;

		console.log(validated);

		if (validated) {
			this.createUser(formInputs);
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

	createUser = (data) => {
		let url = '/signup';

		fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(response => console.log('Success:', JSON.stringify(response)))
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
						<input type="radio" value="female" checked={this.state.formInputs.gender === 'female'} onChange={this.updateGender}/>
						Female
					</label>
					<label>
						<input type="radio" value="male" checked={this.state.formInputs.gender === 'male'} onChange={this.updateGender}/>
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

				<button type="submit" onClick={this.signup}>Sign Up</button>
				<br/>
				<div className="error">
				</div>

				<p>Existing user?</p>
				<Link to="/login/">Log in now!</Link>
			</form>

		);
	}
}
// Login.propTypes ={
// };
export default Signup;