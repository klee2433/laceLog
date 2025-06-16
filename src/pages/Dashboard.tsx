import type { Profile } from '../types/sharedTypes'
import Header from '../components/Header'
import Cards from '../components/Cards'
import ShoeList from '../components/ShoeList'
import ValueChart from '../components/ValueChart'
import Stack from 'react-bootstrap/Stack';

interface Props {
    profile: Profile
    totalValue: number
    numShoes: number
}

export default function Dashboard(props: Props) {
    return (
        <Stack gap={4}>
            <Header />
            <Cards totalValue={props.totalValue} numShoes={props.numShoes}/>
            <ValueChart totalValues={props.profile.totalValues}/>
            <ShoeList shoeCollection={props.profile.shoeCollection}/>
        </Stack>
    )
}