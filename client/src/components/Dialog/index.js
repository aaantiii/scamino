import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import components from '../../assets/lang/components.json'
import './style.css'

export default function Dialog() {
  const [searchParams, setSearchParams] = useSearchParams(),
        [content, setContent] = useState()

  // Wenn Suchparameter geändert werden setze den dialog type
  useEffect(() => {
    setContent(components.dialog.types[searchParams.get('dialog')])
  }, [searchParams])

  //Wenn sich der Content des Dialogs ändert Dialog anzeigen
  useEffect(() => {
    const dialog = document.querySelector('dialog')
    
    if (dialog) {
      document.querySelector('body').style.overflow = 'hidden'
      dialog.showModal()
    }
  }, [content])

  function closeDialog() {
    document.querySelector('dialog').close()

    // Scrollen aktivieren
    document.querySelector('body').style.overflow = 'auto'

    // Parameter aus URL entfernen
    searchParams.delete('dialog')
    setSearchParams(searchParams)
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
