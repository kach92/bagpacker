import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Nav from './components/nav/nav';

import Home from './components/home/home';
import Login from './components/user/login/login';
import Signup from './components/user/signup/signup';

class App extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<Router>
				<Nav/>

				<div>
					<Route exact path="/" component={Home}/>
					<Route path="/login/" component={Login}/>
					<Route path="/signup/" component={Signup}/>
				</div>
			</Router>
		);
	}
}

export default hot(module)(App);
