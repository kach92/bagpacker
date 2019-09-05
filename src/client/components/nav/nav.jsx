import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {Navbar,Nav} from 'react-bootstrap';

class Navigation extends React.Component {
	constructor() {
		super();
	}
	signOut = () => {
		console.log("sign out");
		fetch('/signout', {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
                console.log(this.props);
                window.location.reload();
            })
			.catch(error => console.error('Error:', error));
	};
	render() {
		let navlinks = (
			<React.Fragment>
				<li>
					<NavLink to="/login/" className="nav-link">Login</NavLink>
				</li>
				<li>
					<NavLink to="/signup/" className="nav-link">Sign Up</NavLink>
				</li>
			</React.Fragment>
		);
		if(this.props.authed) {
			navlinks = (
				<React.Fragment>
					<NavLink exact to="/" className="nav-link">Trips</NavLink>
					<a className="nav-link" onClick={this.signOut}>Sign Out</a>
				</React.Fragment>
			);
		}
		return (
			<Navbar collapseOnSelect expand="lg" bg="light">
				<Navbar.Brand href="/">Bagpacker</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						{navlinks}
					</Nav>
				</Navbar.Collapse>
			</Navbar>

		);
	}
}
Nav.propTypes = {
	authed: PropTypes.bool,
	history: PropTypes.object
};
export default Navigation;