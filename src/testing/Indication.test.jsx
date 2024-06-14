import Indication from '../components/Indication'
import { render, screen } from '@testing-library/react'
import { test, describe, expect } from 'vitest'

describe('Indication', () => {
  render(<Indication message="No data :)" />)

  test('should show the message as indication', () => {
    expect(screen.getByText('No data :)')).toBeDefined()
  })
})
