import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";
import {Col, Form, Row} from 'react-bootstrap';
import SidePanel from "../../side-panel/side-panel";
import EditProfilePhoto from "./edit-profile-photo";
import EditProfileInfo from "./edit-profile-info";
import EditProfilePassword from "./edit-profile-password";

class editProfile extends React.Component {
	render() {
		return (
			<Row>
				<Col lg={4}>
					<SidePanel><h2>Edit Profile</h2></SidePanel>
				</Col>
				<Col lg={{span:6, offset:1}}>
					<div className={mainStyles.editProfileWrapper}>
						<EditProfilePhoto/>
						<EditProfileInfo/>
						<EditProfilePassword/>
					</div>
				</Col>
			</Row>
        )
    }
}

editProfile.propTypes ={
	history: PropTypes.object
};
export default editProfile;
