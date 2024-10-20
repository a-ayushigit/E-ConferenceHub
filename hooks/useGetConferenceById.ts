import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {useState , useEffect} from 'react';

// type Conference = {
//     _id:string,
//     orgId: string,
//     _creationTime: string,
//     title:string,
//     subject:string,
//     sessions:[{ name:string,description:string , dateTime:string }] , 
//     startDate:string,
//     endDate:string,
//     speakers:[string],
//     organizer:{userId:string, userName:string},//will be token identifier  
//     attendees: [{
//         tokenIdentifier:string,
//         name:string
  
//     }],
//     meetingLink:string,
//    }

export const useGetConferenceById = (id : string ) => {
    // const [conference , setConference] = useState<Conference>();
    const conf= useQuery(api.conference.getConferenceDetails, { id:id });
    // setConference(conf);
    return conf;

}