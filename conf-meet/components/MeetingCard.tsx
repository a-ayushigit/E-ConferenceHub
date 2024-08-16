import { useOrganization, useOrganizationList, useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { InviteMember } from './InviteMember';
import InvitationList from './InvitationList';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

type Conference = {

    orgId: string,
    _creationTime: string,
    title: string,
    subject: string,
    sessions: [{ name: string, description: string, dateTime: string }],
    startDate: string,
    endDate: string,
    speakers: [string],
    organizer: { userId: string, userName: string },//will be token identifier  
    attendees: [{
        tokenIdentifier: string,
        name: string

    }],
    meetingLink: string,
}

interface MeetingCardProps {
    conf: Conference;
    typeState: String;
}




const MeetingCard: React.FC<MeetingCardProps> = ({ conf, typeState }) => {
    const { user } = useUser();
    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });
    const [invite, setInvite] = useState(false);
    const [inviteList, setInviteList] = useState(false);
    //console.log(conf);
    const { organization } = useOrganization();
    const setAttendees = useMutation(api.conference.setAttendees);
    const addAttendingConference = useMutation(api.user.addAttendingConference);
    const ti = `https://fresh-tiger-39.clerk.accounts.dev|${user?.id}`;
    const router = useRouter()
    const conference = useQuery(api.conference.getConferenceForClient, { name: conf.title });
    //console.log(conference);


    const setConferenceAttendee = async () => {
        (user && conference) ?

            setAttendees({ tokenIdentifier: ti, name: user?.fullName ? user.fullName : "user", conferenceId: conference?._id }).then(() => {
                addAttendingConference({
                    orgId: conference?.orgId ? conference.orgId : "",
                    tokenId: ti,
                    role: "attendee",
                }).then(() => {
                    toast.success("Attendee added successfully");
                    router.push(`/conference/${conference._id}`);
                })

            })


            :
            console.log("no user present!!!");

    }


    return (
        <div className="bg-yellow-100 rounded-xl border border-blue-950 font-semibold text-blue-950 flex flex-col items-start p-2 m-1 gap-1 w-full">
            <h2 className="flex flex-row font-bold self-center text-2xl">{conf.title}</h2>
            <p className="flex  self-start text-lg p-2">Organizer: {conf.organizer.userName}</p>

            <p>Date: {new Date(conf.startDate).toLocaleString()} - {new Date(conf.endDate).toLocaleString()}</p>
            {/* <p>Speakers: {conf.speakers.join(', ')}</p> */}


            <p><span className="flex font-bold h-auto">Sessions:</span>
                <br />
                {conf.sessions.map((session, i) =>
                    <React.Fragment key={i}>
                        {i + 1}. {session.name}, {new Date(session.dateTime).toLocaleString()}
                        <br />
                    </React.Fragment>)}
            </p>

            <div className={`${typeState == 'upcoming' ? "flex" :"hidden"}`}>

                
                      {/* Don't use includes as it compares the actual objects not the properties of the objects , use some instead  */}
            <div className={`${(((user?.id) && (ti === conf.organizer.userId)) || (conf.attendees && (conf.attendees.some((attendee) => attendee.tokenIdentifier === ti)))) ? "hidden" : "flex"}`}>
                <button className="bg-blue-200 text-blue-900 rounded-xl p-3 hover:shadow-lg"
                    onClick={() => {
                        setConferenceAttendee();
                    }}
                >

                    Register for the  meeting
                </button>
            </div>



            <div className={`${((ti) && (ti === conf.organizer.userId)) ? "flex" : "hidden"}`}>
                <button className="bg-blue-200 text-blue-900 rounded-xl p-3 hover:shadow-lg"
                    onClick={() => {
                        setActive ? setActive({ organization: conf.orgId }) : null;
                        //console.log(organization?.id === conf.orgId);
                        //console.log(organization?.id);
                        //console.log(organization);
                        //console.log(conf.orgId);
                        setInvite(!invite);
                    }}
                >Invite</button>
                <div className={`${invite ? "flex container" : "hidden"} flex flex-row p-2`}>
                    <InviteMember />
                </div>

            </div>


            <button className="bg-blue-200 text-blue-900 rounded-xl p-3 hover:shadow-lg" onClick={() => setInviteList(!inviteList)}>
                View Invite List
            </button>
            <div className={`${inviteList ? "flex container" : "hidden"}`}>
                <InvitationList />
            </div>

            <div className={`${((user?.id) && (conf.attendees?.map((attendee) => {
                return attendee.tokenIdentifier === ti;
            })) || (ti === conf.organizer.userId)) ? "flex" : "hidden"}`}>
                <div className="flex flex-row gap-3 p-1 ">
                    <button className="bg-blue-200 text-blue-900 rounded-xl p-3 hover:shadow-lg" onClick={() => {
                        navigator.clipboard.writeText(conf.meetingLink.toString())
                            .then(() => {
                                console.log('Meeting link copied to clipboard');
                            })
                            .catch((error) => {
                                console.error('Failed to copy meeting link: ', error);
                            });
                    }}>Copy Meeting Link</button>
                    <button className="bg-blue-200 text-blue-900 rounded-xl p-3 hover:shadow-lg" onClick={() => router.push(conf.meetingLink.toString())}>Join Meeting</button>
                </div>

            </div>
            </div>


          


        </div>
    )
}

export default MeetingCard
