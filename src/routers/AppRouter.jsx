import Private from '../layouts/Private'
import { useSocket } from '../contexts/Socket'
import ProviderList from '../pages/private/ProviderList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HoldingList from '../pages/private/HoldingList'
import DeviceList from '../pages/private/DeviceList'
import Dashboard from '../pages/private/Dashboard'
import Admin from '../pages/private/Admin'
import Public from '../layouts/Public'

const AppRouter = () => {
  const { socket, isConnected } = useSocket()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Private />,
      children: [
        {
          path: '',
          element: <Dashboard {...{ socket, isConnected }} />,
          index: true
        },
        {
          path: '/admin',
          children: [
            {
              path: '',
              element: <Admin />,
              index: true
            },
            {
              path: '/admin/holding-list',
              element: <HoldingList />
            },
            {
              path: '/admin/holding-list/provider-list/:holdingId',
              element: <ProviderList />
            },
            {
              path: '/admin/device-list',
              element: <DeviceList />
            }
          ]
        }
      ]
    },
    {
      path: '/public',
      element: <Public />,
      children: [
        {
          path: '',
          element: <Dashboard {...{ socket }} />,
          index: true
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
