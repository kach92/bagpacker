import React from 'react';
import {Link} from "react-router-dom";


class Login extends React.Component {
	render() {
		return (
			<form>
				<h2>Sign Up</h2>

				<input type="email"></input>
				<input type="password"></input>

				<button type="submit">Login</button>
				<p>Don’t have an account?</p>
				<Link to="/signup/">Create one now!</Link>
			</form>

		);
	}
}
// Login.propTypes ={
// };
export default Login;