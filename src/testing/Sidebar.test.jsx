import Sidebar from '../components/Sidebar'
import { fireEvent, render, screen } from '@testing-library/react'
import { SidebarProvider } from '../contexts/Sidebar'
import { test, expect, describe } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('Sidebar', () => {
  render(
    <MemoryRouter>
      <SidebarProvider>
        <Sidebar>
          <li>Child</li>
        </Sidebar>
      </SidebarProvider>
    </MemoryRouter>
  )

  test('should render the logo', () => {
    const logo = screen.getByTestId('logo')
    expect(logo).toBeDefined()
  })

  test('should show the icon to collapse', () => {
    const collapseIcon = screen.getByTestId('hiOutlineMinusSm')
    expect(collapseIcon).toBeDefined()
  })

  test('should toggle the collapsed state when button is clicked', () => {
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const buttonAfterClick = screen.getByTestId('hiOutlinePlusSm')
    expect(buttonAfterClick).toBeDefined()
  })

  test('should not show the icon to expand when it expanded', () => {
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const expandIcon = screen.queryByTestId('hiOutlinePlusSm')
    expect(expandIcon).toBeNull()
  })

  test('should render children correctly', () => {
    const childElement = screen.getByText('Child')
    expect(childElement).toBeDefined()
  })
})
