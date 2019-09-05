import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Nav from './components/nav/nav';

import Home from './components/index/home/home';
import Dashboard from './components/index/dashboard/dashboard';
import Login from './components/user/login/login';
import Signup from './components/user/signup/signup';

import NonUserList from './components/packlist/non-users/packlist';
import { sha256, sha224 } from 'js-sha256';

const SALT = "Jarpy Bear"

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			packlist : null,
			authed : false,
			userId : null
		};
        this.checkUser = this.checkUser.bind(this);
	}

	updatePacklist = (packlist) => {
		this.setState({packlist: packlist});
	};

	componentDidMount() {
        console.log("APP mounted")
        this.checkUser();
	}

    checkUser() {
        let cookies = {}
        document.cookie.split("; ").forEach( value => {
            let val = value.split("=")
            cookies[val[0]] = val[1]
        });
        console.log(cookies)
        if(cookies.session === sha256(cookies.user_id + "logged_in" + SALT)){
            this.setState({
                authed: true,
                userId: parseInt(cookies.user_id)
            });
        }
    }



	render() {
		return (
			<Router>
				<Nav authed={this.state.authed}/>
				<div>
					<Route exact path="/" render={props => (
						this.state.authed
						? <Dashboard/>
						: <Home updatePacklist={this.updatePacklist} checkUser={this.checkUser} {...props}/>
					)}/>
					<Route path="/login/" render={props => (this.state.authed ? <Redirect to='/' /> : <Login {...props}/>)}/>
					<Route path="/signup/" render={props => (this.state.authed ? <Redirect to='/' /> : <Signup {...props}/>)}/>
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
