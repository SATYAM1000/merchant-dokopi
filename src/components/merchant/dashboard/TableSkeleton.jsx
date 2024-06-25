import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const TableSkeleton = () => {
    return (
        <div className='py-4 flex flex-col gap-5'>

            <div className='flex justify-between'>
                <Skeleton className="h-10 w-96 rounded-xl" />
                <div className='flex gap-4'>
                    <Skeleton className="h-10 w-40 rounded-xl" />
                </div>

            </div>
            <div>

                < Skeleton className="h-96 w-fuil rounded-xl" />
            </div>
        </div>
    )

}

export default TableSkeleton