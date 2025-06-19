import type { Shoe } from '../../types/sharedTypes'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { FaRegTrashAlt } from "react-icons/fa";

import AddShoe from './AddShoe'
import EditShoe from './EditShoe'

interface Props {
    shoeCollection: Shoe[]
}

export default function List (props: Props) {
    return (
        <Container>
            <Card border="light">
                <Card.Body>
                    <Card.Title>Shoes in Collection</Card.Title>
                    <Table striped hover>
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
                            {props.shoeCollection.map((shoe: Shoe, _) => (
                                <tr>
                                    <td>{shoe.brand}</td>
                                    <td>{shoe.model}</td>
                                    <td>{shoe.color}</td>
                                    <td>{shoe.buyDate}</td>
                                    <td>{shoe.buyPrice}</td>
                                    <td>{shoe.sellPrice}</td>
                                    <td>{shoe.profit}</td>
                                    <td><a href={shoe.link} target="_blank" className="link-success">{shoe.domain}</a></td>
                                    <td>
                                        <ButtonGroup className="float-end">
                                            <EditShoe shoe={shoe}/>
                                            <Button variant="outline-secondary"><FaRegTrashAlt /></Button>
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