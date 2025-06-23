import type { Shoe, FormDataObj } from '../../lib/sharedTypes'
import { usePersistedState, usePersistedReducer } from '../../lib/hooks'
import { reducer, recalculateDailyValues, priceToNumber } from '../../lib/util'

import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { FaRegTrashAlt } from "react-icons/fa";

import AddShoe from './AddShoe'
import EditShoe from './EditShoe'

// TODO: Switch wishlist shoes to collection
// TODO: sort function for each column

interface Props {
    page: string
}

const initialState = {shoes: []}

export default function ShoeList (props: Props) {
    const storageKey = `SHOE_COLLECTION/${props.page}`

    const [storedShoes,_] = usePersistedState(`SHOE_COLLECTION/${props.page}`, {shoes: []})
    const [dailyValues, setDailyValues] = usePersistedState(`DAILY_VALUES/${props.page}`, [])

    const dispatch = usePersistedReducer(reducer, initialState, storageKey)
    const dispatch2 = usePersistedReducer(reducer, initialState, 'SHOE_COLLECTION/collection')

    function handleDelete(id: string) {
        const shoeToDelete: Shoe = storedShoes.shoes.filter((shoe: Shoe) => shoe.id === id)[0]
        recalculateDailyValues(dailyValues, setDailyValues, priceToNumber(shoeToDelete.sellPrice), 0)

        dispatch({ type: 'DELETE_SHOE', payload: id })
        window.location.reload();
    }

    function handleMove(id: string) {
        if (props.page === 'collection') return
        
        const shoe: Shoe = storedShoes.shoes.filter((shoe: Shoe) => shoe.id === id)[0]
        const newShoe: FormDataObj = {
            brand: shoe.brand,
            model: shoe.model,
            color: shoe.color,
            buyDate: new Date().toLocaleDateString(),
            buyPrice: priceToNumber(shoe.buyPrice),
            sellPrice: priceToNumber(shoe.sellPrice),
            link: shoe.link
        }
        dispatch2({ type: 'ADD_SHOE', payload: newShoe })

        handleDelete(id)
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
                                {props.page === 'collection' && (<th><small className="text-muted">Buy Date</small></th>)}
                                <th><small className="text-muted">Buy Price</small></th>
                                <th><small className="text-muted">Sell Price</small></th>
                                <th><small className="text-muted">Profit</small></th>
                                <th><small className="text-muted">Link</small></th>
                                <th><AddShoe page={props.page}/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {storedShoes.shoes.map((value: Shoe, _:any) => (
                                <tr key={value.id}>
                                    <td>{value.brand}</td>
                                    <td>{value.model}</td>
                                    <td>{value.color}</td>
                                    {props.page === 'collection' && (<td>{value.buyDate}</td>)}
                                    <td>{value.buyPrice}</td>
                                    <td>{value.sellPrice}</td>
                                    <td>{value.profit}</td>
                                    <td><a href={value.link} target="_blank" className="link-success">{value.domain}</a></td>
                                    <td>
                                        <ButtonGroup className="float-end">
                                            {props.page === 'wishlist' && (
                                                <Button onClick={() => handleMove(value.id)} variant="outline-secondary"> 
                                                    Move to Collection 
                                                </Button>
                                            )}
                                            <EditShoe shoe={value} page={props.page}/>
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