"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter} from 'next/navigation'
import { auth } from '@clerk/nextjs/server';
import { useUser } from "@clerk/nextjs";
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import {SignedIn,UserButton} from '@clerk/nextjs'
import Link from 'next/link';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import CreateConference from '@/components/CreateConference';
import { CustomOrganizationSwitcher } from '@/components/CustomOrgSwitcher';
import { useOrganizationList } from "@clerk/nextjs";
import Image from 'next/image';
import image from '../public/images/image.jpg'

//auth can only be used in server components 
const Root = () => {
  const router = useRouter();
  const { user } = useUser();
 


  return (
   <div className="h-full bg-cyan-200 flex flex-row justify-around">
   <div className="flex container items-center  p-3 ">
   <Image src={image} height={400} width={600} alt="bg" className=" rounded-lg" />
   </div>
   <div className="flex container flex-col justify-center ">
    <p className="flex py-5 items-center  text-5xl font-bold text-blue-950">
    Streamline Every Session, Elevate Every Event
    
    </p>
    <ul className="flex py-5  flex-col items-start text-lg font-bold text-blue-950">
      <li>Trusted by &nbsp;<span className="text-violet-950 font-extrabold text-2xl">40000+ users</span></li>
      <li>Seamless <span className="text-violet-950 font-extrabold text-2xl"> user experience </span> with <span className="text-violet-950 font-extrabold text-2xl">Simplified Registration Process </span></li>
      <li><p> Organize and manage conferences with ease</p></li>
      <li><span className="text-violet-950 font-extrabold text-2xl">Customizable Management Tools</span></li>
      </ul>
      <button onClick={()=>router.push("/create/conference")} className="bg-blue-950 text-white rounded-xl h-14 hover:scale-95 hover:shadow-lg ">
      <p>Start Your Journey </p>
      </button>
   </div>
  <div>
    

  </div>
   </div>
  )
}

export default Root