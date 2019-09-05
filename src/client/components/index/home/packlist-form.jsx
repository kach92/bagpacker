import React from 'react';
import PropTypes from 'prop-types';
import styles from "./style.scss";

import Multiselect from 'multiselect-dropdown-react';

const data = [{
	name: 'Hiking',
	value: '1'
	},{
		name: 'Leisure',
		value: '2'
	},{
		name: 'Business',
		value: '3'
	},{
		name: 'Beach',
		value: '4'
	},{
		name: 'Snow Sports',
		value: '5'
	},{
		name: 'Camping',
		value: '6'
	}];

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

		let url = '/non_user_list';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(response => this.props.updatePacklist(JSON.stringify(response)))
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
			<form className={styles.packlistForm}>
				<h2>Create Packing List</h2>
				<div className={styles.formField}>
					<label>Location</label>
					<input type="text" value={this.state.formInputs.location} onChange={this.updateLocation}></input>
				</div>

				<div className={styles.formField}>
					<label>Start Date</label>
					<input type="date" value={this.state.formInputs.startDate} onChange={this.updateStartDate}></input>
				</div>


				<div className={styles.formField}>
					<label>End Date</label>
					<input type="date" value={this.state.formInputs.endDate} onChange={this.updateEndDate}></input>
				</div>

				<div className={styles.formField}>
					<label>Gender</label>
					<label>
						<input type="radio" value="F" checked={this.state.formInputs.gender === 'F'} onChange={this.updateGender}/>
						Female
					</label>
					<label>
						<input type="radio" value="M" checked={this.state.formInputs.gender === 'M'} onChange={this.updateGender}/>
						Male
					</label>
				</div>

				<div className={styles.formField}>
					<label>Weather</label>
					<select value={this.state.formInputs.weather} onChange={this.updateWeather}>
						<option value="1">Sunny</option>
						<option value="2">Snowy</option>
						<option value="3">Rainy</option>
					</select>
				</div>
				<div className={styles.formField}>
					<Multiselect options={data} onSelectOptions={this.updateActivities}/>
				</div>
				<button type="submit" onClick={this.submit}>Create Packing List</button>
				<br/>
				<div className="error">
				</div>
			</form>
		);
	}
}

PacklistForm.propTypes ={
	updatePacklist: PropTypes.func,
	history: PropTypes.object
};
export default PacklistForm;