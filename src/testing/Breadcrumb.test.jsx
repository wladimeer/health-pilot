import Breadcrumb from '../components/Breadcrumb'
import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Breadcrumb', () => {
  const breadcrumb = {
    home: {
      title: 'HomePage',
      path: '/home'
    },
    first: {
      title: 'PreviousPage',
      path: '/home/previous'
    },
    current: {
      title: 'CurrentPage',
      path: '/home/current'
    }
  }

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Breadcrumb {...breadcrumb} />
      </MemoryRouter>
    )
  })

  test('should show the home title', () => {
    const { home } = breadcrumb
    const title = screen.getAllByText(home.title)
    expect(title).toBeDefined()
  })

  test('should have the home path', () => {
    const { home } = breadcrumb

    const links = screen.getAllByRole('link', { name: home.title })

    const homeLink = links.find((link) => {
      return link.getAttribute('href') === home.path ? link : null
    })

    expect(homeLink).toBeDefined()
    expect(homeLink.getAttribute('href')).toContain(home.path)
  })

  test('should show the previous title', () => {
    const { first } = breadcrumb
    const title = screen.getAllByText(first.title)
    expect(title).toBeDefined()
  })

  test('should show the current title', () => {
    const { current } = breadcrumb
    const title = screen.getAllByText(current.title)
    expect(title).toBeDefined()
  })
})
