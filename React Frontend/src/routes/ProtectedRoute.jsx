import { Navigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

// UI-only route guard — checks mock auth state, not real backend
export default function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, role } = useAppStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={`/${role}`} replace />
  }

  return children
}
