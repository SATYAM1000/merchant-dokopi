'use client'
import * as React from "react"

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"


import { columns } from "./table/tableColumns";
import TopTableFilter from "./table/TopTableFilter";
import ShowTableRow from "./table/ShowTableRow";
import TablePagination from "./table/TablePagination";

function DataTableDemo({ data }) {
  if (!data) {
    return null;
  }
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: { pagination: { pageSize: 7 } },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <div className="w-full">
      <TopTableFilter table={table} sorting={sorting} setSorting={setSorting} />
      <ShowTableRow table={table} columns={columns} />
      <TablePagination table={table} />
    </div>
  )
}


export default DataTableDemo