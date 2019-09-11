import React from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-bootstrap";
import ItemAdd from "./item-add";

class ItemChecked extends React.Component {
    constructor(){
        super();
        this.state = {
            item_id : null,
            checked : null
        }
    }

    componentDidMount(){
        this.setState({
            item_id:this.props.item_id,
            checked:this.props.item_packed
        })

    }

    updateChecked = (e) =>{
        this.setState({checked:!this.state.checked});
        this.props.packItem(!this.state.checked,this.state.item_id);

    }

    render(){

        return(
            <Form>
                <Form.Check checked={this.state.checked} onChange={(e)=>this.updateChecked(e)} />
            </Form>
        )

    }
}

ItemChecked.propTypes ={
    item_id: PropTypes.number,
    checked: PropTypes.bool
};
export default ItemChecked;