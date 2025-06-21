import { v4 as uuidv4 } from 'uuid';

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
    id: string

    brand: string
    model: string
    color: string
    buyDate: string
    buyPrice: string
    sellPrice: string
    profit: string
    link: string
    domain: string

    constructor(brand: string, model: string, color: string, buyDate: string, buyPrice: number, sellPrice: number, link: string) {
        this.id = uuidv4();
        
        const formattedBuyPrice = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD'}).format(buyPrice);
        const formattedSellPrice = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD'}).format(sellPrice);
        const formattedProfit = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD'}).format(sellPrice - buyPrice);

        this.brand = brand
        this.model = model
        this.color = color
        this.buyDate = buyDate
        this.buyPrice = formattedBuyPrice
        this.sellPrice = formattedSellPrice
        this.profit = formattedProfit
        this.link = link
        this.domain = getDomainFromUrl(link)
    }
}

function getDomainFromUrl(url_string: string): string {
  try {
    const url = new URL(url_string);
    return url.hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return "Link";
  }
}

export interface FormDataObj {
    brand: string,
    model: string,
    color: string,
    buyDate: string,
    buyPrice: number,
    sellPrice: number,
    link: string
}

export interface State {
    shoes: Shoe[]
}

export type Action = 
    { type: 'ADD_SHOE'; payload: FormDataObj }
  | { type: 'EDIT_SHOE'; payload: {id: string, data: FormDataObj} }
  | { type: 'DELETE_SHOE'; payload: string }