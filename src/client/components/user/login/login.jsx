import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import styles from "./style.scss";
import Signup from "../signup/signup";


class Login extends React.Component {
	constructor(){
		super();
		this.state = {
			formInputs: {
				email: "",
				password: "",
			},
			errorMessage: ""
		};
	}
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
	submit = (e) => {
		e.preventDefault();
		let formInputs = this.state.formInputs;
		let validated = true;
		Object.keys(formInputs).forEach(function (item) {
			if (formInputs[item] === "")
				validated = false;
		});

		if (validated) {
			this.loginUser(formInputs);
		}
	};

	loginUser = (data) => {
		fetch('/login', {
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
		return (
			<form className={styles.loginForm}>
				<h2>Login</h2>
				<div className={styles.formField}>
					<label>Email</label>
					<input type="email" value={this.state.formInputs.email} onChange={this.updateEmail}></input>
				</div>
				<div className={styles.formField}>
					<label>Password</label>
					<input type="password" value={this.state.formInputs.password} onChange={this.updatePassword}></input>
				</div>

				<button type="submit" onClick={this.submit}>Login</button>
				<br/>
				<div className="error">
				</div>
				<div>
					<p>Don't have an account?</p>
					<Link to="/signup/">Create one now!</Link>
				</div>
            </form>
        )
    }
}

Login.propTypes ={
	history: PropTypes.object
};
export default Login;
