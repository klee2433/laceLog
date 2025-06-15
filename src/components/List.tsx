import type { Shoe } from '../types/sharedTypes'

interface Props {
    shoeCollection: Shoe[]
}

export default function List (props: Props) {
    return (
        <>
            <p> List goes here </p>
        </>
    )
}