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


//auth can only be used in server components 
const root = () => {
  const router = useRouter();
  const { user } = useUser();
 


  return (
   <div className="bg-bgImg">
   
   </div>
  )
}

export default root