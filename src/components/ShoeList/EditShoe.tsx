import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { GrEdit } from "react-icons/gr"
import { useState } from 'react'
import type { Shoe, FormDataObj } from '../../lib/sharedTypes'
import { usePersistedState, usePersistedReducer } from '../../lib/hooks'
import { reducer, recalculateDailyValues, priceToNumber } from '../../lib/util'

interface Props {
    shoe: Shoe
}

const initialState = {shoes: []}
const storageKey = 'SHOE_COLLECTION'

export default function EditShoe(props: Props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const pastFormData: FormDataObj = {
        brand: props.shoe.brand,
        model: props.shoe.model,
        color: props.shoe.color,
        buyDate: props.shoe.buyDate,
        buyPrice: priceToNumber(props.shoe.buyPrice),
        sellPrice: priceToNumber(props.shoe.sellPrice),
        link: props.shoe.link
    }

    const dispatch = usePersistedReducer(reducer, initialState, storageKey)
    const [formData, setFormData] = useState(pastFormData)

    const [dailyValues, setDailyValues] = usePersistedState("DAILY_VALUES", [])

    function handleSubmit() {
        recalculateDailyValues(dailyValues, setDailyValues, priceToNumber(props.shoe.sellPrice), formData.sellPrice)

        dispatch({ type: 'EDIT_SHOE', payload: {id: props.shoe.id, data: formData} })
        setFormData(pastFormData)
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}><GrEdit /></Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Shoe Details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={formData.brand} 
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Model</Form.Label>
                            <Form.Control 
                                type="text"
                                value={formData.model} 
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Color</Form.Label>
                            <Form.Control 
                                type="text"
                                value={formData.color} 
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Buy Date</Form.Label>
                            <Form.Control 
                                type="text"
                                value={formData.buyDate} 
                                onChange={(e) => setFormData({ ...formData, buyDate: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Buy Price</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={formData.buyPrice} 
                                onChange={(e) => setFormData({ ...formData, buyPrice: Number(e.target.value) })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Sell Price</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={formData.sellPrice} 
                                onChange={(e) => setFormData({ ...formData, sellPrice: Number(e.target.value) })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Link</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={formData.link} 
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            />
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