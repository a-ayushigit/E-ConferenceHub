import CreateConference from '@/components/CreateConference'
import React from 'react'

const page = () => {
  return (
    <div className="h-full flex flex-col container bg-cyan-200">
      <p className="p-4 flex font-semibold font-serif text-2xl text-gray-800 py-2">Craft your Event , Curate Every Detail ....</p>
      <CreateConference/>
    </div>
  )
}

export default page
