import React from 'react';
import mainStyles from "../../../style.scss";
import {Col, Form, Row} from 'react-bootstrap';


class EditProfileInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uploaded: false,
			photo: null
		}

	}

	photoUploaded = (e) => {
		console.log("uploaded");
		let photo = Array.from(e.target.files)[0];
		this.setState({uploaded:true, photo:photo});
	};

	submit = (e) => {
		e.preventDefault();
		if (this.state.uploaded){
			console.log("uploading to server");
			this.uploadToServer(this.state.photo)
		}
	};
	uploadToServer = (photo) => {
        console.log(photo)
		const formData = new FormData();
		formData.append('myFile',photo);

		fetch('/change_profile_pic', {
			method: 'POST',
			body: formData
		}).then(res => res.json())
			.then(res => console.log(res))
			.catch(error => console.error('Error:', error));
	};

	render() {
		return (
			<Form className={mainStyles.profileInfoForm}>
				<Row>
					<Col xs={12}>
						<h4>Update Profile</h4>
					</Col>
				</Row>
				<Row>
					<Col xs={2}>
						<div className={mainStyles.profileImage}></div>
					</Col>
					<Col xs={10} className={mainStyles.profileImageForm}>
						<label htmlFor="file-upload" className="my-3 custom-file-upload">
							<i className='bx bx-upload'></i> Upload Photo
						</label>
						<Form.Control id="file-upload" type="file" accept='.jpg,.jpeg,.png' onChange={this.photoUploaded}/>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-5">
						<button type="submit" onClick={this.submit} className={mainStyles.btn}>Update Photo</button>
					</Col>
				</Row>
			</Form>
        )
    }
}

EditProfileInfo.propTypes ={
};
export default EditProfileInfo;
