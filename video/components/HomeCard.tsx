"use client"
import Image from 'next/image'
import { cn } from "@/lib/utils"

interface HomeCardProps {
    className : string , 
    img : string , 
    title : string , 
    description : string , 
    handleClick : () => void
}

const HomeCard = ({img , className , title , description , handleClick} : HomeCardProps) => {
  return (
    <div>
       <div className={cn("bg-purple-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[30rem] min-h-[230px] rounded-xl cursor-pointer ",className)} onClick={handleClick}>
       <div className="flex-center glassmorphism size-12 rounded-lg ">
        <Image src={img} alt="meeting" height={20} width={20} />
       </div>
       <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl font-bold ">{title}</h1>
        <p className="text-lg font-normal ">{description}</p>
       </div>
      </div>
    </div>
  )
}

export default HomeCard
