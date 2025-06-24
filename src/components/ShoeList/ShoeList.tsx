import type { Shoe, FormDataObj } from '../../lib/sharedTypes'
import { usePersistedState, usePersistedReducer } from '../../lib/hooks'
import { reducer, recalculateDailyValues, priceToNumber } from '../../lib/util'

import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

import AddShoe from './AddShoe'
import EditShoe from './EditShoe'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface Props {
    page: string
}

const initialState = {shoes: []}

export default function ShoeList (props: Props) {
    const pageName: string = props.page === 'collection' ? 'Collection' : 'Wishlist'
    const storageKey = `SHOE_COLLECTION/${props.page}`

    const [storedShoes, setStoredShoes] = usePersistedState(`SHOE_COLLECTION/${props.page}`, {shoes: []})
    const [dailyValues, setDailyValues] = usePersistedState(`DAILY_VALUES/${props.page}`, [])
    const [collectionDailyValues, setCollectionDailyValues] = usePersistedState(`DAILY_VALUES/collection`, [])

    const dispatch = usePersistedReducer(reducer, initialState, storageKey)
    const dispatchMover = usePersistedReducer(reducer, initialState, 'SHOE_COLLECTION/collection')

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
            buyDate: format(new Date(), 'yyyy-MM-dd'),
            buyPrice: priceToNumber(shoe.buyPrice),
            sellPrice: priceToNumber(shoe.sellPrice),
            link: shoe.link
        }
        dispatchMover({ type: 'ADD_SHOE', payload: newShoe })
        recalculateDailyValues(collectionDailyValues, setCollectionDailyValues, 0, priceToNumber(shoe.sellPrice))

        handleDelete(id)
    }

    const [sorting, setSorting] = useState({ key: 'brand', ascending: false })
    function applySorting(key: string, ascending: boolean) {
        setSorting({key: key, ascending: ascending})
    }

    useEffect(() => {
        const storedShoesCopy = [...storedShoes.shoes]
        const sortedShoes = storedShoesCopy.sort((a, b) => {
            return a[sorting.key].localeCompare(b[sorting.key])
        })

        setStoredShoes(sorting.ascending ? { shoes : sortedShoes.reverse()} : { shoes: sortedShoes })
    }, [sorting]);

    return (
        <Container>
            <Card border="light">
                <Card.Body>
                    <Card.Title>Shoes in {pageName}</Card.Title>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>
                                    <small className="text-muted">Brand</small>
                                    <Button onClick={() => applySorting('brand', !sorting.ascending)} variant="light">
                                        {sorting.ascending && (< IoMdArrowDropup />)}
                                        {!sorting.ascending && (< IoMdArrowDropdown />)}
                                    </Button>
                                </th>
                                <th>
                                    <small className="text-muted">Model</small>
                                    <Button onClick={() => applySorting('model', !sorting.ascending)} variant="light">
                                        {sorting.ascending && (< IoMdArrowDropup />)}
                                        {!sorting.ascending && (< IoMdArrowDropdown />)}
                                    </Button>
                                </th>
                                <th>
                                    <small className="text-muted">Color</small>
                                    <Button onClick={() => applySorting('color', !sorting.ascending)} variant="light">
                                        {sorting.ascending && (< IoMdArrowDropup />)}
                                        {!sorting.ascending && (< IoMdArrowDropdown />)}
                                    </Button>
                                </th>
                                {props.page === 'collection' && 
                                    (<th>
                                        <small className="text-muted">Buy Date</small>
                                        <Button onClick={() => applySorting('buyDate', !sorting.ascending)} variant="light">
                                            {sorting.ascending && (< IoMdArrowDropup />)}
                                            {!sorting.ascending && (< IoMdArrowDropdown />)}
                                        </Button>
                                    </th>)}
                                <th>
                                    <small className="text-muted">Buy Price</small>
                                    <Button onClick={() => applySorting('buyPrice', !sorting.ascending)} variant="light">
                                        {sorting.ascending && (< IoMdArrowDropup />)}
                                        {!sorting.ascending && (< IoMdArrowDropdown />)}
                                    </Button>
                                </th>
                                <th>
                                    <small className="text-muted">Sell Price</small>
                                    <Button onClick={() => applySorting('sellPrice', !sorting.ascending)} variant="light">
                                        {sorting.ascending && (< IoMdArrowDropup />)}
                                        {!sorting.ascending && (< IoMdArrowDropdown />)}
                                    </Button>
                                </th>
                                <th>
                                    <small className="text-muted">Profit</small>
                                    <Button onClick={() => applySorting('profit', !sorting.ascending)} variant="light">
                                        {sorting.ascending && (< IoMdArrowDropup />)}
                                        {!sorting.ascending && (< IoMdArrowDropdown />)}
                                    </Button>
                                </th>
                                <th>
                                    <small className="text-muted">Link</small>
                                    <Button onClick={() => applySorting('link', !sorting.ascending)} variant="light">
                                        {sorting.ascending && (< IoMdArrowDropup />)}
                                        {!sorting.ascending && (< IoMdArrowDropdown />)}
                                    </Button>
                                </th>
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