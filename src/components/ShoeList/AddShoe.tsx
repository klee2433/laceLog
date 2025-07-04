import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

import { useState } from 'react'
import type { FormDataObj } from '../../lib/sharedTypes'
import { usePersistedState, usePersistedReducer } from '../../lib/hooks'
import { reducer, recalculateDailyValues } from '../../lib/util'

const initialState = {shoes: []}

const emptyFormData: FormDataObj = {
    brand: '',
    model: '',
    color: '',
    buyDate: '0000-00-00',
    buyPrice: 0,
    sellPrice: 0,
    link: ''
}

interface Props {
    page: string
}

export default function AddShoe(props: Props) {
    const storageKey = `SHOE_COLLECTION/${props.page}`

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = usePersistedReducer(reducer, initialState, storageKey)
    const [formData, setFormData] = useState(emptyFormData)

    const [dailyValues, setDailyValues] = usePersistedState(`DAILY_VALUES/${props.page}`, [])

    function handleSubmit(e: any) {
        e.preventDefault()
        recalculateDailyValues(dailyValues, setDailyValues, 0, formData.sellPrice)

        dispatch({ type: 'ADD_SHOE', payload: formData })
        setFormData(emptyFormData)
        window.location.reload();
    }

    return (
        <>
            <Button onClick={handleShow} variant="outline-secondary" className="float-end">Add New Shoe</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter New Shoe Details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Brand Name"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Brand" 
                                    value={formData.brand} 
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Model Name"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Model"
                                    value={formData.model}
                                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Color"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Color"
                                    value={formData.color}
                                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                                />
                            </FloatingLabel>
                        </Form.Group>            

                        {props.page === 'collection' && (
                            <Form.Group className="mb-3">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Buy Date"
                                    className="mb-3"
                                >
                                    <Form.Control 
                                        type="date" 
                                        placeholder="Select a date"
                                        value={formData.buyDate}
                                        onChange={(e) => setFormData({...formData, buyDate: e.target.value})}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        )}

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Buy Price"
                            >
                                <Form.Control 
                                    type="number"
                                    value={formData.buyPrice}
                                    onChange={(e) => setFormData({...formData, buyPrice: Number(e.target.value)})}
                                />
                            </FloatingLabel>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Sell Price"
                            >
                                <Form.Control 
                                    type="number"
                                    value={formData.sellPrice}
                                    onChange={(e) => setFormData({...formData, sellPrice: Number(e.target.value)})}
                                />
                            </FloatingLabel>
                        </InputGroup>

                        <Form.Group className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Link"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Copy and paste URL here"
                                    value={formData.link}
                                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                                />
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