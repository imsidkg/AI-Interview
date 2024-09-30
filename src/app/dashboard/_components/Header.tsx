'use client'
import React from 'react'
import Logo from '../../../assets/logo.svg'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

const Header: React.FC = () => {
  const router = useRouter()
    const path = usePathname()

    function handleOnClick(route:string){
      router.push(`/${route}`)
    }
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
        <li onClick={() =>handleOnClick("dashboard")} className={`transition-all cursor-pointer hover:text-gray-500 ${path=='/dashboard' && 'text-blue-300'}`}>Dashboard</li>
        <li  className={`transition-all   ${path=='/dashboard/questions' && 'text-primary text-blue-300'}`}>Questions</li>
        <li className={`transition-all   ${path=='/dashboard/upgrade' && 'text-primary text-blue-300'}`}>Upgrade</li>
        
      </ul>

      <UserButton/>
    </div>
  )
}

export default Header
