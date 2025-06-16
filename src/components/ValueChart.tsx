import { LineChart } from '@mui/x-charts/LineChart';
import Container from 'react-bootstrap/Container'
import { ValueEntry } from '../types/sharedTypes'
import Card from 'react-bootstrap/Card';

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

    const valueFormatter = (value: number) => `$${value.toLocaleString()}`;

    return (
        <Container>
            <Card border="light">
                <Card.Body>
                    <Card.Title className="m-50">Daily Collection Value</Card.Title>
                    <LineChart
                        sx={{
                            "& .MuiLineElement-root": {
                                strokeWidth: 3,
                            },
                        }}
                        xAxis={[{scaleType: 'point', data: dates}]}
                        yAxis={[{ width: 60, valueFormatter }]}
                        series={[{
                            data: values,
                            color: "black",
                        }]}
                        height={300}
                        margin={{
                            right: 50,
                            left: 50,
                        }}
                        grid={{ horizontal: true }}
                    />
                </Card.Body>
            </Card>
        </Container>
    )
}