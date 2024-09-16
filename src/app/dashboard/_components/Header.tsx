'use client'
import React from 'react'
import Logo from '../../../assets/logo.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

const Header: React.FC = () => {
    const path = usePathname()
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center justify-center ">
  <Image  
    src={Logo} 
    alt='logo' 
    width={100}
    height={100}
    className='w-full h-full' 
  />
</div>

      <ul className='hidden md:flex gap-6'>
        <li className={`transition-all cursor-pointer hover:text-gray-500 ${path=='/dashboard' && 'text-gray-500'}`}>Dashboard</li>
        <li className={`transition-all cursor-pointer  hover:text-gray-500 ${path=='/dashboard/questions' && 'text-primary text-gray-500'}`}>Questions</li>
        <li className={`transition-all cursor-pointer  hover:text-gray-500 ${path=='/dashboard/upgrade' && 'text-primary text-gray-500'}`}>Upgrade</li>
        <li className={`transition-all cursor-pointer e hover:text-gray-500 ${path=='/dashboard/how' && 'text-primary text-gray-500'}`}>How it works?</li>
      </ul>

      <UserButton/>
    </div>
  )
}

export default Header
