import './Contact.css'
import Form from '../../components/Form'
import Input from '../../components/Form/Input'

export default function Contact() {
  return (
    <Form title="Kontakt">
      <Input placeholder="E-Mail" type="email" />
      <textarea id="contact-message" placeholder="Nachricht eingeben..." minLength="40" maxLength="500"></textarea>
    </Form>
  )
}
