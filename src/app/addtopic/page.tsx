import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
  return (
      <form className="flex justify-between items-center p-4 shadow-md max-w-3xl mx-auto">
      <div className="flex flex-col gap-2 w-full">
              <Input placeholder='Topic Title' />
              <Input placeholder='Topic Description' />
              <Button variant={"outline"}> Add Topic</Button>
      </div>
      
    </form>
  )
}

export default page
