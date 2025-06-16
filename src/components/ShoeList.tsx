import type { Shoe } from '../types/sharedTypes'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

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
                                <th><small className="text-muted">Shoe</small></th>
                                <th><small className="text-muted">Color</small></th>
                                <th><small className="text-muted">Buy Date</small></th>
                                <th><small className="text-muted">Buy Price</small></th>
                                <th><small className="text-muted">Sell Price</small></th>
                                <th><small className="text-muted">Profit</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.shoeCollection.map((shoe: Shoe, _) => (
                                <tr>
                                    <td>{shoe.name}</td>
                                    <td>{shoe.color}</td>
                                    <td>{shoe.buyDate}</td>
                                    <td>{shoe.buyPrice}</td>
                                    <td>{shoe.sellPrice}</td>
                                    <td>{shoe.profit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}