import { useEffect, useState } from 'react'
import './style.css'

export default function Form(props) {
  const [buttonText, setButtonText] = useState('')

  //Wenn die Form lädt soll der Button den Text Laden... haben
  useEffect(() => {
    if (props.loading)
      setButtonText('Laden...')
    else
      setButtonText(props.submit)
  }, [buttonText, setButtonText, props.loading, props.submit])

  return (
    <div id="form-center">
      <form style={{height: props.height}}>
        <h1>{props.title}</h1>
        {props.children}
        {props.label}
        <button type="submit" disabled={props.loading || props.disabled} onClick={props.onSubmit}>{buttonText}</button>
      </form>
    </div>
  )
}

Form.defaultProps = {
  title: 'Daten eingeben',
  height: '550px !important',
  elements: <p>Fehler: Leeres Formular</p>,
  submit: 'Abschicken',
  loading: false,
  label: <label id="msg-label"></label>
}
