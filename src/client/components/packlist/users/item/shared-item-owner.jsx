import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../../style.scss";
import {Col, Row, Dropdown, DropdownButton} from "react-bootstrap";

class SharedItemOwner extends React.Component {
    constructor(){
        super();
        this.state = {
            editing : false,
            owner : "No owner",
            ownerImage : null,
        };
        this.isMobile = (window.innerWidth <= 500);

        this.updateOwner = this.updateOwner.bind(this);
    }
    componentDidMount(){
        this.props.tripmates.forEach(x=>{
            if(x.packing_list_id === this.props.item_packinglist_id){
                this.setState({
                    owner:x.firstname,
                    ownerImage:x.image
                })
            }
        });
    }

    checkEdit = (e) => {
        if(!this.state.editing){
            this.setState({editing:true})
        }
        else {
            this.setState({editing:false});}

    };

    async updateOwner (e,userId,index) {
        this.setState({
            owner:this.props.tripmates[index].firstname,
            ownerImage:this.props.tripmates[index].image,
        });
        await this.props.updateSharedItem(userId,this.props.itemId);

    };


    render(){
        let itemOwner = null;
        let tripmatesOptions = [];
        this.props.tripmates.map((user,index)=>{
            tripmatesOptions.push(
                <Dropdown.Item key={index} href="#" onClick={(e)=>{this.updateOwner(e,user.id,index)}}>{user.firstname}</Dropdown.Item>);
        });
        if (this.state.editing || window.innerWidth <= 992) {
            itemOwner =(
                <DropdownButton onMouseLeave={this.checkEdit} title={this.state.owner} className={mainStyles.ownerDropdown}>
                    {tripmatesOptions}
                </DropdownButton>
            )
        }else{
            itemOwner = <div onMouseEnter={this.checkEdit}><p>{this.state.owner}</p></div>;
        }
        let ownerImageStyle = null;
        if (this.state.ownerImage !== null) {
            ownerImageStyle = {backgroundImage: `url(${this.state.ownerImage})`};
        }

        return(
            <Row>
                <Col xs={3} lg={4} className="pr-0 pr-xl-3">
                    <div className={mainStyles.ownerImage} style={ownerImageStyle}></div>
                </Col>
                <Col xs={8} className='pr-0'>
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