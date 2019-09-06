import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../..//style.scss";

class SidePanel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let panelImage = {};
		if (this.props.tripImage) {
			panelImage = {backgroundImage: `url(${this.props.tripImage})`};
		}
		return (
			<div className={mainStyles.sidePanel}>
				{this.props.children}
				<div className={mainStyles.sidePanelBg} style={panelImage}></div>
				<div className={mainStyles.sidePanelOverlay}></div>
			</div>
		);
	}
}

SidePanel.propTypes ={
	tripImage: PropTypes.string
};
export default SidePanel;