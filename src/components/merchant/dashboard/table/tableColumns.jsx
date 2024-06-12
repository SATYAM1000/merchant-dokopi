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
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ViewDetails from "../view-details/ViewDetails";
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
        accessorKey: "SNo",
        header: "SNo.",
        cell: ({ row }) => {
            const formatted = new Intl.NumberFormat().format(row.index + 1);
            return <div className="capitalize">{formatted < 10 ? `0${formatted}` : `${formatted}`}</div>
        },
    },
    //Order Id
    {
        accessorKey: "Order Id",
        header: "Order Id",
        cell: ({ row }) => (
            <div className="capitalize">#{row.getValue("id")}</div>
        ),
    },
    // Time 

    //Status
    {
        accessorKey: "Status",
        header: "Status",
        cell: ({ row }) => {
            const Rowdata = row.original
            const className = (Rowdata.status === "paid") ? "bg-green-500/[0.3] hover:bg-green-200 text-green-600" : "bg-red-500/[0.3] hover:bg-red-200 text-red-600"
            return <div className={`w-fit px-3  text-sm py-0.5 rounded-xl ${className} transition-all delay-200`}>{Rowdata.status}</div>
        },
    },
    //Transaction Id
    {
        accessorKey: "transaction_id",
        header: "Transaction ID",
        cell: ({ row }) => {
            return (
                <div>{row.getValue('transaction_id')}</div>
            )
        },
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
        accessorKey: "File Received",
        header: "FilesRecvd",
        cell: ({ row }) => {
            const RowData = row.original
            return (
                <div className="capitalize ml-5">{(RowData.id).slice(6, 7)}</div>
            )
        },
    },
    //View Details
    {
        accessorKey: "View Details",
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
    //Actions
    {
        id: "actions",
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
                            navigator.clipboard.writeText(Rowdata.id); toast("Order Id has been copied", { duration: 1000 })
                        }} className="cursor-pointer">Copy Order ID</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            navigator.clipboard.writeText(Rowdata.email); toast("Email has been copied.", { duration: 1000 })
                        }} className="cursor-pointer">Copy Customer Email</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">View customer</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]