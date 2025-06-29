import { Shoe, ValueEntry, ValueStats } from './sharedTypes'
import type { FormDataObj, State, Action } from './sharedTypes'
import { NUM_DATAPOINTS } from './constants'

export function reducer(state: State, action: Action): State {
    switch(action.type) {
        case 'ADD_SHOE':
            return { shoes: [...state.shoes, addNewShoe(action.payload)] }
        case 'EDIT_SHOE':
            return { shoes: state.shoes.map(item =>
                item.id === action.payload.id ? addNewShoe(action.payload.data) : item),
            }
        case 'DELETE_SHOE':
            return { shoes: state.shoes.filter(item => item.id !== action.payload),
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

export function recalculateDailyValues(
    dailyValues: ValueEntry[], 
    setDailyValues: (dailyValues: ValueEntry[]) => void, 
    oldSellPrice: number, 
    newSellPrice: number
){
    const lastEntry: ValueEntry | null = dailyValues.length > 0 ? dailyValues[dailyValues.length - 1] : null
    
    const todaysDate: string = new Date().toDateString()
    const todaysEntryExists: boolean = lastEntry !== null && lastEntry.date === todaysDate

    const newValue: number = lastEntry !== null ? lastEntry.value - oldSellPrice + newSellPrice : newSellPrice
    const newEntry: ValueEntry = new ValueEntry(newValue, todaysDate)

    if (todaysEntryExists) {
        setDailyValues([...dailyValues.slice(0, -1), newEntry])
    } else {
        setDailyValues([...dailyValues, newEntry])
    }

}

export function priceToNumber(price: string): number {
    return Number(price.replace(/[$,]+/g,""))
}

export function numberToPrice(num: number): string {
    return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD'}).format(num)
}

export function runStats(
    dailyValues: ValueEntry[], 
    setDailyValues: (dailyValues: ValueEntry[]) => void,
    shoes: Shoe[]
){
    if (dailyValues.length > NUM_DATAPOINTS) {
        setDailyValues(dailyValues.slice(-NUM_DATAPOINTS))
    }

    const totalProfit = shoes.reduce((totalProfit: number, shoe: Shoe) => {
        return totalProfit + priceToNumber(shoe.profit)
    }, 0)

    const currYear: number = new Date().getFullYear()
    const shoesYear: Shoe[] = shoes.filter(shoe => new Date (Date.parse(shoe.buyDate)).getFullYear() === currYear )
    const currMonth: number = new Date().getMonth()
    const shoesMonth: Shoe[] = shoesYear.filter(shoe => new Date (Date.parse(shoe.buyDate)).getMonth() === currMonth)

    return new ValueStats(totalProfit, shoesMonth.length, shoesYear.length)
}