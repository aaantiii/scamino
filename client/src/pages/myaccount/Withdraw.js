import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Axios from 'axios'
import Form from '../../components/Form'
import Select from '../../components/Form/Select'
import { useAuth } from '../../components/AuthContext'
import { paymentMethodInputs, MoneyAmountInput } from './Inputs'
import Validator from '../../assets/validator'
import myaccount from '../../assets/lang/pages/myaccount.json'

export default function Withdraw() {
  const [paymentMethod, setPaymentMethod] = useState(),
        [withdrawalAmount, setWithdrawalAmount] = useState(),
        [error, setError] = useState(''),
        [loading, setLoading] = useState(false),
        [disabled, setDisabled] = useState(false),
        { userInfo, refreshUserInfo } = useAuth(),
        [searchParams, setSearchParams] = useSearchParams()

  // Wenn das Guthaben unter der Mindestauszahlung von 10 Eur liegt direkt Fehler anzeigen
  useEffect(() => {
    if (!userInfo || userInfo.balance >= 10)
      return setDisabled(false)
      
    setError(myaccount.transaction.withdraw.error.balanceUnderMinimum)
    setDisabled(true)
  }, [userInfo])

  // Funktion wird nach drücken des Auszahlen Buttons ausgeführt
  function handleWithdraw(e) {
    e.preventDefault()
    setError('')

    const emailInput = document.querySelector('#email') 

    // Input validieren
    if (!paymentMethod)
      return setError(myaccount.transaction.error.noPaymentMethodSelected)
    if (!Validator.isValidTransactionAmount(withdrawalAmount))
      return setError(myaccount.transaction.error.invalidAmount)
    if (withdrawalAmount > userInfo.balance)
      return setError(myaccount.transaction.withdraw.error.notEnoughBalance)
    if (!document.querySelector('form').checkValidity())
      return setError(myaccount.transaction.error.fillRequiredFields)
    if (emailInput && !Validator.isValidEmail(emailInput.value))
      return setError(myaccount.transaction.error.invalidEmail)

    setLoading(true)

    // Künstliche Verzögerung erzeugen um Auszahlung zu simulieren
    // Transaktionsdaten an Backend schicken
    setTimeout(() => {
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/transactions/withdraw`, {
        amount: parseFloat(withdrawalAmount),
        userId: userInfo.id,
        method: paymentMethod
      })
      .then(res => {
        const { success } = res.data
        setLoading(false)

        if (!success)
          return setError(myaccount.transaction.error.invalidResponse)
          
        refreshUserInfo()
        document.querySelectorAll('form>input').forEach(input => input.value = '')
        
        searchParams.append('dialog', 'withdraw-success')
        setSearchParams(searchParams)
      })
    }, 1000)
  }

  return (
    <Form title="Auszahlung" onSubmit={handleWithdraw} submit="Auszahlen" loading={loading}
          disabled={disabled} label={(error && <label className="error">{error}</label>)}>
      <MoneyAmountInput type="withdraw" onChange={(e) => setWithdrawalAmount(e.target.value)} />
      <Select onChange={(e) => setPaymentMethod(e.target.value)}
              options={Object.keys(paymentMethodInputs)}
              default="Zahlungsmethode wählen"
              style={{ height: '2.5em' }} />
      {paymentMethod && (paymentMethodInputs[paymentMethod].withdraw || paymentMethodInputs[paymentMethod].default)}
    </Form>
  )
}
