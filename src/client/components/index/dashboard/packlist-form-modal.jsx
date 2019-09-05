import React from 'react';
import PropTypes from 'prop-types';
import ActivitiesForm from "../packlist-activities-form";
import mainStyles from "../../../style.scss";
import {Form} from 'react-bootstrap';

class PacklistForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formInputs: {
				location: "",
				startDate: "",
				endDate: "",
				weather: "1",
				activities: [],
				group: []
			},
			errorMessage: "",
			groupPax: 1
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

	updateGroupPax = (e) => {
		this.setState({groupPax: e.target.value});
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
		console.log("submited");
		let formInputs = this.state.formInputs;
		let validated = true;

		Object.keys(formInputs).forEach(function (item) {
			if (item !== "activities" && item !== "group") {
				if (formInputs[item] === "")
					validated = false;
			}
		});
		if (validated) {
			formInputs["duration"] = this.calcDuration(formInputs["startDate"], formInputs["endDate"]);
			console.log(formInputs);
			this.createTrip(formInputs);
		}
	};
	createTrip = (data) => {
		fetch('/trips', {
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
		let groupInputs = null;

		// if (this.state.groupPax > 1) {
		// 	for (let i=0;i<this.state.groupPax; i++){
		// 		groupInputs = <p>test</p>
		// 	}
		// }
		return (
			<Form className={mainStyles.packlistForm}>
				<Form.Group>
					<Form.Label>Location</Form.Label>
					<Form.Control type="text" placeholder="Location" value={this.state.formInputs.location} onChange={this.updateLocation}/>
				</Form.Group>

				<Form.Group>
					<label>Start Date</label>
					<Form.Control type="date" value={this.state.formInputs.startDate} onChange={this.updateStartDate}/>
				</Form.Group>

				<Form.Group>
					<label>End Date</label>
					<Form.Control type="date" value={this.state.formInputs.endDate} onChange={this.updateEndDate}/>
				</Form.Group>

				<Form.Group>
					<label>Number of people</label>
					<Form.Control type="number" value={this.state.groupPax} min="1" max="10" onChange={this.updateGroupPax}/>
				</Form.Group>

				{groupInputs}

				<Form.Group>
					<label>Weather</label>
					<select value={this.state.formInputs.weather} onChange={this.updateWeather}>
						<option value="1">Sunny</option>
						<option value="2">Snowy</option>
						<option value="3">Rainy</option>
					</select>
				</Form.Group>
				<div className={mainStyles.multiSelectWrapper}>
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