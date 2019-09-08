import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../../style.scss";
import {Col, Row, Dropdown, DropdownButton, Form} from "react-bootstrap";
import List from "../list";
import SharedList from "../shared-list";

class SharedItemOwner extends React.Component {
    constructor(){
        super();
        this.state = {
            editing : false,
            owner : "No owner"
        };
    }
    componentDidMount(){
        this.props.tripmates.forEach(x=>{
            if(x.packing_list_id === this.props.item_packinglist_id){
                this.setState({owner:x.firstname})
            }
        })
    }

    checkEdit = (e) => {
        if(!this.state.editing){
            this.setState({editing:true})
        }
        else {
            this.setState({editing:false});}

    };

    updateOwner = (e,userId) =>{
        this.setState({owner:e.target.innerText})
        this.props.updateSharedItem(userId,this.props.itemId);
    };


    render(){
        let itemOwner = null;
        let tripmatesOptions = [];
        this.props.tripmates.map((user,index)=>{
            tripmatesOptions.push(
                <Dropdown.Item key={index} href="#" onClick={(e)=>{this.updateOwner(e,user.id)}}>{user.firstname}</Dropdown.Item>);
        });
        if (this.state.editing) {
            itemOwner =(
                <DropdownButton onMouseLeave={this.checkEdit} title={this.state.owner} className={mainStyles.ownerDropdown}>
                    {tripmatesOptions}
                </DropdownButton>
            )
        }else{
            itemOwner = <div onMouseEnter={this.checkEdit}><p>{this.state.owner}</p></div>;
        }

        return(
            <Row>
                <Col xs={3}>
                    <div className={mainStyles.ownerImage}></div>
                </Col>
                <Col xs={9}>
                    {itemOwner}
                </Col>
            </Row>
        )

    }
}
SharedItemOwner.propTypes ={
    itemId: PropTypes.number,
    updateSharedItem: PropTypes.func
};
export default SharedItemOwner;