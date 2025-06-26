import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const EditTopicForm = () => {
  return (
      <form className="flex justify-between items-center p-4 shadow-md max-w-3xl mx-auto">
          <div className="flex flex-col gap-2 w-full">
              <Input placeholder='Update Topic Title' />
              <Input placeholder=' Update Topic Description' />
              <Button variant={"outline"}> Update Topic</Button>
          </div>

      </form>
  )
}

export default EditTopicForm
