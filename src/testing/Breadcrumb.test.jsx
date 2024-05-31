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
    prev: {
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
    const { prev } = breadcrumb
    const title = screen.getAllByText(prev.title)
    expect(title).toBeDefined()
  })

  test('should have the previous path', () => {
    const { prev } = breadcrumb

    const links = screen.getAllByRole('link', { name: prev.title })

    const prevLink = links.find((link) => {
      return link.getAttribute('href') === prev.path ? link : null
    })

    expect(prevLink).toBeDefined()
    expect(prevLink.getAttribute('href')).toContain(prev.path)
  })

  test('should show the current title', () => {
    const { current } = breadcrumb
    const title = screen.getAllByText(current.title)
    expect(title).toBeDefined()
  })

  test('should have the current path', () => {
    const { current } = breadcrumb

    const links = screen.getAllByRole('link', { name: current.title })

    const currentLink = links.find((link) => {
      return link.getAttribute('href') === current.path ? link : null
    })

    expect(currentLink).toBeDefined()
    expect(currentLink.getAttribute('href')).toContain(current.path)
  })
})
