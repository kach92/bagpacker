import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from '../../../style.scss'

import {Col,Row,Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

class Home extends React.Component {
    constructor(){
        super();
		this.state={
			showFeatures: false,
			return: false
		}
    }

    componentDidMount(){
        this.props.checkUser();
    }
	showFeatures = (e) => {
		this.setState({showFeatures:true,return: false})
	};
	hideFeatures = (e) => {
		this.setState({showFeatures:false,return: true})
	};
	render() {
		let coverClass = mainStyles.cover;
		let coverWrapper = null;
		if (this.state.showFeatures) {
			coverClass = `${mainStyles.cover} ${mainStyles.coverFeatures} `;
			coverWrapper = `${mainStyles.coverWrapper}`;
		}
		if (this.state.return) {
			coverClass = `${mainStyles.cover} ${mainStyles.coverFeaturesHide} `;
			coverWrapper = `${mainStyles.coverWrapperHide}`;
		}
		return (
			<Row className={coverWrapper}>
				<Col xs={12} className={coverClass}>
					<div className={mainStyles.coverImage}></div>
					<div className={mainStyles.coverOverlay}></div>
					<div className={mainStyles.coverCaption}>
						<h1>Bagpacker</h1>
						<p>A Packing List Generator</p>
						<Button onClick={this.showFeatures} className={`mt-5 ${mainStyles.btn} ${mainStyles.btnCover} mx-auto`}>Learn more</Button>
					</div>
				</Col>
				{/*<Col xs={12} className={mainStyles.feature}>*/}
				{/*	<div></div>*/}
				{/*</Col>*/}
				<Col xs={4} className={`${mainStyles.coverFeaturePanel} ${mainStyles.features}`} onClick={this.hideFeatures}>
					<h2>Features</h2>
				</Col>
				<Col xs={8} className={`${mainStyles.coverFeatures} ${mainStyles.features}`}>
					<Row className={mainStyles.coverFeatureRow}>
						<Col xs={{ span: 3, offset: 1 }} className="p-3">
							<div className={`${mainStyles.featureImg} ${mainStyles.featureImg1}`}></div>
						</Col>
						<Col xs={7}>
							<h4>Generate a packing list<br/>for travelling</h4>
							<ul>
								<li>Dynamic list based on number of travel days, weather and activities</li>
								<li>Easily customisable</li>
							</ul>
						</Col>
					</Row>
					<Row className={mainStyles.coverFeatureRow}>
						<Col xs={{ span: 3, offset: 1 }} className="p-3">
							<div className={`${mainStyles.featureImg} ${mainStyles.featureImg2}`}></div>
						</Col>
						<Col xs={7}>
							<h4>Easily Customisable</h4>
							<ul>
								<li>Edit item name and quantity</li>
								<li>Add custom categories</li>
							</ul>
						</Col>
					</Row>
					<Row className={mainStyles.coverFeatureRow}>
						<Col xs={{ span: 3, offset: 1 }} className="p-3">
							<div className={`${mainStyles.featureImg} ${mainStyles.featureImg3}`}></div>
						</Col>
						<Col xs={7}>
							<h4>Create group trip<br/>with families and friends</h4>
							<ul>
								<li>View packing lists of one another</li>
								<li>Indicates items that are for sharing</li>
								<li>Hide certain items for privacy</li>
							</ul>
						</Col>
					</Row>
					<Row className="mb-5">
						<Col xs={10} className="text-right mb-5">
							<Link to="/signup/" className={`mt-5 ${mainStyles.btn} d-inline-block`}>Sign up now</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}
Home.propTypes ={
	updatePacklist: PropTypes.func,
	history: PropTypes.object
};
export default Home;