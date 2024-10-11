import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <nav className="body-font font-light text-[#686868] w-full">
                <div className="flex flex-wrap p-5 px-20 border-b border-zinc-800 flex-col md:flex-row items-center w-full">
                    <Link href="/" className="flex title-font items-center mb-4 md:mb-0 space-x-2">
                        <Image src="/logo.png" alt="logo" className="w-10" width="300" height="300"></Image>
                        <span className='text-xl text-white'>Stock Management System</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link href="/" className="mr-5 hover:text-white">First Link</Link>
                        <Link href="/" className="mr-5 hover:text-white">Second Link</Link>
                        <Link href="/" className="mr-5 hover:text-white">Third Link</Link>
                        <Link href="/" className="mr-5 hover:text-white">Fourth Link</Link>
                    </nav>
                </div>
            </nav>
        </>
    )
}

export default Navbar
