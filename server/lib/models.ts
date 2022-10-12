namespace Scamino {
  export enum Country {
    Austria = 'Österreich',
    Germany = 'Deutschland',
    Switzerland = 'Schweiz'
  }

  export type User = {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    country?: Country
    street?: string
    zip?: number
    city?: string
    balance?: number
    firebaseId?: string
    phone?: string
  }
  
  export enum PaymentMethod {
    VisaMastercard = 'Visa | Mastercard',
    Paysafe = 'Paysafe',
    Skrill = 'Skrill',
    Neteller = 'Neteller',
    EPS = 'EPS-Überweisung'
  }
  
  export enum TransactionType {
    Deposit = 'deposit',
    Withdrawal = 'withdrawal'
  }
  
  export type Transaction = {
    id?: number
    userId?: number
    amount?: number
    method?: PaymentMethod
    date?: Date
    dateString?: string
    type?: TransactionType
  }

  export type Game = {
    id?: number
    name?: string
    providerName?: string
    image?: number
  }
  
  export type RouletteBet = {
    id?: number
    userId?: number
    amount?: number
    win?: number
    roll?: number
    tips?: string
    date?: Date
    dateString?: string
  }
}

export default Scamino
