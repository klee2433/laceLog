import Container from 'react-bootstrap/Container'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import AddShoe from './AddShoe'

export default function FunctionBar() {

    return (
        <Container>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton id="tbg-radio-1" value={1} variant="outline-secondary">
                    Collection
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={2} variant="outline-secondary">
                    Wishlist
                </ToggleButton>
            </ToggleButtonGroup>

            <AddShoe />
            
        </Container>

    )
}