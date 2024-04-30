import Private from '../layouts/Private'
import { useSocket } from '../contexts/Socket'
import ProviderList from '../pages/private/ProviderList'
import { NO_PATH, PROVIDER_PAGE_PATH } from '../constants/paths'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ADMIN_PAGE_PATH, HOLDING_PAGE_PATH } from '../constants/paths'
import { LOGIN_PAGE_PATH, DEVICE_PAGE_PATH } from '../constants/paths'
import { PRIVATE_PATH, PUBLIC_PATH } from '../constants/paths'
import HoldingList from '../pages/private/HoldingList'
import DeviceList from '../pages/private/DeviceList'
import Dashboard from '../pages/private/Dashboard'
import Admin from '../pages/private/Admin'
import Public from '../layouts/Public'

const AppRouter = () => {
  const { socket, isConnected } = useSocket()

  const router = createBrowserRouter([
    {
      path: PRIVATE_PATH,
      element: <Private />,
      children: [
        {
          path: NO_PATH,
          element: <Dashboard {...{ socket, isConnected }} />,
          index: true
        },
        {
          path: ADMIN_PAGE_PATH,
          children: [
            {
              path: NO_PATH,
              element: <Admin />,
              index: true
            },
            {
              path: HOLDING_PAGE_PATH,
              element: <HoldingList />
            },
            {
              path: PROVIDER_PAGE_PATH,
              element: <ProviderList />
            },
            {
              path: DEVICE_PAGE_PATH,
              element: <DeviceList />
            }
          ]
        }
      ]
    },
    {
      path: PUBLIC_PATH,
      element: <Public />,
      children: [
        {
          path: NO_PATH,
          element: <Dashboard {...{ socket, isConnected }} />,
          index: true
        },
        {
          path: LOGIN_PAGE_PATH,
          element: <Login />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
