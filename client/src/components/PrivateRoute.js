import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

// JSX Element für alle Seiten, welche nur durch 
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  return (
    currentUser ? children : <Navigate to="/auth/login" />
  )
}
