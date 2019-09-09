import React, { useState } from 'react';
import {Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";

function AddNewCategoryModal(props) {

    const [name, setValue] = useState(0);

    const submitNewCategory = () => {
        console.log(props)
        let data = {
            trip_id: props.tripId,
            new_category : name
        };
        fetch('/add_new_category', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            props.updateTripInfo();
            props.onHide();
            // window.location.reload()
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={mainStyles.deleteModal}
        >
            <Modal.Body>
                <h4>New Category Name</h4>
                <input type="text" onChange={(e)=>setValue(e.target.value)}/><br/><br/>
                <Button className={`${mainStyles.btn} ${mainStyles.btnSecondary}`} onClick={submitNewCategory}>
                    Add Category
                </Button>
            </Modal.Body>
        </Modal>
    );
}

function AddCategory(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (

        <React.Fragment>
            <div className={`mt-3 ${mainStyles.addButton}`} onClick={() => setModalShow(true)}><i className='bx bx-plus'></i> Add new category</div>
            <AddNewCategoryModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                history={props.history}
                tripId={props.tripId}
                updateTripInfo={props.updateTripInfo}
            />
        </React.Fragment>
    );
}
AddCategory.propTypes ={
    history: PropTypes.object
};
export default AddCategory;