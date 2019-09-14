import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../style.scss";
import TripDetails from "./trip-details";

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
            this.props.updateTripName(this.props.tripId,this.state.name);
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
            itemName = <input className={mainStyles.tripName} type="text" maxLength={40} value={this.state.name} ref={this.setWrapperRef} onChange={this.updateName} onKeyDown={(e)=>this.checkKey(e)}/>
        }else{
            itemName = <h4 onClick={this.checkEdit}>{this.state.name}</h4>;
        }
        return(
            itemName
        )

    }
}
TripName.propTypes ={
    tripName: PropTypes.string,
    tripId: PropTypes.number
};
export default TripName;