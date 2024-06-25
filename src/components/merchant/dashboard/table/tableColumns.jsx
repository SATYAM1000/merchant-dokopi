import * as React from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ViewDetails from "../view-details/ViewDetails";
import { format } from "date-fns";
export const columns = [
    //checkbox
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    //SNo
    {
        accessorKey: "SNo",
        enableHiding: false,
        header: "SNo.",
        cell: ({ row }) => {
            const formatted = new Intl.NumberFormat().format(row.index + 1);
            return <div className="capitalize">{formatted < 10 ? `0${formatted}` : `${formatted}`}</div>
        },
    },
    //Order Id
    {
        accessorKey: "Order_Id",
        header: "Order Id",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("Order_Id")}</div>
        ),
    },
    //Transaction Time 
    {
        accessorKey: "Transaction_Time",
        enableHiding: false,
        header: "Transaction Time",
        cell: ({ row }) => (
            <div className="capitalize">{format(row.getValue("Transaction_Time"), "PP")}</div>
        ),
    },
    // Payment Status
    {
        accessorKey: "paymentStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payment Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const className = (row.getValue("paymentStatus")
                === "success") ? "bg-green-500/[0.3] hover:bg-green-200 text-green-600" : "bg-red-500/[0.3] hover:bg-red-200 text-red-600"
            return <div className={`w-fit px-3  text-sm py-0.5 rounded-xl ${className} transition-all delay-200`}>{row.getValue("paymentStatus")}</div>
        },
    },
    //Transaction Id
    {
        accessorKey: "TransactionId",
        header: "Transaction ID",
        cell: ({ row }) => (
            <div>{row.getValue("TransactionId")}</div>
        )
        ,
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

            return <div className="ml-6 font-medium ">{formatted}</div>
        },
    },
    //FilesRecvd
    {
        accessorKey: "FilesRecvd",
        header: "FilesRecvd",
        cell: ({ row }) => (
            <div className="capitalize ml-5">{row.getValue("FilesRecvd")}</div>
        )
        ,
    },
    //View Details
    {
        accessorKey: "View Details",
        enableHiding: false,
        header: "View Details",
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
    //Status
    {
        accessorKey: "Status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        // header: "",
        cell: ({ row }) => {
            const className = (row.getValue("Status") === "success") ? "bg-green-500/[0.3] hover:bg-green-200 text-green-600" : "bg-red-500/[0.3] hover:bg-red-200 text-red-600"
            return <div className={`w-fit px-3  text-sm py-0.5 rounded-xl ${className} transition-all delay-200`}>{row.getValue("Status")}</div>
        },
    },
    //Actions
    {
        id: "action",
        enableHiding: false,
        header: 'Actions',
        cell: ({ row }) => {
            const Rowdata = row.original
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
                        <DropdownMenuItem onClick={() => {
                            navigator.clipboard.writeText(Rowdata?.Order_Id); toast("Order Id has been copied", { duration: 1000 })
                        }} className="cursor-pointer">Copy Order ID</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            navigator.clipboard.writeText(Rowdata?.action?.email); toast("Email has been copied.", { duration: 1000 })
                        }} className="cursor-pointer">Copy Customer Email</DropdownMenuItem>
                        {/* <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem className="cursor-pointer">View customer</DropdownMenuItem> */}
                        {/* <DropdownMenuItem className="cursor-pointer">View payment details</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]   