import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Navigation from './components/nav/nav';

import Home from './components/index/home/home';
import Dashboard from './components/index/dashboard/dashboard';
import Login from './components/user/login/login';
import Signup from './components/user/signup/signup';
import EditProfile from './components/user/edit-profile/edit-profile';

import Trip from './components/trip/trip';
import NonUserList from './components/packlist/non-users/packlist';

import { sha256 } from 'js-sha256';

const SALT = "Jarpy Bear";

import {Container} from 'react-bootstrap';
import mainStyles from './style.scss';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			packlist : null,
			authed : false,
			userId : null,
			username: null
		};
        this.checkUser = this.checkUser.bind(this);
	}

	updatePacklist = (packlist) => {
		this.setState({packlist: packlist});
	};

	componentDidMount() {
        console.log("APP mounted");
        this.checkUser();
	}

    checkUser() {
        let cookies = {};
        document.cookie.split("; ").forEach( value => {
            let val = value.split("=");
            cookies[val[0]] = val[1];
        });
        if(cookies.session === sha256(cookies.user_id + "logged_in" + SALT)){
            this.setState({
                authed: true,
				userId: parseInt(cookies.user_id),
				username: cookies.user_name
            });
        }else {
			this.setState({
				authed: false
			});
        }
    }

	render() {
		console.log('state',this.state.authed);
		return (
			<Router>
				<Route path="/" render={props => (
					<Navigation authed={this.state.authed} checkUser={this.checkUser} username={this.state.username} {...props}/>
				)}/>
				<Container className={mainStyles.wrapper}  fluid>
					<Route exact path="/" render={props => (
						this.state.authed
						? <Dashboard {...props}/>
						: <Home updatePacklist={this.updatePacklist} checkUser={this.checkUser} {...props}/>
					)}/>
					<Route path="/login/" render={props => (this.state.authed ? <Redirect to='/' /> : <Login {...props}/>)}/>
					<Route path="/signup/" render={props => (this.state.authed ? <Redirect to='/' /> : <Signup {...props}/>)}/>
					<Route path="/trips/:id" render={props => (
						this.state.authed
						? <Trip userId={this.state.userId} {...props}/>
						: <Home updatePacklist={this.updatePacklist} checkUser={this.checkUser} {...props}/>
					)}/>
					<Route path="/list/" render={props => (
						this.state.packlist != null
							? <NonUserList packlist={this.state.packlist} {...props}/>
							: <Home updatePacklist={this.updatePacklist} checkUser={this.checkUser} {...props}/>
					)}/>
					<Route path="/user/edit" render={props => (
						this.state.authed
							? <EditProfile {...props}/>
							: <Home updatePacklist={this.updatePacklist} checkUser={this.checkUser} {...props}/>
					)}/>

				</Container>
			</Router>
		);
	}
}

export default hot(module)(App);
