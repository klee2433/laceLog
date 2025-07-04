import { v4 as uuidv4 } from 'uuid';
import { numberToPrice } from './util';

export class ValueEntry {
    value: number
    date: string

    constructor(value: number, date: string) {
        this.value = value
        this.date = date
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

        this.brand = brand
        this.model = model
        this.color = color
        this.buyDate = buyDate
        this.buyPrice = numberToPrice(buyPrice)
        this.sellPrice = numberToPrice(sellPrice)
        this.profit = numberToPrice(sellPrice - buyPrice)
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

export class ValueStats {
    totalProfit: string
    newShoesMonth: string
    newShoesYear: string

    constructor (totalProfit: number, newShoesMonth: number, newShoesYear: number) {
        this.totalProfit = numberToPrice(totalProfit)
        this.newShoesMonth = newShoesMonth.toString()
        this.newShoesYear = newShoesYear.toString()
    }
}