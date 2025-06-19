import type { Profile } from '../types/sharedTypes'
import Header from '../components/Header'
import Cards from '../components/Cards'
import ShoeList from '../components/ShoeList/ShoeList'
import ValueChart from '../components/ValueChart'
import Stack from 'react-bootstrap/Stack';
import FunctionBar from '../components/FunctionBar';

interface Props {
    profile: Profile
}

export default function Dashboard(props: Props) {
    const propsNumShoes = props.profile.shoeCollection.length
    const propsNumValues = props.profile.totalValues.length

    return (
        <Stack gap={4}>
            <Header />
            <FunctionBar />
            <Cards totalValue={props.profile.totalValues[propsNumValues-1].value} numShoes={propsNumShoes}/>
            <ValueChart totalValues={props.profile.totalValues}/>
            <ShoeList shoeCollection={props.profile.shoeCollection}/>
        </Stack>
    )
}