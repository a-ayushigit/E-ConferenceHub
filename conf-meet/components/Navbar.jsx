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
    <div className="flex flex-1 flex-row w-fit justify-between gap-9">
      <div className="flex flex-row justify-center gap-4 text-xs p-3">
      {navLinks.map((link)=>{
        const isActive = (pathName === link.route )|| (pathName.startsWith(`${link.route}/`));
        return (
          <div key={link.label} className="flex flex-row  items-center p-3 rounded-lg justify-start">
          <Link className={cn("flex flex-row ", {'bg-yellow-200':isActive})} href={link.route} key={link.label} >
          <Image src={link.imgUrl}  alt={link.label} width={24} height={24}/>
          <p className="flex flex-nowrap text-xs font-extralight sm:text-lg ">{link.label}</p>
          </Link>
          </div>
         
        )
      })}
      </div>
      <div className="flex flex-row gap-3 p-2">
      <SignedIn>
          <UserButton className="flex " />
          <SignOutButton className="flex self-center" >Log Out</SignOutButton>
      </SignedIn>    
      </div>
    </div>
  )
}

export default Navbar
