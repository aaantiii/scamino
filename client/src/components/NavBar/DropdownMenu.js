import './style.css'
import { useEffect, useState } from 'react'
import components from '../../assets/lang/components.json'

export function DropdownButton(props) {
  const [open, setOpen] = useState(false)

  // Wenn in anderen Bereich als auf Menü geklickt, Menü schließen
  window.addEventListener('mouseup', e => {
    if (!e.target.getAttribute('menupart'))
      setOpen(false)
  })

  // Drehe Icon wenn Open State sich ändert
  useEffect(() => {
    const icon = document.querySelector('#menu-button>i')
    open 
      ? icon.classList.add('point-up')
      : icon.classList.remove('point-up')   
  }, [open])

  return (
    <>
      <button key="menu-button" id="menu-button" menupart="true" onClick={() => setOpen(!open)}>
        <i className="fa-solid fa-caret-down" menupart="true" />
      </button>
      {open && props.children}
    </>
  )
}

export default function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <a className="dropdown-item" menupart="true" href={props.href}>
        <i className={props.icon} menupart="true" />
        {props.children}
      </a>
    )
  }

  let keyVal = .6942018
  return (
    <div id="dropdown" menupart="true">
      {components.dropdownMenu.items.map(item =>
        <DropdownItem key={keyVal++} icon={item.icon} href={item.link}>{item.text}</DropdownItem>)}
    </div>
  )
}
