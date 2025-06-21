import { Shoe } from './sharedTypes'
import type { FormDataObj, State, Action } from './sharedTypes'

export function reducer(state: State, action: Action): State {
    switch(action.type) {
        case 'ADD_SHOE':
            return { shoes: [...state.shoes, addNewShoe(action.payload)] }
        case 'EDIT_SHOE':
            return { shoes: state.shoes.map(item =>
                item.id === action.payload.id ? addNewShoe(action.payload.data) : item),
            }
        case 'DELETE_SHOE':
            return { shoes: state.shoes.filter(item => item.id !== action.payload.id),
            }
        default:
            return { shoes: state.shoes }
    }
}

function addNewShoe(formData: FormDataObj) {
    return new Shoe(formData.brand, 
                    formData.model, 
                    formData.color, 
                    formData.buyDate, 
                    formData.buyPrice, 
                    formData.sellPrice, 
                    formData.link)
}
