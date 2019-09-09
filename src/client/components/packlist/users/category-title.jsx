import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";

class CategoryTitle extends React.Component {
    constructor(){
        super();
        this.state = {
            editing : false,
            category : null
        };
    }

    componentDidMount(){
        this.setState({
            category:this.props.category,
        })

    }

    checkEdit = (e) => {
        if(!this.state.editing){
            this.setState({editing:true})
        }
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    updateName = (e) =>{
        this.setState({category:e.target.value})
    };

    checkKey = (e) => {
        if(e.keyCode === 13){
            console.log(this.props)
            this.props.submitCategoryTitleEdit(this.props.category_id,this.state.category);
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
            this.props.submitCategoryTitleEdit(this.props.category_id,this.state.category);
        }
    };

    render(){
        let itemName = null;
        if (this.state.editing) {
            itemName =
                <input className={mainStyles.categoryInput} type="text" value={this.state.category} ref={this.setWrapperRef} onChange={this.updateName} onKeyDown={(e)=>this.checkKey(e)}/>
        }else{
            // itemName = <div onClick={this.checkEdit}><p>{this.state.item_name}</p></div>;
            itemName = <h4 onClick={this.checkEdit}>{this.state.category}</h4>;
        }
        return(
            itemName
        )

    }
}

export default CategoryTitle;