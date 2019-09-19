import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import mainStyles from '../../style.scss';
import { sha256 } from 'js-sha256';
const SALT = "Jarpy Bear";

class Navigation extends React.Component {
	constructor() {
		super();
		this.state={
			hideNavBg: false,
			hoverOverDropDown: false,
			userImage: null
		}
	}
	signOut = () => {
		fetch('/signout', {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
				document.cookie = 'session='+sha256(SALT)+'; path=/';
				document.cookie = 'user_id=0 ; path=/';
				this.props.checkUser();
				this.props.history.push('/');
            })
			.catch(error => console.error('Error:', error));
	};
	componentDidMount() {
		window.addEventListener('scroll', this.listenToScroll)

		fetch('/get_user_info', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				this.setState({
					userImage: res.image
				});

			})
			.catch(error => console.error('Error:', error));
	}
	listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		(winScroll > 60)
			? this.setState({ hideNavBg: false })
			: this.setState({ hideNavBg: false });
	};
	handleOpen = () => {
		this.setState({ hoverOverDropDown: true })
	};

	handleClose = () => {
		this.setState({ hoverOverDropDown: false })
	};

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
		let userImage = null;
		if (this.state.userImage) {
            console.log(this.state.userImage)
			userImage = {backgroundImage: `url(${this.state.userImage})`};
		}
		let title = (
			<React.Fragment>
				<div className={mainStyles.navUsername}>{this.props.username}</div>
				<div className={mainStyles.navUserImage} style={userImage}></div>
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
			<Navbar fixed="top" className={navbarClass} variant="dark">
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