import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import mainStyles from '../../style.scss';

class Navigation extends React.Component {
	constructor() {
		super();
		this.state={
			hideNavBg: true,
			hoverOverDropDown: false
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
                window.location.reload();
            })
			.catch(error => console.error('Error:', error));
	};
	componentDidMount() {
		window.addEventListener('scroll', this.listenToScroll)
	};
	listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		(winScroll > 60)
			? this.setState({ hideNavBg: false })
			: this.setState({ hideNavBg: true });
	};
	handleOpen = () => {
		console.log("HOOVER");
		this.setState({ hoverOverDropDown: true })
	};

	handleClose = () => {
		this.setState({ hoverOverDropDown: false })
	};

	render() {
        let navUserImage = null;
        console.log(this.props.userImg)
        if (this.props.userImg !== null) {
            navUserImage = {backgroundImage: `url(${this.props.userImg})`};
        }


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
		let title = (
			<React.Fragment>
				<div className={mainStyles.navUsername}>{this.props.username}</div>

				<div className={mainStyles.navUserImage} style={navUserImage}></div>
			</React.Fragment>
		);
		if(this.props.authed) {
			navlinks = (
				<React.Fragment>
					<Link to="/" className="nav-link">Trips</Link>
					<NavDropdown title={title} onMouseEnter = { this.handleOpen } onMouseLeave = { this.handleClose } show={ this.state.hoverOverDropDown } className={mainStyles.dropdownMenu}>
						<NavDropdown.Item href="/user/edit">Edit Profile</NavDropdown.Item>
						<NavDropdown.Item onClick={this.signOut}>Sign Out</NavDropdown.Item>
					</NavDropdown>
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
				<Navbar.Collapse>
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