import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { Loader } from 'components/Loader/Loader'

type Props<Data> = {
  columns: ColumnDef<Data, any>[]
  data: Data[]
  isLoading: boolean
}

export function Table<Data>({ columns, data, isLoading }: Props<Data>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-700 sm:rounded-lg"></div>
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="dark:bg-gray-50 bg-gray-600">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className={`group px-6 py-3 text-left font-medium dark:text-gray-500 text-gray-200 uppercase tracking-wider ${
                          header.column.columnDef.size === -1 ? 'w-full' : ''
                        }`}
                      >
                        {/* TODO: Add sort */}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-700">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap"
                        role="cell"
                      >
                        <div className="text-lg">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </>
  )
}
