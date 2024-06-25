'use client'
import * as React from "react"

import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const TopTableFilter = ({ table, sorting, setSorting }) => {
    return (
        <div className="flex items-center justify-between py-4 max-md:flex-col gap-3">
            <Input
                placeholder="Filter Order Id..."
                value={(table.getColumn("Order_Id")?.getFilterValue()) ?? ""}
                onChange={(event) => {
                    console.log(table.getColumn("Order_Id"))
                    table.getColumn("Order_Id")?.setFilterValue(event.target.value)
                }
                }
                className="max-w-sm"
            />
            <div className="flex gap-4 max-md:justify-between max-md:w-full">
                {
                    sorting.length>0 &&
                    <Button variant="ghost" className="ml-auto disabled:cursor-not-allowed disabled:pointer-events-auto" onClick={() => setSorting([])} disabled={!sorting.length}>
                        Clear Filter
                    </Button>
                }
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
        </div>
    )
}

export default TopTableFilter