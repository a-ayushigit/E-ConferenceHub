import { useOrganization, useOrganizationList, useUser } from '@clerk/nextjs';
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { InviteMember } from './InviteMember';


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
        id: string,
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
      const { organization } = useOrganization();
    console.log(user)
    return (
        <div className="bg-yellow-300 font-semibold text-blue-950 flex flex-col items-start p-2 m-1 gap-1">
            <h2>{conf.title}</h2>
            <p>Organizer: {conf.organizer}</p>
            <p>Date: {conf.startDate} - {conf.endDate}</p>
            {/* <p>Speakers: {conf.speakers.join(', ')}</p> */}
            <button className="bg-blue-400 text-blue-900" onClick={() => {
                navigator.clipboard.writeText(conf.meetingLink.toString())
                    .then(() => {
                        console.log('Meeting link copied to clipboard');
                    })
                    .catch((error) => {
                        console.error('Failed to copy meeting link: ', error);
                    });
            }}>Copy Meeting Link</button>
            <p>Sessions: {conf.sessions.map((session, i) => (i + 1) + '. ' + session.description + ', ' + session.dateTime).join(', ')}</p>
            <button className="bg-blue-400 text-blue-900">Join Meeting</button>
            
            <Dialog>
                <DialogTrigger>
                <button className="bg-blue-400 text-blue-900" 
                onClick={()=>{
                    setActive?({ organization: conf.orgId }):null;
                    console.log(organization?.id === conf.orgId) ;
                }}
                >Invite</button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite Members</DialogTitle>
                        <DialogDescription>
                            <InviteMember/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>



        </div>
    )
}

export default MeetingCard
