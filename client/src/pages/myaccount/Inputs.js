import Input from '../../components/Form/Input'
import { useAuth } from '../../components/AuthContext'
import { useEffect, useState } from 'react'

// Inputfelder für die verschiendene Zahlungsmethoden
// Pattern von stackoverflow & w3
const
inputName = <Input id="name" key="name" placeholder="Vollständiger Name"
                   type="text" pattern="^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$" />,

inputEmail = <Input id="email" key="email" type="email" placeholder="E-Mail" />,

inputNumber = <Input id="number" key="number" placeholder="Nummer" type="text"
                     maxLength="19" inputmode="numeric" pattern="^([0-9 ]){19}$"
                     onChange={(e) => { allowNumbersOnly(e); splitNumberInput(e); }} />,

inputCVV = <Input id="cvv" key="cvv" onChange={allowNumbersOnly} placeholder="CVV" type="text"
                  inputmode="numeric" maxLength="3" pattern="^\d{3}$" />,

inputPin = <Input id="pin" key="pin" onChange={allowNumbersOnly} placeholder="PIN" type="text"
                  inputmode="numeric" maxLength="6" pattern="^\d{6}$" />

// Funktion um nur Zahlen als Eingabe zu erlauben
function allowNumbersOnly(e) {
  const value = e.target.value.split('')
  const valueNumbersOnly = []

  value.forEach(char => {
    if (!isNaN(char)) valueNumbersOnly.push(char)
  })
  e.target.value = valueNumbersOnly.join('')
}

//Zahlen in 4er Blöcke aufteilen
function splitNumberInput(e) {
  const value = e.target.value.split(' ').join('')
  if (!value || value.length < 4) return

  const splittedPairs = []
  for (let i = 0; i < value.length; i += 4) {
    splittedPairs.push(value.substring(i, i + 4))
  }
  e.target.value = splittedPairs.join(' ')
}

export function MoneyAmountInput(props) {
  const [max, setMax] = useState(10000)
  const { userInfo } = useAuth()

  useEffect(() => {
    if (userInfo && props.type === 'withdraw')
      setMax(userInfo.balance)
  }, [userInfo, setMax, props.type])

  return <Input placeholder="Betrag (EUR)"
                id="amount"
                type="number"
                step=".01"
                pattern="^\d*(\.\d{0,2})?$"
                inputmode="numeric"
                min="10" max={max > 10000 ? 10000 : max}
                onChange={props.onChange} />
}

// Dictionary für Inputfelder der entsprechenden Zahlungsmethoden
export const paymentMethodInputs = {
  'Visa | Mastercard': {
    default: [
      inputName,
      inputNumber,
      inputCVV
    ]
  },
  'Neteller': {
    withdraw: [
      inputEmail
    ],
    deposit: [
      inputEmail,
      inputPin
    ]
  },
  'Skrill': {
    withdraw: [
      inputEmail
    ],
    deposit: [
      inputEmail,
      inputPin
    ]
  },
  'EPS-Überweisung': {
    default: [
      inputName,
      <Input id="iban" placeholder="IBAN" type="text" key="iban" minLength="20" maxLength="36" />
    ]
  },
  'Paysafe': {
    withdraw: [
      inputEmail
    ],
    deposit: [
      inputNumber
    ]
  }
}