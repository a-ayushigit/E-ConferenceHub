"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect , useState } from 'react'
import {useMutation, useQuery} from 'convex/react'
import { api } from '@/convex/_generated/api'
const page = () => {
    const { user } = useUser();
    const [conferencesList, setConferencesList] = useState<Object[]>([]);

    const ti = `https://fresh-tiger-39.clerk.accounts.dev|${user?.id}`;

    // Use `useQuery` to fetch user data
    const curUser = useQuery(api.user.getUser,  { tokenIdentifier: ti });
   const getConferences = useMutation(api.conference.getConferences);
    useEffect(() => {
       const fetchConference = async() => {
        try{
          const confList:Object[] = [];
          curUser?.conferencesCreated?.map(async (conf)=>{
            const res = await getConferences({orgId:conf.orgId});
            if(res !== undefined || res !== null){
              confList.push(res?res:{});
            }
           
          })
          
        }
        catch(error){
          console.log(error);
        }
       }
    }, [curUser]);

    if (!user) {
        return <div>Loading user...</div>;
    }

    if (!curUser) {
        return <div>Loading user data...</div>;
    }
  return (
    <div>
     <h1>Welcome {user?.fullName}</h1> 
    <div>
     {/* {conferencesList.map((conference, i)=>(
        <div key={i}>
        
        </div>
     ))} */}
     Image Processing
    </div>
    </div>
  )
}

export default page
