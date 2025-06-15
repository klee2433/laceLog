import type { Shoe } from '../types/sharedTypes'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'


interface Props {
    shoeCollection: Shoe[]
}

export default function List (props: Props) {
    return (
        <Container>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Shoe</th>
                        <th>Color</th>
                        <th>Buy Date</th>
                        <th>Buy Price</th>
                        <th>Sell Price</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.shoeCollection.map((shoe: Shoe, _) => (
                        <tr>
                            <th>{shoe.name}</th>
                            <th>{shoe.color}</th>
                            <th>{shoe.buyDate}</th>
                            <th>{shoe.buyPrice}</th>
                            <th>{shoe.sellPrice}</th>
                            <th>{shoe.profit}</th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}