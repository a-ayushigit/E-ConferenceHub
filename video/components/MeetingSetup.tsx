"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetUpComplete} : {setIsSetUpComplete:(value:boolean)=>void}) => {
    const [isMicCamOn , setIsMicCamOn] = useState(false);
    const call = useCall();

    if(!call) throw new Error ("Use call must be used within stream call component");

    useEffect(()=>{
        if (isMicCamOn){
            call?.camera.disable();
            call?.microphone.disable();
        }
        else{
            call?.camera.enable();
            call?.microphone.enable();  
        }
    }, [isMicCamOn , call?.camera , call?.microphone ])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold "> SetUp </h1>
      <VideoPreview className="flex h-[55vh] w-[90vw] p-2 m-1 justify-center"/>
      <div className="flex gap-2 h-8 text-white justify-center items-end">
        <label>
            <input type="checkbox" checked={isMicCamOn} onChange={(e)=>{setIsMicCamOn(e.target.checked)}} />
            Join with mic and camera off 
        </label>
        <DeviceSettings/>
        
      </div>
      <Button className=" rounded-md bg-blue-400 text-white px-4 py-2.5 " onClick={()=>{call.join(); setIsSetUpComplete(true)}}>
            Join Meeting
        </Button>
    </div>
  )
}

export default MeetingSetup
