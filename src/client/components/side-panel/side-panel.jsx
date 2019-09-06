import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../..//style.scss";

class SidePanel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={mainStyles.sidePanel}>
				{this.props.children}
				<div className={mainStyles.sidePanelOverlay}></div>
			</div>
		);
	}
}

SidePanel.propTypes ={
};
export default SidePanel;