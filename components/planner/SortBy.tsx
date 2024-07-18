import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SortBy({ setSelected }: { setSelected: (selected: string) => void }) {

  return (
    <Select 
      defaultValue='recently' 
      onValueChange={(value) => {
        setSelected(value);
      }}
    >
      <SelectTrigger className="w-fit h-[40px] max-2xl:text-sm bg-customWhite-200 border border-customBlack-100">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent avoidCollisions={true} className='bg-customWhite-200 w-fit text-left'> 
        <SelectGroup>
          <SelectItem value="duration">{`Trip Duartion (long-short)`}</SelectItem>
          <SelectItem value="earliest">Earliest Start</SelectItem>
          <SelectItem value="latest">Latest Start</SelectItem>
          <SelectItem value="recent">Recent Start</SelectItem>
          <SelectItem value="recently">Recently Created</SelectItem>
          <SelectItem value="country/city">{'Country/City (A-Z)'}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
