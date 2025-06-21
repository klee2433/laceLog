import type { Shoe } from '../../lib/sharedTypes'
import { useLocalStorage, usePersistedReducer } from '../../lib/hooks'
import { reducer } from '../../lib/reducer'

import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { FaRegTrashAlt } from "react-icons/fa";

import AddShoe from './AddShoe'
import EditShoe from './EditShoe'

const initialState = {shoes: []}
const storageKey = 'SHOE_COLLECTION'

export default function ShoeList () {
    const storedShoes = useLocalStorage('SHOE_COLLECTION', {shoes: []})

    const dispatch = usePersistedReducer(reducer, initialState, storageKey)

    function handleDelete(id: string) {
        dispatch({ type: 'DELETE_SHOE', payload: id })
        window.location.reload();
    }

    return (
        <Container>
            <Card border="light">
                <Card.Body>
                    <Card.Title>Shoes in Collection</Card.Title>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th><small className="text-muted">Brand</small></th>
                                <th><small className="text-muted">Model</small></th>
                                <th><small className="text-muted">Color</small></th>
                                <th><small className="text-muted">Buy Date</small></th>
                                <th><small className="text-muted">Buy Price</small></th>
                                <th><small className="text-muted">Sell Price</small></th>
                                <th><small className="text-muted">Profit</small></th>
                                <th><small className="text-muted">Link</small></th>
                                <th><AddShoe /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {storedShoes[0].shoes.map((value: Shoe, _:any) => (
                                <tr key={value.id}>
                                    <td>{value.brand}</td>
                                    <td>{value.model}</td>
                                    <td>{value.color}</td>
                                    <td>{value.buyDate}</td>
                                    <td>{value.buyPrice}</td>
                                    <td>{value.sellPrice}</td>
                                    <td>{value.profit}</td>
                                    <td><a href={value.link} target="_blank" className="link-success">{value.domain}</a></td>
                                    <td>
                                        <ButtonGroup className="float-end">
                                            <EditShoe shoe={value}/>
                                            <Button onClick={() => handleDelete(value.id)} variant="outline-secondary"><FaRegTrashAlt /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}