import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input } from 'reactstrap';
import './UsernameModal.css';

const UsernameModal = (props) => {
    const [show, setShow] = useState(true);
    const [userName, setUsername] = useState('');

    function handleSubmit() {
        props.onSubmit(userName);
        setShow(false);
    }

    function handleCancel() {
        props.onSubmit('');
        setShow(false);
    }

    function handleInput(ev) {
        setUsername(ev.target.value);
    }

    return (
        <Modal isOpen={ show }>
            <ModalHeader>Hi! Who are you?</ModalHeader>
            <ModalBody>
                <InputGroup>
                    <Input value={ userName }
                           onChange={ handleInput }
                           placeholder="Username" />
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={ handleCancel } color="secondary">Cancel</Button>
                <Button onClick={ handleSubmit } color="primary">Select</Button>
            </ModalFooter>
        </Modal>
    );
};

export default UsernameModal;
