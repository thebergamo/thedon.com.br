import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'components/Popover/Popover'
import React from 'react'
import { MagnifierGlass } from '../Icons/MagnifierGlass'

export const SearchBox: React.FC = () => {
  return (
    <Popover>
      <div
        aria-label="Toggle Search Box"
        className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
      >
        <PopoverTrigger asChild>
          <div className="h-6 w-6 flex">
            <MagnifierGlass />
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={5} className="p-0">
          <div className="mlm-4">
            <h3>Search Goes here</h3>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  )
}
