import AppSidebar from '../components/AppSidebar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

const Private = () => {
  const { isUserValid } = useAuth()

  return isUserValid ? (
    <div className="flex h-screen">
      <AppSidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate replace to="/public" />
  )
}

export default Private
