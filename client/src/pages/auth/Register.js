import Form from '../../components/Form'
import { useEffect, useState } from 'react'
import Input from '../../components/Form/Input'
import { useAuth } from '../../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import Validator from '../../assets/validator'
import validation from '../../assets/lang/validation.json'
import server from '../../assets/lang/server.json'

export default function Register() {
  const [emailInput, setEmail] =  useState(''),
        [passwordInput, setPassword] = useState(''),
        [passwordRepeatInput, setPasswordRepeat] = useState(''),
        [error, setError] = useState(''),
        [loading, setLoading] = useState(false),
        { signUp, currentUser } = useAuth(),
        navigate = useNavigate()

  // Wenn Benutzer eingeloggt dann auf Startseite weiterleiten
  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  // Fehlermeldung bei jeder Eingabe aktualisieren
  useEffect(() => {
    const email = emailInput,
          password = passwordInput,
          passwordRepeat = passwordRepeatInput

    if (!Validator.isValidEmail(email))
      return setError(validation.default.invalidEmail)
    if (!Validator.isValidPassword(password))
      return setError(validation.default.invalidPassword)
    if (password !== passwordRepeat)
      return setError(validation.register.passwordsNotMatch)
    
    setError('')
  }, [emailInput, passwordInput, passwordRepeatInput, setError])

  // Wird beim drücken des Registrieren Buttons ausgeführt
  async function handleRegister(e) {
    e.preventDefault()
    if (error) return

    setLoading(true)
    try {
      await signUp(emailInput, passwordInput)
    }
    catch(err) {
      if (err.code === 'auth/email-already-in-use')
        setError(validation.register.userAlreadyExists)
      else
        setError(`${server.error.unknown} ${server.error.retry}`)
    }
    setLoading(false)
  }

  return (
    <Form onSubmit={handleRegister} submit="Registrieren" loading={loading} title="Registrierung"
          label={error && <label className="error">{error}</label>}>
      <Input key="email-input" placeholder="E-Mail" id="email" type="email" onChange={(e) => {setEmail(e.target.value)}} />
      <Input key="password-input" minLength={Validator.config.password.minLength} maxLength={Validator.config.password.maxLength}
             placeholder="Passwort" type="password" id="password" onChange={(e) => {setPassword(e.target.value)}} />
      <Input key="password-repeat-input"  id="repeat-password"  placeholder="Passwort wiederholen" type="password" 
             maxLength={Validator.config.password.maxLength} minLength={Validator.config.password.minLength}
             onChange={e => setPasswordRepeat(e.target.value)} />
    </Form>
  )
}
