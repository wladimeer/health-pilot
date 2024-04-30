import { useSocket } from '../contexts/Socket'
import { DEVICE_PAGE_PATH } from '../constants/paths'
import ProviderList from '../pages/private/ProviderList'
import { NO_PATH, PROVIDER_PAGE_PATH } from '../constants/paths'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ADMIN_PAGE_PATH, HOLDING_PAGE_PATH } from '../constants/paths'
import { DASHBOARD_PAGE_PATH } from '../constants/paths'
import HoldingList from '../pages/private/HoldingList'
import DeviceList from '../pages/private/DeviceList'
import Dashboard from '../pages/private/Dashboard'
import Admin from '../pages/private/Admin'
import Private from '../guards/Private'

const AppRouter = () => {
  const { socket, isConnected } = useSocket()

  const router = createBrowserRouter([
    {
      path: DASHBOARD_PAGE_PATH,
      element: <Dashboard {...{ socket, isConnected }} />,
      index: true
    },
    {
      path: ADMIN_PAGE_PATH,
      children: [
        {
          path: NO_PATH,
          element: (
            <Private>
              <Admin />
            </Private>
          ),
          index: true
        },
        {
          path: HOLDING_PAGE_PATH,
          element: (
            <Private>
              <HoldingList />
            </Private>
          )
        },
        {
          path: PROVIDER_PAGE_PATH,
          element: (
            <Private>
              <ProviderList />
            </Private>
          )
        },
        {
          path: DEVICE_PAGE_PATH,
          element: (
            <Private>
              <DeviceList />
            </Private>
          )
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
