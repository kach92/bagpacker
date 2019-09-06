import React from 'react';
import PropTypes from 'prop-types';
import ActivitiesForm from "../packlist-activities-form";
import mainStyles from "../../../style.scss";
import {Form, Row, Col} from 'react-bootstrap';

class PacklistForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formInputs: {
				location: "",
				startDate: "",
				endDate: "",
				gender: "",
				weather: "1",
				activities: []
			},
			errorMessage: ""
		};
	}

	updateLocation = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.location = e.target.value;
		this.setState({formInputs: formInputs});
	};

	updateStartDate = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.startDate = e.target.value;
		this.setState({formInputs: formInputs});
	};
	updateEndDate = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.endDate = e.target.value;
		this.setState({formInputs: formInputs});
	};

	updateGender = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.gender = e.target.value;
		this.setState({formInputs: formInputs});
	};
	updateWeather = (e) => {
		let formInputs = this.state.formInputs;
		formInputs.weather = e.target.value;
		this.setState({formInputs: formInputs});
	};

	updateActivities = (params) => {
		let formInputs = this.state.formInputs;
		formInputs.activities = params;
		this.setState({formInputs: formInputs});
	};
	submit = (e) => {
		e.preventDefault();
		let formInputs = this.state.formInputs;
		let validated = true;

		Object.keys(formInputs).forEach(function (item) {
			if (item !== "activities") {
				if (formInputs[item] === "")
					validated = false;
			}
		});
		if (validated) {
			formInputs["duration"] = this.calcDuration(formInputs["startDate"], formInputs["endDate"]);
			this.getPacklist(formInputs);
		}
	};
	getPacklist = (data) => {
		fetch('/non_user_list', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(res => {
				let packlist = {
					location: data.location,
					startDate: data.startDate,
					endDate: data.endDate,
					items: res
				};
				this.props.updatePacklist(packlist);
			})
			.then( () => this.props.history.push('/list'))
			.catch(error => console.error('Error:', error));
	};
	calcDuration = (start, end) => {
		let duration = (new Date(end).getTime() - new Date(start).getTime());
		duration = Math.ceil(duration / (1000 * 60 * 60 * 24));
		return duration + 1;
	};

	render() {
		return (
			<Form className={mainStyles.packlistForm}>
				<Form.Group>
					<Form.Label>Location</Form.Label>
					<Form.Control type="text" value={this.state.formInputs.location} onChange={this.updateLocation}/>
				</Form.Group>
				<Row>
					<Col>
						<Form.Group>
							<label>Start Date</label>
							<Form.Control type="date" value={this.state.formInputs.startDate} onChange={this.updateStartDate}/>
						</Form.Group>
					</Col>

					<Col>
						<Form.Group>
							<label>End Date</label>
							<Form.Control type="date" value={this.state.formInputs.endDate} onChange={this.updateEndDate}/>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group>
							<label>Gender</label><br/>
							<Form.Check inline type='radio' label={`Female`} value="F" checked={this.state.formInputs.gender === 'F'} onChange={this.updateGender}/>
							<Form.Check inline type='radio' label={`Male`} value="M" checked={this.state.formInputs.gender === 'M'} onChange={this.updateGender}/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<label>Weather</label><br/>
							<Form.Control as="select" value={this.state.formInputs.weather} onChange={this.updateWeather}>
								<option value="1">Sunny</option>
								<option value="2">Snowy</option>
								<option value="3">Rainy</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<div className={mainStyles.multiSelectWrapper}>
					<label>Activities</label>
					<ActivitiesForm updateActivities={this.updateActivities}/>
				</div>
				<button type="submit" onClick={this.submit} className={mainStyles.btn}>Create Packing List</button>
				<br/>
				<div className="error">
				</div>
			</Form>
		);
	}
}

PacklistForm.propTypes ={
	updatePacklist: PropTypes.func,
	history: PropTypes.object
};
export default PacklistForm;