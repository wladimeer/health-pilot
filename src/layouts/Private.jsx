import AppSidebar from '../components/AppSidebar'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
  const user = true

  return user ? (
    <div className="flex h-screen">
      <AppSidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate replace to="/" />
  )
}

export default Private
