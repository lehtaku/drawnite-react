import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './WordsModal.css';

const WordsModal = (props) => {
    const [show, setShow] = useState(true);

    const wordButtons = props.wordsToSelect.map((word, key) =>
        <Button type="button"
                color="primary"
                value={ word }
                key={ key }
                onClick={ handleSelect }>
            { word }</Button>
    );

    function handleSelect(event) {
        setShow(false);
        props.handler(event.target.value);
    }

    return (
        <Modal isOpen={ show } centered={true}>
            <ModalHeader>
                <span>Select a word to draw!</span>
            </ModalHeader>
            <ModalBody>
                <div className="d-flex justify-content-around">
                    { wordButtons }
                </div>
            </ModalBody>
        </Modal>
    )
};

export default WordsModal;
