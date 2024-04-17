import Private from '../layouts/Private'
import ProviderList from '../pages/private/ProviderList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HoldingList from '../pages/private/HoldingList'
import DeviceList from '../pages/private/DeviceList'
import Dashboard from '../pages/private/Dashboard'
import { useData } from '../contexts/Data'
import Admin from '../pages/private/Admin'

const AppRouter = () => {
  const { services } = useData()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Private />,
      children: [
        {
          path: '',
          element: <Dashboard {...{ services }} />,
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
