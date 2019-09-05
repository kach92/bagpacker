import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Nav from './components/nav/nav';

import Home from './components/index/home/home';
import Login from './components/user/login/login';
import Signup from './components/user/signup/signup';

import NonUserList from './components/packlist/non-users/packlist';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			packlist : null
		};
	}

	updatePacklist = (packlist) => {
		this.setState({packlist: packlist});
	};

	render() {
		return (
			<Router>
				<Nav/>
				<div>
					<Route exact path="/" render={props => (<Home updatePacklist={this.updatePacklist} {...props}/>)}/>
					<Route path="/login/" component={Login}/>
					<Route path="/signup/" component={Signup}/>
					<Route path="/list/" render={props => (
						this.state.packlist != null
						? <NonUserList packlist={this.state.packlist} {...props}/>
						: <Redirect to='/' />
					)}/>
				</div>
			</Router>
		);
	}
}

export default hot(module)(App);
