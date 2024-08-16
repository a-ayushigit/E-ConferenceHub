"use client"
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme , Call, useStreamVideoClient, CallRecordingListItem , DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk';
import { useGetCallById } from '@/hooks/useGetCallById';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { Button } from '../../../../components/ui/button';


const meetingPage = ({params : {id}}: {params:{id:string}}) => {
  const { user , isLoaded } = useUser();
  const [isSetupComplete , setIsSetupComplete] = useState(false);
  const [call , setCall] = useState<Call>();
  const [isMicCamOn , setIsMicCamOn] = useState(false);
const [isCallLoading , setIsCallLoading] = useState(true);
const client = useStreamVideoClient();

useEffect(()=>{
 if(!client) return ;
 const loadCall = async () =>{
  try {
    const { calls } = await client.queryCalls({
      filter_conditions: {
        id,
      },
    });
   
    if (calls.length > 0) {
      setCall(calls[0]);
    } else {
      console.error("No call found with the specified ID");
    }
    console.log("call ",call);
  
    if (!isMicCamOn){
      call?.camera.disable();
      call?.microphone.disable();
  }
  else{
      call?.camera.enable();
      call?.microphone.enable();  
  }
  } catch (error) {
    console.error("Error loading call:", error);
  } finally {
    setIsCallLoading(false);
  }
 }
 loadCall();
}, [client , id]);
  // const {call , isCallLoading} = useGetCallById(id);
  // if(!call) throw new Error ("call not found !")
  if (isCallLoading) {
    return <div>Loading call...</div>; // or you can replace this with a spinner or loading component
  }

  if (!call) {
    return <div>Call not found!</div>; // You can customize this message as needed
  }
  console.log("call ",call);
  return (
 <main className="h-screen w-full">
<StreamCall call={call}>
  <StreamTheme>
    {!isSetupComplete?
    // <MeetingSetup setIsSetUpComplete = {setIsSetupComplete} isCallLoading = {isCallLoading} />
    <>
     <div className="flex bg-blue-950 h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold "> SetUp </h1>
      <VideoPreview className="flex h-[55vh] w-[90vw] p-2 m-1 justify-center"/>
      <div className="flex gap-2 h-8 text-white justify-center items-end">
        <label>
            <input type="checkbox" checked={isMicCamOn} onChange={(e)=>{setIsMicCamOn(e.target.checked)}} />
            Join with mic and camera off 
        </label>
        <DeviceSettings/>
        
      </div>
      <Button className=" rounded-md bg-blue-400 text-white px-4 py-2.5 " onClick={()=>{call.join(); setIsSetupComplete(true)}}>
            Join Meeting
        </Button>
    </div>
    
    </>
    :<MeetingRoom/>}
  </StreamTheme>
</StreamCall>
 </main>
  )
}

export default meetingPage
