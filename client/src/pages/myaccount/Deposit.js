import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Axios from 'axios'
import Form from '../../components/Form'
import Select from '../../components/Form/Select'
import { useAuth } from '../../components/AuthContext'
import { MoneyAmountInput, paymentMethodInputs } from './Inputs'
import Validator from '../../assets/validator'
import myaccount from '../../assets/lang/pages/myaccount.json'

export default function Deposit() {
  const [loading, setLoading] = useState(false),
        [paymentMethod, setPaymentMethod] = useState(),
        [depositAmount, setDepositAmount] = useState(),
        [error, setError] = useState(''),
        { userInfo, refreshUserInfo } = useAuth(),
        [searchParams, setSearchParams] = useSearchParams()

  //Wenn auf Button Einzahlen geklickt wird diese Funktion ausgeführt
  function handleDeposit(e) {
    e.preventDefault()
    setError('')

    const emailInput = document.querySelector('#email') 

    if (!paymentMethod)
      return setError(myaccount.transaction.error.noPaymentMethodSelected)
    if (!Validator.isValidTransactionAmount(depositAmount))
      return setError(myaccount.transaction.error.invalidAmount)
    if (emailInput && !Validator.isValidEmail(emailInput.value))
      return setError(myaccount.transaction.error.invalidEmail)
    if (!document.querySelector('form').checkValidity())
      return setError(myaccount.transaction.error.fillRequiredFields)

    // Künstliche Verzögerung erzeugen um Einzahlung zu simulieren
    // & Transaktionsdaten an Backend schicken
    setLoading(true)  
    setTimeout(() => {
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/transactions/deposit`, {
        userId: userInfo.id,
        amount: parseFloat(depositAmount),
        method: paymentMethod
      })
      .then(res => {
        setLoading(false)
        const { success } = res.data

        if (!success)
          return setError(myaccount.transaction.error.rejected)
        
        document.querySelectorAll('form>input').forEach(input => input.value = '')

        searchParams.append('dialog', 'deposit-success')
        setSearchParams(searchParams)

        refreshUserInfo()
      })
      .catch(() => setError(myaccount.transaction.error.timeout))
    }, 2000)
  }

  return (
    <Form title="Einzahlung" onSubmit={handleDeposit} submit="Einzahlen"
          loading={loading} label={(error && <label className="error">{error}</label>)}>
      <MoneyAmountInput type="deposit" onChange={(e) => setDepositAmount(e.target.value)} />
      <Select onChange={(e) => setPaymentMethod(e.target.value)}
              options={Object.keys(paymentMethodInputs)}
              default="Zahlungsmethode wählen"
              style={{ height: '2.5em' }} />
      {paymentMethod && (paymentMethodInputs[paymentMethod].deposit || paymentMethodInputs[paymentMethod].default)}
    </Form>
  )
}
