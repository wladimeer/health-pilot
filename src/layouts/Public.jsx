import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

const Public = () => {
  const { isUserValid } = useAuth()

  return !isUserValid ? (
    <div className="flex h-screen">
      <Outlet />
    </div>
  ) : (
    <Navigate replace to="/" />
  )
}

export default Public
