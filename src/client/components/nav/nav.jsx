import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Navbar,Nav} from 'react-bootstrap';
import mainStyles from '../../style.scss';

class Navigation extends React.Component {
	constructor() {
		super();
		this.state={
			hideNavBg: true
		}
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
	componentDidMount() {
		window.addEventListener('scroll', this.listenToScroll)
	}
	listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		if (winScroll > 60) {
			this.setState({
				hideNavBg: false
			})
		}
		else {
			this.setState({
				hideNavBg: true
			})
		}
	}
	render() {
		let navlinks = (
			<React.Fragment>
				<li>
					<Link to="/login/" className="nav-link">Login</Link>
				</li>
				<li>
					<Link to="/signup/" className="nav-link">Sign Up</Link>
				</li>
			</React.Fragment>
		);
		if(this.props.authed) {
			navlinks = (
				<React.Fragment>
					<Link to="/" className="nav-link">Trips</Link>
					<a className="nav-link" onClick={this.signOut}>Sign Out</a>
				</React.Fragment>
			);
		}
		let navbarClass = `${mainStyles.navbar}`;
		if (!this.state.hideNavBg) {
			navbarClass = `${mainStyles.navbar} ${mainStyles.navbarBg}`
		}

		return (
			<Navbar expand="md" fixed="top" className={navbarClass} variant="dark">
				<Navbar.Brand href="/">Bagpacker</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className={`ml-auto ${mainStyles.navLinks}`}>
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