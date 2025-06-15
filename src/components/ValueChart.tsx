import { LineChart } from '@mui/x-charts/LineChart';
import Container from 'react-bootstrap/Container'
import { ValueEntry } from '../types/sharedTypes'

interface Props {
    totalValues: ValueEntry[]
}

export default function ValueChart (props: Props) {
    const values: number[] = []
    const dates: string[] = []

    props.totalValues.map((entry,_) => {
        values.push(entry.value);
        dates.push(entry.date);
    })

    console.log(dates)

    return (
        <Container>
            Daily Collection Value
            <LineChart
                xAxis={[{scaleType: 'point', data: dates}]}
                series={[{
                    data: values,
                 }]}
                height={300}
                margin={{
                    right: 50,
                }}
                grid={{ horizontal: true }}
            />
        </Container>
    )
}