import SidebarItem from '../components/SidebarItem'
import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Icon from '../components/Icon'

vi.mock('../contexts/Sidebar', () => ({ useSidebar: () => ({ expanded: true }) }))

describe('SidebarItem', () => {
  const sidebarItem = {
    text: 'Dashboard',
    icon: 'hiCog',
    active: true,
    to: '/',
    class: 'bg-gradient-to-tr'
  }

  render(
    <MemoryRouter>
      <SidebarItem
        text={sidebarItem.text}
        icon={<Icon icon={sidebarItem.icon} size={20} />}
        active={sidebarItem.active}
        to={sidebarItem.to}
      />
    </MemoryRouter>
  )

  test('should show the text when activating expand', () => {
    expect(screen.getByText(sidebarItem.text)).toBeDefined()
  })

  test('should show the icon defined', () => {
    const svgElement = screen.getByTestId(sidebarItem.icon)
    expect(svgElement).toBeDefined()
  })

  test('should have the class when active', () => {
    const link = screen.getByRole('link', { name: sidebarItem.text })
    expect(link.classList.contains(sidebarItem.class)).toBe(true)
  })

  test("should haven't the class when inactive", () => {
    const link = screen.getByRole('link', { name: sidebarItem.text })
    link.classList.remove(sidebarItem.class)
    expect(link.classList.contains(sidebarItem.class)).toBe(false)
  })

  test('should have the correct route', () => {
    const link = screen.getByRole('link', { name: sidebarItem.text })
    expect(link.getAttribute('href')).toEqual(sidebarItem.to)
  })
})
