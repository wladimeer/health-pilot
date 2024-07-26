import { useReactTable, flexRender } from '@tanstack/react-table'
import { TableColumn, TableRow, TableCell, Divider } from '@nextui-org/react'
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table'
import { Table, TableHeader, TableBody, Pagination } from '@nextui-org/react'
import { DEFAULT_ELEMENT_QUANTITY } from '../constants/design'
import { ACTIONS_KEY } from '../constants/design'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import Icon from './Icon'

const DataTable = ({ columns, data, actions, noDataMessage, entityId }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: DEFAULT_ELEMENT_QUANTITY
  })

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination }
  })

  return (
    <div className="font-fira-sans-condensed">
      <Table
        radius='sm'
        aria-label="table"
        bottomContent={
          <>
            <Divider />

            <div className="flex w-full justify-center">
              <Pagination
                onChange={(value) => {
                  setPagination(({ pageIndex, ...propsRest }) => ({
                    pageIndex: value - 1,
                    ...propsRest
                  }))
                }}
                isCompact
                showShadow
                showControls
                total={table.getPageCount()}
                color="primary"
              />
            </div>
          </>
        }
      >
        <TableHeader>
          {table.getHeaderGroups().map(({ headers }) =>
            headers.map(
              ({
                id,
                column: {
                  columnDef: { header }
                },
                ...restHeader
              }) =>
                id.split('_').includes(ACTIONS_KEY) ? (
                  <TableColumn
                    className="py-4 text-sm bg-blue-500 text-slate-50 text-center"
                    key={id}
                  >
                    {flexRender(header, restHeader.getContext())}
                  </TableColumn>
                ) : (
                  <TableColumn className="py-4 text-sm bg-blue-500 text-slate-50" key={id}>
                    {flexRender(header, restHeader.getContext())}
                  </TableColumn>
                )
            )
          )}
        </TableHeader>

        <TableBody emptyContent={noDataMessage}>
          {table.getRowModel().rows.map(({ id, ...row }) => (
            <TableRow key={id}>
              {row.getVisibleCells().map(
                ({
                  id,
                  column: {
                    columnDef: { cell }
                  },
                  ...cellRest
                }) =>
                  id.split('_').includes(ACTIONS_KEY) ? (
                    <TableCell className="py-4 text-sm flex justify-center gap-2" key={id}>
                      {actions.map(({ key, title, icon, color, func }) => (
                        <Tooltip
                          key={key}
                          classNames={{
                            base: ['before:bg-neutral-400 dark:before:bg-white'],
                            content: ['py-2 px-4 shadow-xl text-gray-100 bg-gray-800 rounded-md']
                          }}
                          closeDelay={0}
                          placement="right"
                          content={title}
                        >
                          <span
                            className='opacity-50 hover:opacity-100'
                            onClick={() => func(cellRest.row.getValue(entityId))}
                          >
                            <Icon icon={icon} size={6} isButton color={color} />
                          </span>
                        </Tooltip>
                      ))}
                    </TableCell>
                  ) : (
                    <TableCell className="py-4 text-sm" key={id}>
                      {flexRender(cell, cellRest.getContext())}
                    </TableCell>
                  )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
