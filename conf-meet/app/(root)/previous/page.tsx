'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from '@/components/Loader'
import MeetingCard from '@/components/MeetingCard'

const Page = () => {
  const getAllPreviousConferences = useMutation(api.conference.getAllPreviousConferences);
  const [previousConf, setpreviousConf] = useState<Object[]>([]);
  const [isConferenceLoaded, setIsConferenceLoaded] = useState(false);
  type Conference = {
    _id:string,
    orgId: string,
    _creationTime: string,
    title:string,
    subject:string,
    sessions:[{ name:string,description:string , dateTime:string }] , 
    startDate:string,
    endDate:string,
    speakers:[string],
    organizer:{userId:string, userName:string},//will be token identifier  
    attendees: [{
        tokenIdentifier:string,
        name:string
  
    }],
    meetingLink:string,
   }
  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const res = await getAllPreviousConferences();
        // console.log(res);
        setpreviousConf(res);
        setIsConferenceLoaded(true);
      } catch (error) {
        console.error('Failed to fetch conferences', error);
       
      }
      
    };
    
    fetchConferences();
    // console.log("up",previousConf);
    previousConf.map((conf)=>console.log((conf as Conference).title));
  }, [getAllPreviousConferences]);

  return (
    <div className="bg-blue-300 h-full min-h-screen p-3">
        <h1 className="flex capitalize items-center justify-center font-serif font-semibold text-4xl">
        Previous Conferences
      </h1>
      
      

      <div  className="grid grid-cols-12  m-1" >
        
        {isConferenceLoaded ? 
        previousConf.length > 0 ? (
          previousConf.map((conf, index) => (
            <div key={index}  className="flex col-span-6 w-full p-4">
             
              <MeetingCard conf={conf as Conference} typeState="previous"/>
            </div>
          ))
        ) : (
          <p>No previous conferences</p>
        )
      :
      <Loader/>}
      </div>
    </div>
  );
}

export default Page;

