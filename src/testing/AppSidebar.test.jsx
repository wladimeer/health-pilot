import AppSidebar from '../components/AppSidebar'
import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SidebarProvider } from '../contexts/Sidebar'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../services/platform', () => ({
  getAllMenus: () => [
    { key: 'dashboardPage', icon: 'hiChartPie', path: '/', submenus: [] },
    { key: 'adminPage', icon: 'hiCog', path: '/admin', submenus: [] },
    { key: 'graphicsPage', icon: 'hiChartPie', path: '/graphics', submenus: [] }
  ]
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => [(key) => key]
}))

vi.mock('../contexts/Auth', () => ({
  useAuth: () => ({
    userData: { username: 'default', sessionId: 'a5001623-9007-47f5-a2b4-1bf505ab057d', password: 'default'},
    updateUserData: () => {},
    isUserValid: false
  })
}))

describe('AppSidebar', () => {
  render(
    <MemoryRouter>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </MemoryRouter>
  )

  test('should show the options menu', () => {
    expect(screen.getByText('dashboardPage')).toBeDefined()
    expect(screen.getByText('adminPage')).toBeDefined()
    expect(screen.getByText('graphicsPage')).toBeDefined()
  })
})
