import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import Trip from "../packlist/trip";

class Nav extends React.Component {
	signOut = (e) => {
		e.preventDefault;
		console.log("sign out");
		fetch('/signout', {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => this.props.history.push('/'))
			.catch(error => console.error('Error:', error));
	};
	render() {
		let navlinks = (
			<React.Fragment>
				<li>
					<NavLink to="/login/">Login</NavLink>
				</li>
				<li>
					<NavLink to="/signup/">Sign Up</NavLink>
				</li>
			</React.Fragment>
		);
		if(this.props.authed) {
			navlinks = (
				<React.Fragment>
					<li>
						<a onClick={this.signOut}>Sign Out</a>
					</li>
				</React.Fragment>
			);
		}
		return (
			<nav>
				<ul>
					<li>
						<NavLink exact to="/">Home</NavLink>
					</li>
					{navlinks}
				</ul>
			</nav>
		);
	}
}
Nav.propTypes = {
	authed: PropTypes.bool,
};
export default Nav;