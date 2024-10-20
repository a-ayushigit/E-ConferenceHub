"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect , useState } from 'react'
import {useMutation, useQuery} from 'convex/react'
import { api } from '@/convex/_generated/api'
const Page = () => {
    const { user } = useUser();
    const [conferencesList, setConferencesList] = useState<Object[]>([]);
    const [loading , setLoading] = useState(true);
    const ti = `https://fresh-tiger-39.clerk.accounts.dev|${user?.id}`;

    // Use `useQuery` to fetch user data
    const curUser = useQuery(api.user.getUser,  { tokenIdentifier: ti });
  //  const getConferences = useMutation(api.conference.getConferences);
   const userConferences = useQuery(api.user.getUserConference , {tokenIdentifier: ti});
    useEffect(() => {
      // if(curUser){
      //   console.log("curUser ",curUser);
      //   const fetchConference = async() => {
      //     const confList:Object[] = [];
      //    try{
           
      //      curUser?.conferencesCreated?.map(async (conf)=>{
      //        const res = await getConferences({orgId:conf.orgId});
      //        if(res !== undefined && res !== null){
             
      //         confList.push(res?res:{});
      //         console.log(confList);
      //         setLoading(false);
      //         setConferencesList(confList);
             
      //       }
      //     });
           
         
      //    }
      //    catch(error){
      //      console.log(error);
      //    }
        
        
      // }
      // fetchConference();
      // }

      console.log(userConferences);
      

    
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
     {!loading && conferencesList && conferencesList.length > 0 && conferencesList.map((conference, i)=>(
        <div key={i}>
         Hello
        </div>
     ))}
     
    </div>
    </div>
  )
}

export default Page
