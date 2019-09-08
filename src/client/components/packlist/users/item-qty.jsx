import React from 'react';
import PropTypes from 'prop-types';

class ItemQty extends React.Component {
    constructor(){
        super();
        this.state = {
            editing : false,
            item_id : null,
            item_quantity : null
        }
         this.setWrapperRef = this.setWrapperRef.bind(this);
         this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount(){
        this.setState({
            item_id:this.props.item_id,
            item_quantity:this.props.item_quantity
        })

    }

    checkEdit = (e) => {
        if(!this.state.editing){
            this.setState({editing:true})
        }
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    updateQuantity = (e) =>{
        this.setState({item_quantity:e.target.value});
        this.props.submitQtyEdit(this.state.item_id,e.target.value);
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
        let itemQuantity = null;
        if (this.state.editing) {
            itemQuantity =
                <input type="number" value={this.state.item_quantity} min="1" ref={this.setWrapperRef} onChange={this.updateQuantity} />

        }else{
            itemQuantity = <div onClick={this.checkEdit}><p>{this.state.item_quantity}</p></div>;
        }

        return(
            itemQuantity
        )

    }
}

export default ItemQty;