"use client"
import React from 'react'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';



const page = ({params : {id}}: {params:{id:string}})=> {
    // TODO: Fetch conference details using id and render conference page
    const conference = useQuery(api.conference.getConferenceDetails, { id:id });
    console.log(conference);  
  return (
    <div>
      Conference {id}
    </div>
  )
}

export default page
