import './Select.css'

export default function Select(props) {
  return (
    <select id={props.id} style={props.style} key={props.default} placeholder={props.placeholder} onChange={props.onChange} defaultValue={props.default}>
      <option key="defaultOption" disabled={true} hidden={true}>{props.default}</option>
      {props.options.map(optn => <option value={optn} key={optn}>{optn}</option>)}
    </select>
  )
}

Select.defaultProps = {
  default: 'Auswählen'
}