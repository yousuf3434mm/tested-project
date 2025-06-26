import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";

const RemoveBtn = () => {
  return (
    <button>
          <FaRegTrashAlt width={24} className='cursor-pointer text-red-600'/>
    </button>
  )
}

export default RemoveBtn
