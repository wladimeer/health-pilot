import { expect, test, describe } from 'vitest'
import ProgressCard from '../components/ProgressCard'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('ProgressCard', () => {
  const handleRender = ({ title = 'Test', value = 10, isTime = false, isPercent = false } = {}) => {
    cleanup()

    return render(
      <MemoryRouter>
        <ProgressCard title={title} value={value} isTime={isTime} isPercent={isPercent} />
      </MemoryRouter>
    )
  }

  test('should show the card title', () => {
    handleRender()
    const title = screen.getByText('Test')
    expect(title).toBeDefined()
  })

  test('should display the percent value when isPercent is true', () => {
    handleRender({ value: 10, isPercent: true })
    const value = screen.getByText('10%')
    expect(value).toBeDefined()
  })

  test('should show the value in milliseconds when isTime is true and is in miliseconds the value', () => {
    handleRender({ value: 0.5, isTime: true })
    const value = screen.getByText('0.5ms')
    expect(value).toBeDefined()
  })

  test('should show the value in seconds when isTime is true and is in seconds the value', () => {
    handleRender({ value: 10, isTime: true })
    const value = screen.getByText('10s')
    expect(value).toBeDefined()
  })

  test('should show the value in minutes when isTime is true and is in minutes the value', () => {
    handleRender({ value: 100, isTime: true })
    const value = screen.getByText('100m')
    expect(value).toBeDefined()
  })

  test('should show the value in hours when isTime is true and is in hours the value', () => {
    handleRender({ value: 4000, isTime: true })
    const value = screen.getByText('4000h')
    expect(value).toBeDefined()
  })

  test('should show the value in without type when isTime and isPercent are false', () => {
    handleRender()
    const value = screen.getByText('10')
    expect(value).toBeDefined()
  })
})
