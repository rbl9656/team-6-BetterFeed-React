import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export const RouteGuard = ({ children }) => {
  const { user, initialized } = useAuthStore()
  const location = useLocation()

  if (!initialized) {
    return (
      <div className="bf-fullscreen-message">
        Loading experience…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
