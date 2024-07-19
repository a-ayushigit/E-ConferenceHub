'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import CreateConference from '@/components/CreateConference'
import Link from 'next/link'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Page = () => {
  const getAllPreviousConferences = useMutation(api.conference.getAllPreviousConferences);
  const [previousConf, setpreviousConf] = useState<Object[]>([]);
  
 type Conference = {
  orgId: string,
  _creationTime: string,
  title:string,
  subject:string,
  sessions:[{ description:string , dateTime:string }] , 
  startDate:string,
  endDate:string,
  speakers:[string],
  organizer:string,//will be token identifier  
  attendees: [{
      id:string,
      name:string

  }],
  meetingLink:string,
 }
  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const res = await getAllPreviousConferences();
        console.log(res);
        setpreviousConf(res);
      } catch (error) {
        console.error('Failed to fetch conferences', error);
       
      }
      
    };
    
    fetchConferences();
    console.log("up",previousConf);
    previousConf.map((conf)=>console.log((conf as Conference).title));
  }, [getAllPreviousConferences]);

  return (
    <div>
      <h1 className="flex capitalize items-center justify-center font-serif font-semibold">
        Previous Meetings
      </h1>
      
      

      <div>
        
        {previousConf.length > 0 ? (
          previousConf.map((conf, index) => (
            <div key={index}>
              <h2>{(conf as Conference).title}</h2>
              <p></p>
            </div>
          ))
        ) : (
          <p>No previous conferences</p>
        )}
      </div>
    </div>
  );
}

export default Page;

