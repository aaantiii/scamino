import './style.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import components from '../../assets/lang/components.json'

export default function Dialog() {
  const [searchParams, setSearchParams] = useSearchParams(),
        [content, setContent] = useState()

  // Wenn Suchparameter geändert werden setze den dialog type
  useEffect(() => {
    setContent(components.dialog.types[searchParams.get('dialog')])
  }, [searchParams])

  // Wenn sich der Content des Dialogs ändert Dialog anzeigen
  useEffect(() => {
    if (!content) return

    document.querySelector('body').style.overflow = 'hidden'
    document.querySelector('dialog').showModal()
  }, [content])

  function closeDialog() {
    searchParams.delete('dialog')
    setSearchParams(searchParams)

    document.querySelector('dialog').close()
    document.querySelector('body').style.overflow = 'auto'
  }

  if (!content)
    return <></>

  return (
    <div className="green-white-gradient">
      <dialog>
        <h4>{content.title}</h4>
        <p>{content.text}</p>
        <button onClick={closeDialog}>OK</button>
      </dialog>
    </div>
  )
}
