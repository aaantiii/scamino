import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../components/Form'
import Input from '../../components/Form/Input'
import { useAuth } from '../../components/AuthContext'
import Validator from '../../assets/validator'
import server from '../../assets/lang/server.json'
import validation from '../../assets/lang/validation.json'

export default function Login() {
  const [emailInput, setEmail] = useState(''),
        [passwordInput, setPassword] = useState(''),
        [error, setError] = useState(''),
        [loading, setLoading] = useState(false),
        { signIn, currentUser } = useAuth(),
        navigate = useNavigate()

  function handleAutoComplete() {
    setEmail(document.querySelector('#email-input').value)
    setPassword(document.querySelector('#password-input').value)
  }

  // onautocomplete wird im header von public/index.html importiert
  // Event wenn der Browser Inputs automatisch vervollständigt
  window.addEventListener('onautocomplete', handleAutoComplete)

  // Wenn der Benutzer eingeloggt ist, weiterleiten auf Startseite 
  useEffect(() => {
    if (currentUser)
      navigate('/')
      
    return () => window.removeEventListener('onautocomplete', handleAutoComplete)
  }, [currentUser, navigate])

  // Fehlermeldung bei jeder Eingabe aktualisieren
  useEffect(() => {
    if (!Validator.isValidEmail(emailInput))
      return setError(validation.default.invalidEmail)
    if (!Validator.isValidPassword(passwordInput))
      return setError(validation.default.invalidPassword)

    setError('')
  }, [emailInput, passwordInput])

  // Bei Klick auf Login Button wird diese Funktion ausgeführt
  async function handleLogin(e) {
    e.preventDefault()
    if (error) return
    
    setLoading(true)
    try {
      const res = await signIn(emailInput, passwordInput)
      if (!res.user) throw new Error()
    }
    catch(err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError(validation.default.emailNotFound)
          break
        case 'auth/wrong-password':
          setError(validation.login.wrongPassword)
          break
        default:
          setError(`${server.error.unknown} ${server.error.retry}`)
          break
      }
    }

    window.removeEventListener('onautocomplete', handleAutoComplete)
    setLoading(false)
  }
  
  return (
    <Form title="Login" submit="Anmelden" onSubmit={handleLogin} loading={loading}
          label={error && <label className="error">{error}</label>}>
      <Input id="email-input" key="email-input" placeholder="E-Mail" type="email"
             onChange={e => setEmail(e.target.value)} />
      <Input id="password-input" key="password-input" placeholder="Passwort" type="password"
             onChange={e => setPassword(e.target.value)} minLength={Validator.config.password.minLength}
             maxLength={Validator.config.password.maxLength} />
    </Form>
  )
}
