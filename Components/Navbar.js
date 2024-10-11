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
                        <span className='text-xl text-white'>Stock Manager</span>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
