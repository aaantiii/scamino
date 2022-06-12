import Form from '../../components/Form'
import Input from '../../components/Form/Input'
import { useState, useEffect } from 'react'
import { useAuth } from '../../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import Validator from '../../assets/validator'
import validation from '../../assets/lang/validation.json'
import server from '../../assets/lang/server.json'

export default function Forgot() {
  const [emailInput, setEmail] = useState(''),
        [error, setError] = useState(''),
        [message, setMessage] = useState(''),
        [loading, setLoading] = useState(false),
        { resetPassword, currentUser } = useAuth(),
        navigate = useNavigate()

  //Event onautocomplete wird im header von public/index.html importiert
  window.addEventListener('onautocomplete', () => {
    setEmail(document.querySelector('#email-input').value)
  })

  //Wenn der Benutzer angemeldet ist soll er diese Seite nicht sehen können
  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  //Wird bei Click auf Zurücksetzen button ausgeführt
  async function handleReset() {
    const email = emailInput
    if (!Validator.isValidEmail(email))
      return setError(validation.default.invalidEmail)

    setError('')
    setMessage('')
    setLoading(true)
    try {
      await resetPassword(email)
      setMessage(validation.forgot.emailSent)
    }
    catch {
      setError(`${server.error.unknown} ${server.error.retry}`)
    }
    setLoading(false)
  }
  
  return (
    <Form title="Passwort vergessen" submit="Passwort zurücksetzen" onSubmit={handleReset}
          loading={loading} label={(error && <label class="error">{error}</label>) ||
                                   (message && <label class="success">{message}</label>)}>
      <Input id="email-input" key="email-input" placeholder="E-Mail" type="email" onChange={e => setEmail(e.target.value)} />
    </Form>
  )
}
