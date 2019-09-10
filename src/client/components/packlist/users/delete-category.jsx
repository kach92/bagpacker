import React, { useState } from 'react';
import {Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import mainStyles from "../../../style.scss";

function DeleteCategoryModal(props) {

    const deleteCategory = () => {
        let data = {
            category_id: props.category_id
        };
        fetch('/delete_category', {
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
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={mainStyles.deleteModal}
        >
            <Modal.Body>
                <h4 className="mt-4">Delete <b>{props.category}</b>?</h4>
                {/*<h3 className="text-center mb-5 "><b>{props.category}</b></h3>*/}
                <Button className={`${mainStyles.btn}`} onClick={deleteCategory}>
                    Delete
                </Button>
            </Modal.Body>
        </Modal>
    );
}

function DeleteCategory(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (

        <React.Fragment>
            <i className={`bx bx-trash ${mainStyles.trashButton}`} onClick={() => setModalShow(true)}></i>
            <DeleteCategoryModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                history={props.history}
                updateTripInfo={props.updateTripInfo}
                category={props.category}
                category_id={props.category_id}
            />
        </React.Fragment>
    );
}
DeleteCategory.propTypes ={
    history: PropTypes.object
};
export default DeleteCategory;