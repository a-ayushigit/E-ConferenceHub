import React from 'react'
import Image from 'next/image'
const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image 
      height={125}
      width={125}
      src="/logo.svg"
      alt="Logo"
      className="animate-pulse duration-700"
      />
    </div>
  )
}

export default Loading
