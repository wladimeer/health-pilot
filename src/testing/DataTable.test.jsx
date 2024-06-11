import DataTable from '../components/DataTable'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('DataTable', () => {
  const testData = {
    columns: [
      {
        header: 'Test ID',
        accessorKey: 'testId'
      },
      {
        header: 'Test Name',
        accessorKey: 'testName'
      },
      {
        header: 'Test Group',
        accessorKey: 'testGroup'
      }
    ],
    data: [
      {
        testId: '1',
        testName: 'MyTest',
        testGroup: 'MyGroup'
      },
      {
        testId: '2',
        testName: 'MyTest2',
        testGroup: 'MyGroup2'
      }
    ],
    actions: [
      {
        key: 'c1',
        title: 'Close',
        icon: 'hiX',
        color: 'red',
        func: () => {}
      }
    ]
  }

  const handleRender = ({
    columns = [],
    data = [],
    actions = [],
    noDataMessage = 'No data',
    entityId = 'testId'
  } = {}) => {
    cleanup()

    return render(
      <MemoryRouter>
        <DataTable
          columns={columns}
          data={data}
          actions={actions}
          noDataMessage={noDataMessage}
          entityId={entityId}
        />
      </MemoryRouter>
    )
  }

  test("should show noDataMessage when there isn't data", () => {
    handleRender({ columns: testData.columns })
    const message = screen.getByText('No data')
    expect(message).toBeDefined()
  })

  test('should hide noDataMessage when there is data', () => {
    handleRender({ ...testData })
    const message = screen.queryByText('No data')
    expect(message).toBeNull()
  })

  test('should display the correct rows length', () => {
    handleRender({ ...testData })
    const rows = screen.getAllByRole('rowheader')
    expect(rows).toHaveLength(testData.data.length)
  })

  test('should display the correct columns length', () => {
    handleRender({ ...testData })
    const columns = screen.getAllByRole('columnheader')
    expect(columns).toHaveLength(testData.columns.length)
  })

  test('should display the headers values on the table', () => {
    handleRender({ ...testData })

    const headers = screen.getAllByRole('columnheader')

    headers.forEach((header, index) => {
      expect(header.textContent).equal(testData.columns[index].header)
    })
  })

  test('should display the rows values on the table', () => {
    handleRender({ ...testData })

    const rows = screen.getAllByRole('rowheader')

    rows.forEach((row, index) => {
      expect(row.textContent).equal(testData.data[index].testId)
    })

    const cells = screen.getAllByRole('gridcell')

    cells.forEach((cell) => {
      const [index, key] = cell.getAttribute('data-key').split('_')
      expect(cell.textContent).equal(testData.data[index][key])
    })
  })
})
