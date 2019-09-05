import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import {Link} from "react-router-dom";
import {Form} from 'react-bootstrap';


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
			<Form className={mainStyles.loginForm}>
				<h2>Login</h2>
				<Form.Group>
					<label>Email</label>
					<Form.Control type="email" value={this.state.formInputs.email} onChange={this.updateEmail}></Form.Control>
				</Form.Group>
				<Form.Group>
					<label>Password</label>
					<Form.Control type="password" value={this.state.formInputs.password} onChange={this.updatePassword}></Form.Control>
				</Form.Group>

				<button type="submit" onClick={this.submit} className={mainStyles.btn}>Login</button>
				<br/>
				<div className="error">
				</div>
				<div>
					<p>Don't have an account?</p>
					<Link to="/signup/">Create one now!</Link>
				</div>
            </Form>
        )
    }
}

Login.propTypes ={
	history: PropTypes.object
};
export default Login;
