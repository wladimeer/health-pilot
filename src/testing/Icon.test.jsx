import Icon from '../components/Icon'
import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

describe('Icon', () => {
  beforeEach(() => {
    cleanup()
    render(<Icon icon="hiCog" size={20} />)
  })

  test('should show the icon element', () => {
    const svgElement = screen.getByTestId('hiCog')
    expect(svgElement).toBeDefined()
  })

  test('should render the icon with correct size', () => {
    const svgElement = screen.getByTestId('hiCog')
    expect(svgElement.getAttribute('class').includes('w-20')).toBe(true)
    expect(svgElement.getAttribute('class').includes('h-20')).toBe(true)
  })
})
