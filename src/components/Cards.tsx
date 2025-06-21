import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {
    totalValue: number
    numShoes: number
}

export default function Cards (props: Props) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(props.totalValue);

    return (
        <Container>
            <Row xs={1} md={2} className="g-4">
                <Col key={1}>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>Current Collection Value</Card.Title>
                            <h2> {formattedAmount} </h2>
                            <small className="text-muted">+5% over the past month, +20% over the past year</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col key={2}>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>Number of Shoes in Collection</Card.Title>
                            <h2> {props.numShoes} </h2>
                            <small className="text-muted">+3 in the past month, +10 in the past year</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}