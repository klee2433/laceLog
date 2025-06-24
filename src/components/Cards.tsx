import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { usePersistedState } from '../lib/hooks'
import { ValueStats } from '../lib/sharedTypes'
import { runStats, numberToPrice } from '../lib/util'

interface Props {
    page: string
}

export default function Cards(props: Props) {
    const pageName: string = props.page === 'collection' ? 'Collection' : 'Wishlist'

    const [dailyValues, setDailyValues] = usePersistedState(`DAILY_VALUES/${props.page}`, [])
    const currentValue: number = dailyValues.length > 0 ? dailyValues[dailyValues.length - 1].value : 0

    const [storedShoes, _] = usePersistedState(`SHOE_COLLECTION/${props.page}`, {shoes: []})
    const numShoes: number = storedShoes.shoes.length
    const stats: ValueStats = runStats(dailyValues, setDailyValues, storedShoes.shoes)

    return (
        <Container>
            <Row xs={1} md={2} className="g-4">
                <Col key={1}>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>Current {pageName} Value</Card.Title>
                            <h2> {numberToPrice(currentValue)} </h2>
                            <small className="text-muted">{stats.totalProfit} profit overall</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col key={2}>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>Number of Shoes in {pageName}</Card.Title>
                            <h2> {numShoes} </h2>
                            <small className="text-muted">+ {stats.newShoesMonth} in the past month, + {stats.newShoesYear} in the past year</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}