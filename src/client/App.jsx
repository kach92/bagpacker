import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Navigation from './components/nav/nav';

import Home from './components/index/home/home';
import Dashboard from './components/index/dashboard/dashboard';
import Login from './components/user/login/login';
import Signup from './components/user/signup/signup';

import NonUserList from './components/packlist/non-users/packlist';

import {Container} from 'react-bootstrap';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			packlist : null,
			authed : false,
			userId : null
		};
	}

	updatePacklist = (packlist) => {
		this.setState({packlist: packlist});
	};

	componentDidMount() {
		let cookies = document.cookie.split(";").map( value => {
			let val = value.split("=")
			let obj = { "key" : val[0], "value" : val[1] }
			return obj;
		});
		cookies.forEach(cookie => {
			if( cookie.key.trim()==="user_id"){
				if (cookie.value != null) {
					this.setState({
						authed: true,
						userId: parseInt(cookie.value)
					});
				}
			}
		});
	}

	render() {
		return (
			<Router>
				<Navigation authed={this.state.authed}/>
				<Container>
					<Route exact path="/" render={props => (
						this.state.authed
						? <Dashboard/>
						: <Home updatePacklist={this.updatePacklist} {...props}/>
					)}/>
					<Route path="/login/" component={Login}/>
					<Route path="/signup/" component={Signup}/>
					<Route path="/list/" render={props => (
						this.state.packlist != null
						? <NonUserList packlist={this.state.packlist} {...props}/>
						: <Redirect to='/' />
					)}/>
				</Container>
			</Router>
		);
	}
}

export default hot(module)(App);
