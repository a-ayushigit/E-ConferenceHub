import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
//use of  double exclamation marks 
// !'personal' => false => !false =>true
//  undefined => !undefined = true => !true = false

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const CallLayout: React.FC<{ layout: CallLayoutType }> = ({ layout }) => {
    switch (layout) {
        case 'grid':
            return <PaginatedGridLayout />;
        case 'speaker-right':
            return <SpeakerLayout participantsBarPosition="left" />;
        case 'speaker-left':
            return <SpeakerLayout participantsBarPosition="right" />;
        default:
            return null;
    }
};

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);
    const { useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();
    const searchParams = useSearchParams();
    if(callingState !== CallingState.JOINED) return <Loader/>;

    
    const isPersonalRoom = !!searchParams.get('personal');


    // const CallLayout = () => {
    //     switch (layout) {
    //         case 'grid':
    //             return <PaginatedGridLayout />
    //         case 'speaker-right':
    //             return <SpeakerLayout participantsBarPosition="left" />
    //         case 'speaker-left':
    //             return <SpeakerLayout participantsBarPosition="right" />
    //         default:
    //             break;

    //     }
    // }
    return (
        <section className="h-screen relative w-full overflow-hidden pt-4 text-white ">
            <div className="relative flex size-full  items-center justify-center">
                <div className="flex h-[calc(100vh - 86px)] size-full max-w-[1000px] items-center">
                    <CallLayout layout={layout}/>
                </div>
                <div className={cn("h-[calc(100vh - 86px)] hidden ml-2 ", { "show-block": showParticipants })}>
                    <CallParticipantsList onClose={() => { setShowParticipants(false) }} />
                </div>

            </div>
            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
                <CallControls />
                <DropdownMenu>
                    <div className="flex items-center ">

                    <DropdownMenuTrigger className="cursor-pointer rounded-full bg-[#19232d] px-3 py-2 hover:bg-[#4c535b]">
                        <LayoutList size={20} className="text-white"/>
                    </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                        
                        {['Grid' , 'Speaker-Left' , 'Speaker-Right'].map((item , index) => (
                            <DropdownMenuItem className="cursor-pointer " onClick={()=>{
                                setLayout(item.toLowerCase() as CallLayoutType)
                            }} key={index}>{item}</DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="border border-dark-1" />
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton/>
                <Button className = "rounded-full px-3 py-1 bg-[#19232d]" onClick={()=>setShowParticipants((prev)=>!prev)}>
                 <div className="cursor-pointer rounded-full   hover:bg-[#4c535b]">
                       <Users size={19}  className="text-white "/> 
                 </div>
                </Button>
            {!isPersonalRoom && <EndCallButton/>}
            </div>
        </section>
    )
}

export default MeetingRoom
