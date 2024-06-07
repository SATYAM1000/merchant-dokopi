"use client";
// import React from "react";

import ViewDetails from "./view-details/ViewDetails";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// import { Checkbox } from "@/components/ui/checkbox";
// import { EllipsisVertical } from "lucide-react";

// const OrdersTable = () => {
//   return (
//     <div className="w-full min-h-[calc(100vh-150px)] relative  mb-4">
//       <Table className="w-full overflow-y-scroll rounded-md overflow-x-scroll">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">
//               <Checkbox />
//             </TableHead>
//             <TableHead className="w-[100px]">SNo.</TableHead>
//             <TableHead className="w-[150px]">Order No.</TableHead>
//             <TableHead>Time</TableHead>
//             <TableHead className="w-[150px]">Status</TableHead>
//             <TableHead className="w-[230px]">Transaction ID</TableHead>
//             <TableHead className="w-[150px]">Amount</TableHead>
//             <TableHead className="w-[150px]">FilesRecvd</TableHead>
//             <TableHead>
//               <Button
//                 variant="link"
//                 size="sm"
//                 className="w-[100px] px-0 text-muted-foreground hover:no-underline "
//               >
//                 View Details
//               </Button>
//             </TableHead>
//             <TableHead>
//               Actions
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {Array.from({ length: 5 }).map((_, i) => (
//             <TableRow key={i} className="font-medium ">
//               <TableCell>
//                 <Checkbox
//                   checked
//                   onCheckedChange={() => { }}
//                   className="w-[17px] h-[17px] "
//                 />
//               </TableCell>
//               <TableCell>
//                 <p>{i + 1}</p>
//               </TableCell>
//               <TableCell>
//                 <p>#order_00001</p>
//               </TableCell>
//               <TableCell>
//                 <p>11:20 AM</p>
//                 <span className="text-muted-foreground text-sm">Today</span>
//               </TableCell>

//               <TableCell>
//                 <div
//                   className={
//                     "bg-indigo-500/[0.3] w-fit px-3 text-indigo-600 text-sm py-0.5 rounded-xl hover:bg-indigo-200  "
//                   }
//                 >
//                   {"paid"}
//                 </div>
//               </TableCell>

//               <TableCell>pay_82736HSGD8ga88</TableCell>
//               <TableCell>
//                 <p>₹&nbsp;200</p>
//               </TableCell>

//               <TableCell>5</TableCell>
//               <TableCell className="">
//                 <Sheet>
//                   <SheetTrigger asChild>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="w-[100px] px-0 text-indigo-600 underline "
//                     >
//                       View Details
//                     </Button>
//                   </SheetTrigger>
//                   <SheetContent>
//                     <SheetHeader>
//                       <SheetTitle>
//                         Order Details&nbsp;&nbsp;&nbsp;
//                         { }
//                       </SheetTitle>
//                       <SheetDescription>
//                         View customer order details here.
//                       </SheetDescription>
//                     </SheetHeader>
//                     <ViewDetails />
//                   </SheetContent>
//                 </Sheet>
//               </TableCell>

//               <TableCell className="text-center flex items-center justify-center ">
//                 <EllipsisVertical className="w-5 h-5 cursor-pointer" />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default OrdersTable;





import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  }
  ,
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
]


export const columns = [
  //checkbox
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  //SNo
  {
    accessorKey: "id",
    header: "SNo.",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id").slice(5, 7)}</div>
    ),
  },
  //Order Id
  {
    accessorKey: "status",
    header: "Order Id",
    cell: ({ row }) => (
      <div className="capitalize">#{row.getValue("id")}</div>
    ),
  },
  // Time 
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  //Status
  {
    accessorKey: "id",
    header: "Status",
    cell: ({ row }) => (
      <div className={"bg-indigo-500/[0.3] w-fit px-3 text-indigo-600 text-sm py-0.5 rounded-xl hover:bg-indigo-200"}>paid</div>
    ),
  },
  //Transaction Id
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => (
      <div>{row.getValue('id')}{row.getValue('email')}</div>
    ),
  },
  //amount
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a indian amount
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="text-center font-medium ">{formatted}</div>
    },
  },
  //FilesRecvd
  {
    accessorKey: "status",
    header: "FilesRecvd",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id").slice(6, 7)}</div>
    ),
  },
  //View Details
  {
    accessorKey: "status",
    header: "Order Id",
    cell: ({ row }) => (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="link"
            size="sm"
            className="w-[100px] px-0 text-indigo-600 underline "
          >
            View Details
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Order Details&nbsp;&nbsp;&nbsp;
              {row.getValue('email')}
            </SheetTitle>
            <SheetDescription>
              View customer order details here.
            </SheetDescription>
          </SheetHeader>
          <ViewDetails />
        </SheetContent>
      </Sheet>
    ),
  },

  //Actions
  {
    id: "actions",
    enableHiding: false,
    header: 'Actions',
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function DataTableDemo() {
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


export default DataTableDemo