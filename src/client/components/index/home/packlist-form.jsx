import React from 'react';
import styles from "./style.scss";

import Multiselect from 'multiselect-dropdown-react';

const data = [{
	name: 'Hiking',
	value: '1'
},
{
	name: 'Leisure',
	value: '2'
},
{
	name: 'Business',
	value: '3'
},
{
	name: 'Beach',
	value: '4'
},
{
	name: 'Snow Sports',
	value: '5'
},
{
	name: 'Camping',
	value: '6'
}];
class PacklistForm extends React.Component {
	constructor(){
		super();
		this.state = {
			formInputs: {
				location: "",
				startDate: "",
				endDate: "",
				gender: "",
				weather: "",
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
		// Object.keys(formInputs).forEach(function (item) {
		// 	console.log(formInputs[item]);
		// 	if (formInputs[item] === "")
		// 		validated = false;
		// });
		//
		// if (formInputs['password'] != formInputs['confirmPassword'])
		// 	validated = false;

		if (validated) {
			delete formInputs.confirmPassword;
			this.getPacklist(formInputs);
		}
	};
	getPacklist = (data) => {

		let url = '/non_user_list';

		fetch(url, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(response => console.log('Success:', JSON.parse(JSON.stringify(response))))
			.catch(error => console.error('Error:', error));
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
					<Multiselect options={data} onSelectOptions={this.updateActivities} />
				</div>
				<button type="submit" onClick={this.submit}>Create Packing List</button>
				<br/>
				<div className="error">
				</div>
			</form>
		);
	}
}
// Login.propTypes ={
// };
export default PacklistForm;