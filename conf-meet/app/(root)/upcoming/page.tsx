'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import CreateConference from '@/components/CreateConference'
import Link from 'next/link'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import MeetingCard from '@/components/MeetingCard'

const Page = () => {
  const getAllUpcomingConferences = useMutation(api.conference.getAllUpcomingConferences);
  const [upComingConf, setUpComingConf] = useState<Object[]>([]);
  
 type Conference = {
  _id:string,
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
      tokenIdentifier:string,
      name:string

  }],
  meetingLink:string,
 }
  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const res = await getAllUpcomingConferences();
        console.log(res);
        setUpComingConf(res);
      } catch (error) {
        console.error('Failed to fetch conferences', error);
       
      }
      
    };
    
    fetchConferences();
    console.log("up",upComingConf);
    upComingConf.map((conf)=>console.log((conf as Conference).title));
  }, [getAllUpcomingConferences]);

  return (
    <div>
      <h1 className="flex capitalize items-center justify-center font-serif font-semibold">
        Upcoming Meetings
      </h1>
      
      <Link href="/create/conference">
        <Button>
          Create Conference
        </Button>
      </Link>

      <div className="flex flex-col m-1">
        
        {upComingConf.length > 0 ? (
          upComingConf.map((conf, index) => (
            <div key={index} >
              <MeetingCard conf={conf as Conference}/>
            </div>
          ))
        ) : (
          <p>No upcoming conferences</p>
        )}
      </div>
    </div>
  );
}

export default Page;
