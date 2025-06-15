import type { Profile } from '../types/sharedTypes'
import Header from '../components/Header'
import Cards from '../components/Cards'
import List from '../components/List'
import LineChart from '../components/LineChart'

interface Props {
    profile: Profile
}

export default function Dashboard(props: Props) {
    return (
        <>
            <Header />
            <Cards profile={props.profile}/>
            <List shoeCollection={props.profile.shoeCollection}/>
            <LineChart totalValues={props.profile.totalValues}/>
        </>
    )
}