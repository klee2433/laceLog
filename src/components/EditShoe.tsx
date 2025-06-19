import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { GrEdit } from "react-icons/gr"

import { useState } from 'react'

import type { Shoe } from '../types/sharedTypes'

interface Props {
    shoe: Shoe
}

export default function EditShoe(props: Props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}><GrEdit /></Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Shoe Details</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control type="text" placeholder={props.shoe.brand}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder={props.shoe.model}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" placeholder={props.shoe.color}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Buy Date</Form.Label>
                            <Form.Control type="text" placeholder={props.shoe.buyDate}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Buy Price</Form.Label>
                            <Form.Control type="text" placeholder={props.shoe.buyPrice}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Sell Price</Form.Label>
                            <Form.Control type="text" placeholder={props.shoe.sellPrice}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Link</Form.Label>
                            <Form.Control type="text" placeholder={props.shoe.link}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" as="input" type="submit" value="Save" onClick={handleClose}/>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}