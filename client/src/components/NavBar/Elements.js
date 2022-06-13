import { useEffect } from 'react'
import { useAuth } from '../AuthContext'
import DropdownMenu, { DropdownButton } from './DropdownMenu'

export default function Elements() {
  const { currentUser, userInfo } = useAuth()

  // Wenn UserInfo geändert wird balance aktualisieren
  useEffect(() => {
    const balanceLabel = document.querySelector('#balance-label')
    if (balanceLabel && userInfo) {
      balanceLabel.innerHTML = userInfo.balance.toFixed(2) + ' EUR'
    } 
      
  }, [userInfo])

  // Wenn Benutzer angemeldet ist Menü und Guthaben anzeigen
  if (currentUser) {
    return [
      <DropdownButton key="dropdown"><DropdownMenu/></DropdownButton>,
      <div key="balance-div" id="balance-div"><label id="balance-label"></label></div>
    ]
  }
  
  // Sonst Login und Registrieren Button anzeigen
  return [
    <div key="login-button" className="auth-button"><a id="login-button" href="/auth/login">Login</a></div>,
    <div key="register-button" className="auth-button"><a id="register-button" href="/auth/register">Registrieren</a></div>
  ]
}

