import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import SidePanel from '../../side-panel/side-panel';
import SignupForm from './signup-form';
import {Col, Row} from "react-bootstrap";
import PacklistForm from "../../index/home/packlist-form";

class Signup extends React.Component {
	render() {
		return (
			<Row>
				<Col md={4}>
					<SidePanel><h2>Sign Up</h2></SidePanel>
				</Col>
				<Col md={{span:6, offset:1}}>
					<SignupForm history={this.props.history}/>
				</Col>
			</Row>

		);
	}
}
Signup.propTypes ={
	history: PropTypes.object
};
export default Signup;