export class Profile {
    totalValues: ValueEntry[]
    shoeCollection: Shoe[]

    constructor(totalValues: ValueEntry[], shoeCollection: Shoe[]) {
        this.totalValues = totalValues
        this.shoeCollection = shoeCollection
    }
}

export class ValueEntry {
    value: number
    date: string

    constructor(value: number, date: Date) {
        this.value = value
        this.date = date.toLocaleDateString()
    }
}

export class Shoe {
    name: string
    color: string
    buyDate: string
    buyPrice: string
    sellPrice: string
    profit: string

    constructor(name: string, color: string, buyDate: Date, buyPrice: number, sellPrice: number) {
        const formattedBuyPrice = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD'}).format(buyPrice);
        const formattedSellPrice = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD'}).format(sellPrice);
        const formattedProfit = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD'}).format(sellPrice - buyPrice);

        this.name = name
        this.color = color
        this.buyDate = buyDate.toLocaleDateString()
        this.buyPrice = formattedBuyPrice
        this.sellPrice = formattedSellPrice
        this.profit = formattedProfit
    }
}