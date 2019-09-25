import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../../style.scss";

class ItemPrivate extends React.Component {
    constructor() {
        super();
        this.state = {
            privacy: null,
            item_id:null

        };
    }
    componentDidMount(){
        this.setState({
            privacy:this.props.privacy,
            item_id:this.props.item_id
        })
    }

    handleChange = (e) => {
        let privacy = this.state.privacy
        this.setState({privacy:!privacy})
        let data = {
            item_id:this.state.item_id,
            privacy : !privacy
        };
        fetch('/private_item', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
            })
            .catch(error => console.error('Error:', error));
    }

    render(){
        let privacy = null;
        if(this.state.privacy){
            privacy = <i className='bx bxs-hide' onClick={(e)=>{this.handleChange(e)}}></i>
        }else{
            privacy = <i className='bx bxs-show' onClick={(e)=>{this.handleChange(e)}}></i>
        }
        return(
            privacy
        )

    }
}

ItemPrivate.propTypes ={
    addItem: PropTypes.func,
    category: PropTypes.string
};
export default ItemPrivate;