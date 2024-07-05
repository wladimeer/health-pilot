import ButtonSidebarItem from '../components/ButtonSidebarItem'
import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Icon from '../components/Icon'

vi.mock('../contexts/Sidebar', () => ({ useSidebar: () => ({ expanded: true }) }))

describe('ButtonSidebarItem', () => {
  const sidebarItem = {
    text: 'Logout',
    icon: 'hiOutlineLogout',
    active: true,
    class: 'bg-gradient-to-tr'
  }

  render(
    <MemoryRouter>
      <ButtonSidebarItem
        text={sidebarItem.text}
        icon={<Icon icon={sidebarItem.icon} size={20} />}
        active={sidebarItem.active}
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
})
