import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-purple-800 text-white shadow-md max-w-3xl mx-auto">
      <Link href="/" className="text-2xl font-bold ">My Coding</Link>
      <Link href="/addtopic" className="text-2xl font-bold bg-purple-800 py-2 hover:bg-purple-700 px-2 rounded">Add Topic</Link>
    </div>
  )
}

export default Navbar
