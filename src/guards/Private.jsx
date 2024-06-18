import AppSidebar from '../components/AppSidebar'
import { DASHBOARD_PAGE_PATH } from '../constants/paths'
import { Navigate, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

const Private = () => {
  const { isUserValid } = useAuth()
  const { pathname } = useLocation()

  return isUserValid ? (
    <div className="flex flex-col md:flex-row h-max">
      <AppSidebar />
      <Outlet />
    </div>
  ) : pathname === DASHBOARD_PAGE_PATH ? (
    <Outlet />
  ) : (
    <Navigate replace to={DASHBOARD_PAGE_PATH} />
  )
}

export default Private
