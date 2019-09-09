import React, { useState } from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";

function AddNewCategoryModal(props) {

    const [name, setValue] = useState(0);
    const [errorMessage, setError] = useState('');

    const submitNewCategory = () => {
        if (name === 0 || name.trim() === "") {
            setError('Please fill in the category name');
        }
        else {
            console.log("SUBMITING");
            let data = {
                trip_id: props.tripId,
                new_category: name
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
    };
    console.log(errorMessage);
    let errorMessageDiv = null;
    if (errorMessage !== ""){
        errorMessageDiv = (<Col xs={12} className={mainStyles.formError}><p>{errorMessage}</p></Col>);
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={mainStyles.addCategoryModal}
        >
            <Modal.Body>
                <Row>
                    <Col xs={12}>
                        <h4>Add new category</h4>
                        <Form.Control type="text" placeholder="Category name" onChange={(e)=>setValue(e.target.value)}/>
                        <Button className={`${mainStyles.btn}`} onClick={submitNewCategory}>
                            Add Category
                        </Button>
                    </Col>
                    {errorMessageDiv}
                </Row>
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