import Container from '../components/Container'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'

describe('Container', () => {
  const testData = {
    title: 'MyContainer',
    breadcrumb: {
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
  }

  render(
    <MemoryRouter>
      <Container {...testData}>
        <div data-testid="container-children">Children</div>
      </Container>
    </MemoryRouter>
  )

  test('should display the container title', () => {
    const title = screen.getByTestId('container-title')
    expect(title).toBeDefined()
    expect(title.textContent).equal(testData.title)
  })

  test('should display the container children', () => {
    const children = screen.getByTestId('container-children')
    expect(children).toBeDefined()
  })

  test('should display breadcrumb in the container', () => {
    const breadcrumb = screen.getByTestId('breadcrumb-content')
    expect(breadcrumb).toBeDefined()
  })
})
