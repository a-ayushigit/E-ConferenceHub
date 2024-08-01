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

type Conference = {

    orgId: string,
    _creationTime: string,
    title: string,
    subject: string,
    sessions: [{ description: string, dateTime: string }],
    startDate: string,
    endDate: string,
    speakers: [string],
    organizer: string,//will be token identifier  
    attendees: [{
        tokenIdentifier: string,
        name: string

    }],
    meetingLink: string,
}

interface MeetingCardProps {
    conf: Conference;
}




const MeetingCard: React.FC<MeetingCardProps> = ({ conf }) => {
    const { user } = useUser();
    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });
    const [invite, setInvite] = useState(false);
    const [inviteList, setInviteList] = useState(false);
    console.log(conf);
    const { organization } = useOrganization();
    const setAttendees = useMutation(api.conference.setAttendees);
    const ti = `https://fresh-tiger-39.clerk.accounts.dev|${user?.id}`;

    const conference = useQuery(api.conference.getConferenceForClient, { name: conf.title });
    console.log(conference);


   
    return (
        <div className="bg-yellow-300 font-semibold text-blue-950 flex flex-col items-start p-2 m-1 gap-1">
            <h2>{conf.title}</h2>
            <p>Organizer: {conf.organizer}</p>
            <p>Date: {conf.startDate} - {conf.endDate}</p>
            {/* <p>Speakers: {conf.speakers.join(', ')}</p> */}
            <div className={`${((user?.id) && (conf.attendees?.map((attendee) => {
                return attendee.tokenIdentifier === ti;
            })) || (user?.id === conf.organizer)) ? "flex" : "hidden"}`}>
                <button className="bg-blue-400 text-blue-900" onClick={() => {
                    navigator.clipboard.writeText(conf.meetingLink.toString())
                        .then(() => {
                            console.log('Meeting link copied to clipboard');
                        })
                        .catch((error) => {
                            console.error('Failed to copy meeting link: ', error);
                        });
                }}>Copy Meeting Link</button>
                <button>Join Meeting</button>
            </div>

            <p>Sessions: {conf.sessions.map((session, i) => (i + 1) + '. ' + session.description + ', ' + session.dateTime).join(', ')}</p>

            {/* Don't use includes as it compares the actual objects not the properties of the objects , use some instead  */}
            <div className={`${(((user?.id) && (user?.id === conf.organizer)) || ((conf.attendees.some((attendee)=>attendee.tokenIdentifier === ti)))) ? "hidden" : "flex"}`}>
                <button className="bg-blue-400 text-blue-900"
                    onClick={() => {
                        user && conference ? setAttendees({ tokenIdentifier: ti, name: user?.fullName ? user.fullName : "user", conferenceId: conference?._id }) :
                            console.log("no user present!!!");
                    }}
                >

                    Register for the  meeting
                </button>
            </div>



            <div className={`${((user?.id) && (user?.id === conf.organizer)) ? "flex" : "hidden"}`}>
                <button className="bg-blue-400 text-blue-900"
                    onClick={() => {
                        setActive ? setActive({ organization: conf.orgId }) : null;
                        console.log(organization?.id === conf.orgId);
                        console.log(organization?.id);
                        console.log(organization);
                        console.log(conf.orgId);
                        setInvite(!invite);
                    }}
                >Invite</button>


            </div>

            <div className={`${invite ? "flex container" : "hidden"}`}>
                <InviteMember />
            </div>
            <button onClick={() => setInviteList(!inviteList)}>
                View Invite List
            </button>
            <div className={`${inviteList ? "flex container" : "hidden"}`}>
                <InvitationList />
            </div>




        </div>
    )
}

export default MeetingCard
