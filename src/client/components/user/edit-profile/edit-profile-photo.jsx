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
	componentDidMount(){
		fetch('/get_user_info', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				this.setState({
					photo : res.image
				});
			})
			.catch(error => console.error('Error:', error));
	}

	photoUploaded = (e) => {
		console.log("uploaded");
		let photo = Array.from(e.target.files)[0];
		let reader  = new FileReader();
		let component = this;
		reader.addEventListener("load", function () {
			component.setState({
				uploaded:true,
				photo: reader.result
			});

		}, false);
		reader.readAsDataURL(photo);
	};

	submit = (e) => {
		e.preventDefault();
		if (this.state.uploaded){
			console.log("uploading to server");
			console.log(this.state.photo);
			this.uploadToServer()
		}
	};
	uploadToServer = () => {
		let data={newImage: this.state.photo};

		fetch('/change_profile_pic', {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json;charset=UTF-8'
			}
		}).then(res => res.json())
			.then(res => window.location.reload())
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
						<div className={mainStyles.profileImage}>
							<img src={this.state.photo}/>
						</div>
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
