import Private from '../layouts/Private'
import ProviderList from '../pages/private/ProviderList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HoldingList from '../pages/private/HoldingList'
import DeviceList from '../pages/private/DeviceList'
import Dashboard from '../pages/private/Dashboard'
import Admin from '../pages/private/Admin'

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Private />,
      children: [
        {
          path: '',
          element: <Dashboard />,
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
              path: 'holding-list',
              element: <HoldingList />
            },
            {
              path: 'holding-list/provider-list/:holdingId',
              element: <ProviderList />
            },
            {
              path: 'device-list',
              element: <DeviceList />
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
