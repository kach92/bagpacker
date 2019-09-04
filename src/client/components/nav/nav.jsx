import React from 'react';
import {NavLink} from "react-router-dom";

class Nav extends React.Component {
	render() {
		return (
			<nav>
				<ul>
					<li>
						<NavLink exact to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/login/">Login</NavLink>
					</li>
					<li>
						<NavLink to="/signup/">Sign Up</NavLink>
					</li>
				</ul>
			</nav>
		);
	}
}
export default Nav;