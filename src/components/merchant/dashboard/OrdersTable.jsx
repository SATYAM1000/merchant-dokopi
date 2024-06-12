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

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "paid",
    transaction_id: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 15000,
    status: "paid",
    transaction_id: "Abe45@gmail.com",
  }
  ,
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unpaid",
    transaction_id: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "paid",
    transaction_id: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "unpaid",
    transaction_id: "carmella@hotmail.com",
  },
]




function DataTableDemo() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  console.log(sorting)
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
      <TopTableFilter table={table} />
      <ShowTableRow table={table} columns={columns} />
      <TablePagination table={table} />
    </div>
  )
}


export default DataTableDemo