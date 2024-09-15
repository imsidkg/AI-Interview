'use client'
import React from 'react'
// Import the logo using a relative path

import Logo from '../../../assets/logo.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Header: React.FC = () => {
    const path = usePathname()
  return (
    <div className="p-4 flex   items-center justify-between  shadow-sm ">
     <Image src={Logo} alt='logo' width={160} height={100}  style={{ width: "auto", height: "auto" }}   />
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && ' font-bold'}`}>Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how' && 'text-primary font-bold'}`}>How it works?</li>
        </ul>
    </div>
  )
}

export default Header