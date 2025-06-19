import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

import { useState } from 'react'

export default function AddShoe() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} variant="outline-secondary" className="float-end">Add New Shoe</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter New Shoe Details</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Brand Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Brand"/>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Model Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Model"/>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Color"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Color"/>
                            </FloatingLabel>
                    
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Buy Date"
                                className="mb-3"
                            >
                                <Form.Control type="date" placeholder="01/01/2000"/>
                            </FloatingLabel>
                        </Form.Group>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Buy Price"
                            >
                                <Form.Control type="text" placeholder="0.00"/>
                            </FloatingLabel>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Sell Price"
                            >
                                <Form.Control type="text" placeholder="0.00"/>
                            </FloatingLabel>
                        </InputGroup>

                        <Form.Group className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Link"
                            >
                                <Form.Control type="text" placeholder="Copy and paste URL here"/>
                            </FloatingLabel>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" as="input" type="submit" value="Add" onClick={handleClose}/>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}