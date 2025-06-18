import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex gap-4 justify-center items-center h-screen'>
      <Link href="/dashboard" className='bg-purple-700 text-white px-4 py-2 rounded-md'>Dashboard</Link>
      <Link href="/orders" className='bg-purple-700 text-white px-4 py-2 rounded-md'>Orders</Link>
      <Link href="/products" className='bg-purple-700 text-white px-4 py-2 rounded-md'>Products</Link>
      <Link href="/customers" className='bg-purple-700 text-white px-4 py-2 rounded-md'>Customers</Link>
      <Link href="/reports" className='bg-purple-700 text-white px-4 py-2 rounded-md'>Reports</Link>
      <Link href="/settings" className='bg-purple-700 text-white px-4 py-2 rounded-md'>Settings</Link>
    </div>
  )
}

export default page
