import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { auth } from '../assets/firebase'
import Axios from 'axios'
import LoadingScreen from './LoadingScreen'

const AuthContext = createContext()

// Funktion um in anderen Modulen AuthContext zu verwenden
export function useAuth() {
  return useContext(AuthContext)
}

// JSX Element für alles mit Authentifizierung
// Children sind alle Elemente innerhalb von AuthProvider-Tag und
// nur diese haben Zugriff mit useAuth() auf die aktuelle Session
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(),
        [userInfo, setUserInfo] = useState(),
        [loading, setLoading] = useState(true)

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  
  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signOut() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  // Userobjekt neu bei Backend anfordern
  function refreshUserInfo() {
    if (!currentUser) return setUserInfo()
    
    return Axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/getorcreate`, { 
      firebaseId: currentUser.uid,
      email: currentUser.email
    })
    .then(res => {
      if (res.data)
        setUserInfo(res.data)
    })
    .catch(() => setUserInfo())
  }

  // Balance clientseitig temporär verändern bis userInfo wieder aktualisiert wird
  function refreshUserBalance(newBalance) {
    userInfo.balance = newBalance
    setUserInfo(userInfo)
  }

  // Wenn sich der Authentifizierungs Status geändert hat, setzte currentUser
  // und fordere die userInfo vom Backend an
  const getUserInfo = useCallback(refreshUserInfo, [currentUser])
  useEffect(() => {
    const unsubscribeFunc = auth.onAuthStateChanged(async firebaseUser => {
      setCurrentUser(firebaseUser)
      await getUserInfo()
      setLoading(false)
    })
    return unsubscribeFunc
  }, [getUserInfo])

  const exports = {
    currentUser,
    userInfo,
    loading,
    refreshUserInfo,
    refreshUserBalance,
    signUp,
    signIn,
    signOut,
    resetPassword
  }

  return (
    <AuthContext.Provider value={exports}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  )
}
