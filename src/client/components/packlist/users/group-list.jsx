import React from 'react';
import PropTypes from 'prop-types';
import List from './list';
import TripmateList from './tripmate-list';
import SharedList from './shared-list';
import {Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";
class GroupList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentUser: 0,
			changedListToShow: false
		}
	}
	updateCurrentListToShow = (e) =>{
		let currentUserId = parseInt(e.target.value);
		if (this.props.list[currentUserId].id === this.props.userId){
			this.setState({
				currentUser: currentUserId,
				changedListToShow: false
			})
		}
		else {
			this.setState({
				currentUser: parseInt(e.target.value),
				changedListToShow: true
			})
		}
	};
	render() {
		let list = this.props.list;
		let currentUser = 0;
		let tripmatesOptions = [];
		let listToShow = null;
		list.map((user,index)=>{
			if (user.id === this.props.userId){
				currentUser = index;
				listToShow = <List list={list[currentUser].items}/>
			}
			tripmatesOptions.push(<option key={index} value={index}>{user.firstname} {user.lastname}</option>);
		});
		if (this.state.changedListToShow) {
			currentUser = this.state.currentUser;
			listToShow = <TripmateList list={list[currentUser].items}/>;
		}

		return (
			<Row className={mainStyles.packlist}>
				<Col xs={12}>
					<SharedList list={this.props.shared} tripmates={this.props.list} tripId={this.props.tripId} updateTripInfo={this.props.updateTripInfo}/>
				</Col>
				<Col xs={12} className="my-5">
					<Row>
						<Col>
							<h3>{list[currentUser].firstname}'s List</h3>
						</Col>
						<Col>
							<div className={mainStyles.select}>
								<Form.Control defaultValue="null" as="select" onChange={this.updateCurrentListToShow}>
									<option value="null" disabled>View Tripmate's list</option>
									{tripmatesOptions}
								</Form.Control>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xs={12}>
					{listToShow}
				</Col>
			</Row>
		);
	}
}
GroupList.propTypes ={
	list: PropTypes.array,
	shared: PropTypes.array,
	userId: PropTypes.number,
	tripId: PropTypes.number
};
export default GroupList;