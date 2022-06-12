import { useAuth } from '../../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Logout() {
  const navigate = useNavigate()
  const { currentUser, signOut } = useAuth()

  useEffect(() => {
    async function handleLogout() {
      try {
        await signOut()
      }
      catch {
        return navigate('/')
      }
      
      navigate('/auth/login')
    }

    if (currentUser)
      handleLogout()
    else
      navigate('/')  
  }, [currentUser, signOut, navigate])

  return (
    <h1>Abmeldung wird durchgeführt...</h1>
  )
}
