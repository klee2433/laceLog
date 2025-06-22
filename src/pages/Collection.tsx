import Header from '../components/Header'
import Cards from '../components/Cards'
import ShoeList from '../components/ShoeList/ShoeList'
import ValueChart from '../components/ValueChart'
import Stack from 'react-bootstrap/Stack'
import FunctionBar from '../components/FunctionBar'

export default function Collection() {
    return (
        <Stack gap={4}>
            <Header />
            <FunctionBar page='collection'/>
            <Cards page='collection'/>
            <ValueChart page='collection'/>
            <ShoeList page='collection'/>
        </Stack>
    )
}