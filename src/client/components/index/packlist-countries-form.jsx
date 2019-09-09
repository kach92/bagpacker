import React from 'react';
import PropTypes from 'prop-types';
import Countries from "../../countries.js";
import mainStyles from "../../style.scss";

import Autosuggest from 'react-autosuggest';


const getSuggestions = value => {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	return inputLength === 0 ? [] : (Object.keys(Countries)).filter(key =>
			Countries[key].slice(0, inputLength) === inputValue
	);
};

const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => (
	<div className={mainStyles.suggestion}>
		{suggestion}
	</div>
);

class CountriesForm extends React.Component {
	constructor() {
		super();
		this.state = {
			value: '',
			suggestions: []
		};
	}

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
		this.props.updateLocation(newValue);
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'Select location',
			value,
			onChange: this.onChange
		};

		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
			/>
		);
	}
}
CountriesForm.propTypes ={
};
export default CountriesForm;