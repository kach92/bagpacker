import React from 'react';
import PropTypes from 'prop-types';
import List from './list';
import TripmateList from './tripmate-list';
import SharedList from './shared-list';
import {Col, Row, Form, DropdownButton, Dropdown} from "react-bootstrap";
import mainStyles from "../../../style.scss";

class GroupList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentUser: 0,
			changedListToShow: false
		}
	}
	updateCurrentListToShow = (e,index) =>{
		let currentUserId = parseInt(index);
		if (this.props.list[currentUserId].id === this.props.userId){
			this.setState({
				currentUser: currentUserId,
				changedListToShow: false
			})
		}
		else {
			this.setState({
				currentUser: currentUserId,
				changedListToShow: true
			})
		}
        this.props.updateTripInfo();
	};

    addItem = (name, quantity,category) => {
        let data = {
            trip_id: this.props.tripId,
            category,
            item_name: name,
            quantity: quantity
        };
        fetch('/add_custom_item', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => window.location.reload())
            .catch(error => console.error('Error:', error));
    };
	render() {
		let list = this.props.list;
		let currentUser = 0;
		let currentUserName = "View tripmate's list";
		let tripmatesOptions = [];
		let listToShow = null;
		list.map((user,index)=>{
			if (user.id === this.props.userId){
				currentUser = index;
				listToShow = <List list={list[currentUser].items} tripId={this.props.tripId} updateTripInfo={this.props.updateTripInfo} solo={this.props.solo}/>
                tripmatesOptions.unshift(
                    <Dropdown.Item key={index} href="#" onClick={(e)=>{this.updateCurrentListToShow(e,index)}}>{user.firstname} (You)</Dropdown.Item>
                );
			}else{
                tripmatesOptions.push(
                    <Dropdown.Item key={index} href="#" onClick={(e)=>{this.updateCurrentListToShow(e,index)}}>{user.firstname}</Dropdown.Item>
                );
            }

		});
		if (this.state.changedListToShow) {
			currentUser = this.state.currentUser;
			currentUserName = list[currentUser].firstname;
			listToShow = <TripmateList list={list[currentUser].items}/>;
		}
		return (
			<Row className={mainStyles.packlist}>
				<Col xs={12}>
					<SharedList list={this.props.shared} tripmates={this.props.list} tripId={this.props.tripId} updateTripInfo={this.props.updateTripInfo} addItem={this.addItem}/>
				</Col>
				<Col xs={12} className="my-5">
					<Row className="align-items-center">
						<Col>
							<h3 className="mb-0">{list[currentUser].firstname}'s List</h3>
						</Col>
						<Col>
							<DropdownButton title={currentUserName} className={mainStyles.tripmateDropdown}>
								{tripmatesOptions}
							</DropdownButton>
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