import React from 'react';
import PropTypes from 'prop-types';
import ActivitiesForm from "../packlist-activities-form";
import mainStyles from "../../../style.scss";
import {Form, Row, Col} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import CountriesForm from "../packlist-countries-form";

class PacklistForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formInputs: {
				location: "",
				startDate:new Date(),
				endDate:new Date(),
				gender: "",
				weather: "1",
				activities: []
			},
			errorMessage: ""
		};
	}

	updateLocation = (location) => {
		let formInputs = this.state.formInputs;
		formInputs.location = location;

		this.setState({formInputs: formInputs});
	};
	updateStartDate = (date) => {
		let formInputs = this.state.formInputs;
		formInputs.startDate = date;
		this.setState({formInputs: formInputs});
	};
	updateEndDate = (date) => {
		let formInputs = this.state.formInputs;
		formInputs.endDate = date;
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
			formInputs.duration = this.calcDuration(formInputs.startDate, formInputs.endDate);
			if (formInputs.duration <=0) {
				this.setState({errorMessage: "The start date cannot be later than the end date"})
			}
			else {
				this.getPacklist(formInputs);
			}
		}else {
			this.setState({errorMessage: "Please fill in the details to generate the packing list"})
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
		let duration = Math.floor((new Date(end).setHours(0,0,0,0)-new Date(start).setHours(0,0,0,0)) / (1000*60*60*24));
		return duration+1
	};

	render() {
		let errorMessage = null;
		if (this.state.errorMessage !== ""){
			errorMessage = (<Col xs={12} className={mainStyles.formError}><p>{this.state.errorMessage}</p></Col>);
		}
		return (
			<Form className={mainStyles.packlistForm}>
				<Row>
					<Col>
						<Form.Group>
							<label>Location</label>
							<div className={mainStyles.suggestionWrapper}>
								<CountriesForm updateLocation={this.updateLocation}/>
							</div>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group className={mainStyles.datepicker}>
							<label>Start Date</label>
							<DatePicker
								selectsStart
								selected={this.state.formInputs.startDate}
								onChange={date => this.updateStartDate(date)}
								startDate={this.state.formInputs.startDate}
								endDate={this.state.formInputs.endDate}
							/>
						</Form.Group>
					</Col>

					<Col>
						<Form.Group className={mainStyles.datepicker}>
							<label>End Date</label>
							<DatePicker
								selectsEnd
								selected={this.state.formInputs.endDate}
								onChange={date => this.updateEndDate(date)}
								endDate={this.state.formInputs.endDate}
								minDate={this.state.formInputs.startDate}
							/>
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
				<Row>
					<Col>
						<Form.Group>
							<div className={mainStyles.multiSelectWrapper}>
								<label>Activities</label>
								<ActivitiesForm updateActivities={this.updateActivities}/>
							</div>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="mb-5">
						<button type="submit" onClick={this.submit} className={mainStyles.btn}>Create Packing List</button>
					</Col>
					{errorMessage}
				</Row>
			</Form>
		);
	}
}

PacklistForm.propTypes ={
	updatePacklist: PropTypes.func,
	history: PropTypes.object
};
export default PacklistForm;