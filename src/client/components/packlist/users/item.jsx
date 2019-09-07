import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
    constructor(){
        super();
        this.state = {
            editing : false,
            item_id : null,
            item_name : null
        }
         this.setWrapperRef = this.setWrapperRef.bind(this);
         this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount(){
        this.setState({
            item_id:this.props.item_id,
            item_name:this.props.item_name
        })

    }

    checkEdit = (e) => {
        if(!this.state.editing){
            this.setState({editing:true})
        }
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    updateName = (e) =>{
        this.setState({item_name:e.target.value})
    }

    checkKey = (e) => {
        if(e.keyCode == 13){
            this.props.submitNameEdit(this.state.item_id,this.state.item_name);
            this.setState({
                editing:false
            });
            document.removeEventListener('mousedown', this.handleClickOutside);
        }

    };

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                editing:false
            });
        }
    }

    render(){
        let itemName = null;
        if (this.state.editing) {
            itemName =
                <input type="text" value={this.state.item_name} ref={this.setWrapperRef} onChange={(e) => this.updateName(e)} onKeyDown={(e)=>this.checkKey(e)}/>

        }else{
            itemName = <div onClick={(e)=>this.checkEdit(e)}><p>{this.state.item_name}</p></div>;
        }

        return(
            itemName

        )

    }
}

export default Item;