'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

const TablePagination = ({ table }) => {
    return (
        <div className="flex items-center justify-end space-x-2 py-3">
            <div className="flex-1 text-[13px] text-gray-700 font-medium">
                {table.getFilteredRowModel().rows.length} Total Fields
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
    )
}

export default TablePagination