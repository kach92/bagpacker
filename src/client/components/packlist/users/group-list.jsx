import React from 'react';
import PropTypes from 'prop-types';
import List from './list';
import SharedList from './shared-list';
import {Col,Row} from "react-bootstrap";
import mainStyles from "../../../style.scss";
class GroupList extends React.Component {
	constructor(){
		super();
	}

	render() {
		console.log(this.props.list[1].items);
		return (
			<Row className={mainStyles.packlist}>
				<Col xs={12}>
					<SharedList list={this.props.shared}/>
				</Col>
				<Col xs={12}>
					<List list={this.props.list[1].items}/>
				</Col>
			</Row>
		);
	}
}
GroupList.propTypes ={
	list: PropTypes.array,
	shared: PropTypes.object
};
export default GroupList;