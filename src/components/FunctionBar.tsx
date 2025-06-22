import Container from 'react-bootstrap/Container'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import AddShoe from './ShoeList/AddShoe'
import { useNavigate } from 'react-router-dom'

interface Props {
    page: string
}

export default function FunctionBar(props: Props) {
    const navigate = useNavigate();
    return (
        <Container>
            <ToggleButtonGroup 
                type="radio" 
                name="options" 
                value={props.page === 'collection' ? 1 : 2}
            >
                <ToggleButton 
                    id="tbg-radio-1" 
                    value={1} 
                    variant="outline-secondary"
                    onClick={() => navigate(`/collection`)}
                >
                    Collection
                </ToggleButton>
                <ToggleButton 
                    id="tbg-radio-2" 
                    value={2} 
                    variant="outline-secondary"
                    onClick={() => navigate(`/wishlist`)}
                >
                    Wishlist
                </ToggleButton>
            </ToggleButtonGroup>

            <AddShoe page={props.page}/>
            
        </Container>

    )
}