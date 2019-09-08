import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../../style.scss";
import {Col, Row, Dropdown, DropdownButton, Form} from "react-bootstrap";
import List from "../list";

class SharedItemOwner extends React.Component {
    constructor(){
        super();
        this.state = {
            editing : false,
            owner : "No owner"
        };
         this.setWrapperRef = this.setWrapperRef.bind(this);
         this.handleClickOutside = this.handleClickOutside.bind(this);
    }


    checkEdit = (e) => {
        if(!this.state.editing){
            this.setState({editing:true})
        }
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    updateOwner = (e) =>{
        this.setState({item_quantity:e.target.value});
    };

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                editing:false
            });
        }
    };

    render(){
        let itemOwner = null;
        let tripmatesOptions = [];
        this.props.tripmates.map((user,index)=>{
            tripmatesOptions.push(
                <Dropdown.Item key={index} href="#">{user.firstname}</Dropdown.Item>);
        });
        if (this.state.editing) {
            itemOwner =(
                <DropdownButton title={this.state.owner} className={mainStyles.ownerDropdown}>
                    {tripmatesOptions}
                </DropdownButton>
            )
        }else{
            itemOwner = <div onClick={this.checkEdit}><p>{this.state.owner}</p></div>;
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

export default SharedItemOwner;