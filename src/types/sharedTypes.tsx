export class Profile {
    totalValues: number[]
    shoeCollection: Shoe[]

    constructor(totalValues: number[], shoeCollection: Shoe[]) {
        this.totalValues = totalValues
        this.shoeCollection = shoeCollection
    }
}

export class Shoe {
    name: string
    color: string
    buyDate: Date
    buyPrice: number
    sellPrice: number
    profit: number

    constructor(name: string, color: string, buyDate: Date, buyPrice: number, sellPrice: number) {
        this.name = name
        this.color = color
        this.buyDate = buyDate
        this.buyPrice = buyPrice
        this.sellPrice = sellPrice
        this.profit = this.sellPrice - this.buyPrice
    }
}