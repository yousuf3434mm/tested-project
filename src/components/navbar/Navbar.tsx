import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    return (

        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    
                    <span className="ml-3 text-xl">eCommerce</span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href={"/addproduct"} className="mr-5 hover:text-gray-900">Add Product</Link>
                    <Link href={"/outofstock"} className="mr-5 hover:text-gray-900">Out of Stock</Link>
                    <Link href={"/updateproduct"} className="mr-5 hover:text-gray-900">Update Product</Link>
                    <Link href={"#"} className="mr-5 hover:text-gray-900">Fourth Link</Link>
                </nav>
                <Button className="inline-flex items-center bg-purple-800 text-white hover:text-gray-100 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">Profile
                   
                </Button>
            </div>
        </header>

    )
}

export default Navbar
