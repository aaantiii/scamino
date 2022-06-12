import './AccountSettings.css'
import Axios from 'axios'
import { useDeferredValue, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Validator from '../../../assets/validator'
import { useAuth } from '../../../components/AuthContext'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'
import myaccount from '../../../assets/lang/pages/myaccount.json'
import server from '../../../assets/lang/server.json'

const getInput = {
  'firstName': () => document.querySelector('#firstName'),
  'lastName': () => document.querySelector('#lastName'),
  'email': () => document.querySelector('#email'),
  'phone': () => document.querySelector('#phone'),
  'street': () => document.querySelector('#street'),
  'country': () => document.querySelector('#country'),
  'zip': () => document.querySelector('#zip'),
  'city': () => document.querySelector('#city')
}

const defaultThemeHex = getComputedStyle(document.documentElement).getPropertyValue('--default-green-hex')

export default function AccountSettings() {
  const { userInfo, refreshUserInfo } = useAuth(),
        [newUserInfo, setNewUserInfo] = useState(),
        newUserInfoDeferred = useDeferredValue(newUserInfo),
        [error, setError] = useState(''),
        [changeButtonDisabled, setChangeButtonDisabled] = useState(true),
        [selectedHexColor, setSelectedHexColor] = useState(),
        selectedHexColorDeferred = useDeferredValue(selectedHexColor),
        [searchParams, setSearchParams] = useSearchParams()
  
  // Bereits vorhandene Daten in Inputfelder einfügen
  useEffect(() => {
    if (!userInfo) return
    
    setNewUserInfo(userInfo)
    
    Object.keys(userInfo).forEach(key => {
      if (getInput[key] && userInfo[key])
        getInput[key]().value = userInfo[key]
    })

    // Falls User noch kein Land angeben hat Standardoption von <Select> beibehalten
    if (userInfo.country)
      getInput.country().value = userInfo.country
  }, [userInfo, setNewUserInfo])

  // Bei Benutzereingabe erneut validieren und entsprechende Fehlermeldung anzeigen
  useEffect(() => {
    if (!newUserInfoDeferred) return

    setError('')
    setChangeButtonDisabled(true)

    if (JSON.stringify(newUserInfoDeferred) === JSON.stringify(userInfo)) return

    const { firstName, lastName, phone, street, country, city, zip } = newUserInfoDeferred

    if (!Validator.isValidName(firstName, lastName))
      return setError(myaccount.personalData.error.invalidName)
    if (!Validator.isValidPhoneNumber(phone))
      return setError(myaccount.personalData.error.invalidPhone)
    if (!Validator.isValidStreet(street))
      return setError(myaccount.personalData.error.invalidStreet)
    if (!Validator.isValidCountry(country))
      return setError(myaccount.personalData.error.invalidCountry)
    if (!Validator.isValidCity(city))
      return setError(myaccount.personalData.error.invalidCity)
    if (!Validator.isValidZip(zip))
      return setError(myaccount.personalData.error.invalidZip)

    setChangeButtonDisabled(false)
  }, [newUserInfoDeferred, userInfo])

  // Bei Klick auf "Änderungen speichern"
  function handleChangeData() {
    if (error) return

    Axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/update`, { userInfo: newUserInfo })
    .then(res => {
      if (!res.data.success)
        return setError(server.error.write)
      
      refreshUserInfo()
      searchParams.append('dialog', 'change-success')
      setSearchParams(searchParams)
    })
    .catch(() => setError(server.error.write))
  }

  // input Farbe auf gespeichertes Theme setzen
  useEffect(() => {
    let themeHexColor = defaultThemeHex
    const storedHexColor = localStorage.getItem('theme-hex')

    if (storedHexColor)
      themeHexColor = storedHexColor

    setSelectedHexColor(themeHexColor)      
    document.querySelector('input[type="color"]').value = themeHexColor
  }, [])

  // Theme bei Änderung von inputHexColor speichern und updaten
  useEffect(() => {
    if (!selectedHexColorDeferred) return

    localStorage.setItem('theme-hex', selectedHexColorDeferred)
    window.refreshTheme()
  }, [selectedHexColorDeferred])

  function resetTheme() {
    const icon = document.querySelector('.reset-theme-button>i')
    const keyframes = [
      { transform: 'rotate(0deg) scaleX(-1)' },
      { transform: 'rotate(-360deg) scaleX(-1)' }
    ]
    icon.animate(keyframes, { easing: 'linear', duration: 200 })

    document.querySelector(':root').style.setProperty('--theme-rgb', 'var(--default-green-rgb')
    localStorage.removeItem('theme-hex')
    document.querySelector('input[type="color"]').value = defaultThemeHex
  }

  return (
    <div id="personal-data">
      <div className="form-container">
        <h2>Persönliche Daten</h2>
        <section className="input-row">
          <Input id="firstName" placeholder="Vorname" minLength={Validator.config.name.minLength} maxLength={Validator.config.name.maxLength}
                 onChange={(e) => setNewUserInfo({...newUserInfo, firstName: e.target.value})} />
          <Input id="lastName" placeholder="Nachname" minLength={Validator.config.name.minLength} maxLength={Validator.config.name.maxLength}
                 onChange={(e) => setNewUserInfo({...newUserInfo, lastName: e.target.value})} />
        </section>
        <section className="input-row">
          <Input id="email" type="email" disabled={true} placeholder="E-Mail" />
          <Input id="phone" type="tel" placeholder="Telefonnummer" pattern="^\+(?:[0-9]●?){8,15}[0-9]$" maxLength="16"
                 onChange={(e) => setNewUserInfo({...newUserInfo, phone: e.target.value})} />
        </section>
      </div>
      <div className="form-container">
        <h2>Deine Adresse</h2>
        <section className="input-row">
          <Input id="street" placeholder="Strasse und Hausnummer" pattern="^[ \-a-zA-Z.]+\s+(\d+(\s?\w$)?)" minLength="7" maxLength="50"
                 onChange={(e) => setNewUserInfo({...newUserInfo, street: e.target.value})} />
          <Select id="country" options={Validator.config.countries} default="Land auswählen"
                  style={{ height: '44px', width: '48%', paddingLeft: '20px', marginBottom: '20px' }}
                  onChange={(e) => setNewUserInfo({...newUserInfo, country: e.target.value})}/>
        </section>
        <section className="input-row">
          <Input id="city" placeholder="Stadt" onChange={(e) => setNewUserInfo({...newUserInfo, city: e.target.value})}
                 minLength={Validator.config.city.minLength} maxLength={Validator.config.city.maxLength} />
          <Input id="zip" placeholder="PLZ" minLength={Validator.config.zip.minLength} maxLength={Validator.config.zip.maxLength}
                 onChange={(e) => setNewUserInfo({...newUserInfo, zip: e.target.value})} inputmode="numeric" />
        </section>
      </div>
      <div id="form-footer">
        {error && <label className="error">{error}</label>}
        <button type="submit" onClick={handleChangeData} disabled={changeButtonDisabled}>Änderungen speichern</button>
      </div>
      <div id="page-settings">
        <h2>Personalisierung</h2>
        <div>
          <label htmlFor="color-picker">Akzentfarbe: </label>
          <input id="color-picker" type="color" onChange={(e) => setSelectedHexColor(e.target.value)} />
          <div className="reset-theme-button" onClick={resetTheme}>
            <i className="fa-solid fa-rotate-right" />
          </div>
        </div>
      </div>
    </div>
  )
}
