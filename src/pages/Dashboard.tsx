import Header from '../components/Header'
import Cards from '../components/Cards'
import ShoeList from '../components/ShoeList/ShoeList'
import ValueChart from '../components/ValueChart'
import Stack from 'react-bootstrap/Stack'
import FunctionBar from '../components/FunctionBar'

export default function Dashboard() {
    return (
        <Stack gap={4}>
            <Header />
            <FunctionBar />
            <Cards />
            <ValueChart />
            <ShoeList />
        </Stack>
    )
}