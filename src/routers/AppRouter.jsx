import { useSocket } from '../contexts/Socket'
import { DEVICE_LIST_PAGE_PATH } from '../constants/paths'
import ProviderList from '../pages/private/ProviderList'
import { NO_PATH, PROVIDER_LIST_PAGE_PATH } from '../constants/paths'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ADMIN_PAGE_PATH, HOLDING_LIST_PAGE_PATH } from '../constants/paths'
import { PROVIDER_MODIFY_PAGE_PATH } from '../constants/paths'
import ProviderModify from '../pages/private/ProviderModify'
import { DASHBOARD_PAGE_PATH } from '../constants/paths'
import HoldingList from '../pages/private/HoldingList'
import DeviceList from '../pages/private/DeviceList'
import Dashboard from '../pages/public/Dashboard'
import Admin from '../pages/private/Admin'
import Private from '../guards/Private'

const AppRouter = () => {
  const { socket, isConnected } = useSocket()

  const router = createBrowserRouter([
    {
      path: DASHBOARD_PAGE_PATH,
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
              path: HOLDING_LIST_PAGE_PATH,
              element: <HoldingList />
            },
            {
              path: PROVIDER_LIST_PAGE_PATH,
              element: <ProviderList />
            },
            {
              path: DEVICE_LIST_PAGE_PATH,
              element: <DeviceList />
            },
            {
              path: PROVIDER_MODIFY_PAGE_PATH,
              element: <ProviderModify />
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
