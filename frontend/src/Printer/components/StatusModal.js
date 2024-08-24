import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const StatusModal = ({ show, handleClose, printer, updatePrinterStatus }) => {
    const [status, setStatus] = useState(printer.status || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePrinterStatus(printer._id, status);
        handleClose(); // Close the modal after submission
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Printer Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPrinterStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default StatusModal;
