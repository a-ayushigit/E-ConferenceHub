"use client"
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section className=" w-full max-w-[264px] ">
<Sheet>
  <SheetTrigger asChild>
    <Image src="/icons/hamburger.svg" height={36} width={36} alt="hamburger icon" className="cursor-pointer sm:hidden" />
  </SheetTrigger>
  <SheetContent side="left" className="border-none bg-dark-1">
  <Link href="/" className="flex items-center gap-1"> 
     
     <Image 
     src="/icons/logo.svg"
     width={32}
     height={32}
     alt="Logo"
     className="max-sm:size-10"
     />
     <p className="text-[26px] font-extrabold text-white "> ConfoMeet</p>
     </Link>
     <div className="flex h-[calc(100vh - 72px)]  flex-col justify-between overflow-y-auto ">
      <SheetClose>
      <section className="flex h-full flex-col gap-6 pt-14 text-white">
      {sidebarLinks.map((link)=>{
         const isActive = (pathName === link.route );
         return(
          <SheetClose key={link.route} asChild>

          
           <Link 
           href={link.route} 
           key={link.label} 
           className={cn('flex gap-4 items-center p-3 rounded-lg w-full max-w-60 ' , {'bg-light-1':isActive})}
           >
            <Image
            src={link.imgUrl} 
            alt={link.label} 
            width={20} 
            height={20}/>
            <p className="font-semibold ">{link.label}</p>
            </Link>
            </SheetClose> 
         )
     })}
      </section>

      </SheetClose>
     </div>
  </SheetContent>
</Sheet>

    </section>
  )
}

export default MobileNav
