import { Navigate, Outlet } from 'react-router-dom'

const Public = () => {
  const user = true

  return !user ? (
    <div className="flex h-screen">
      <Outlet />
    </div>
  ) : (
    <Navigate replace to="/" />
  )
}

export default Public
