import './Input.css'

export default function Input(props) {
  return (
    <input minLength={props.minLength}
           maxLength={props.maxLength}
           style={{ height: props.height }}
           placeholder={props.placeholder}
           id={props.id}
           type={props.type}
           onChange={props.onChange}
           step={props.step}
           pattern={props.pattern}
           inputMode={props.inputmode}
           min={props.min}
           max={props.max}
           disabled={props.disabled}
           required />
  )
}

Input.defaultProps = {
  placeholder: 'Eingabe',
  type: 'text',
  height: '2.5em',
  minLength: 1,
  maxLength: 200
}
