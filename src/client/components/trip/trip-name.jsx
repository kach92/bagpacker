import React from 'react';
import PropTypes from 'prop-types';

class TripName extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editing : false,
            name : null
        };
    }

    componentDidMount(){
        this.setState({
            name:this.props.tripName,
        })
    }



    checkEdit = (e) => {
        if(!this.state.editing){
            this.setState({editing:true})
        }
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    updateName = (e) =>{
        this.setState({name:e.target.value})
    };

    checkKey = (e) => {
        if(e.keyCode === 13){
            this.props.updateTripName(this.props.trip_id,this.state.name);
            this.setState({
                editing:false
            });
            document.removeEventListener('mousedown', this.handleClickOutside);
        }

    };

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                editing:false
            });
            this.props.updateTripName(this.props.trip_id,this.state.name);
        }
    };

    render(){
        let itemName = null;

        if (this.state.editing) {
            itemName = <input type="text" value={this.state.name} ref={this.setWrapperRef} onChange={this.updateName} onKeyDown={(e)=>this.checkKey(e)}/>
        }else{
            // itemName = <div onClick={this.checkEdit}><p>{this.state.item_name}</p></div>;
            itemName = <h4 onClick={this.checkEdit}>{this.state.name}</h4>;
        }
        return(
            itemName
        )

    }
}

export default TripName;