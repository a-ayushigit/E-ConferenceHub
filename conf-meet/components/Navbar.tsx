'use client'
import React from 'react'
import { navLinks} from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import { SignInButton, SignOutButton } from '@clerk/nextjs';
import {SignedIn,UserButton} from '@clerk/nextjs'

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-1 flex-row  text-white justify-between gap-9 bg-blue-950 w-full">
      <div className=" bg-blue-950 text-white font-serif text-lg sm:text-xl font-bold flex justify-center items-center p-3 "><p className="flex bg-blue-900 rounded-xl py-5 shadow-lg p-1 sm:p-3 whitespace-nowrap cursor-pointer">E-ConferenceHub</p></div>
      <div className="flex flex-row justify-center text-white gap-4 text-xs p-3">
      {navLinks.map((link)=>{
        const isActive = (pathName === link.route )|| (pathName.startsWith(`${link.route}/`));
        return (
          <div key={link.label} className="flex flex-row  items-center p-3 rounded-lg justify-start">
          <Link className={cn("flex flex-row items-center justify-between gap-3", {'bg-cyan-600 text-white rounded-lg p-4':isActive})} href={link.route} key={link.label} >
          <Image  src={link.imgUrl}  alt={link.label} width={24} height={24}/>
          <p className="flex whitespace-nowrap flex-wrap text-xs font-extralight sm:text-lg ">{link.label}</p>
          </Link>
          </div>
         
        )
      })}
      </div>
      <div className="flex flex-row gap-3 p-2 items-center">
      <SignedIn>
          <UserButton  />
          <SignOutButton><p className="font-extralight text-xs whitespace-nowrap sm:text-lg text-white">Log Out</p></SignOutButton>
      </SignedIn>    
      </div>
    </div>
  )
}

export default Navbar
