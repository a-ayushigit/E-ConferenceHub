'use client'
import { api } from '@/convex/_generated/api';
import { useOrganizationList, useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import React, { FormEventHandler, useState, useEffect } from 'react';
import { Call, useCalls, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from 'next/navigation';
// import {Textarea} from "@nextui-org/input";
interface Session {
  dateTime: string;
  description: string;
}

const CreateConference = () => {
  const { createOrganization } = useOrganizationList();
  const createConference = useMutation(api.conference.createConference);
  const [organizationName, setOrganizationName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [subject, setSubject] = useState("");
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [description , setDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [values, setValues] = useState({ dateTime: '', description: '' });
  const [callDetails, setCallDetails] = useState<Call>();

  const router = useRouter();
  useEffect(() => {
    console.log("Sessions updated:", sessions);
  }, [sessions]);

  const addSession = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const session: Session = {
      dateTime: values.dateTime,
      description: values.description,
    };

    const now = new Date(Date.now());
    if (new Date(session.dateTime) < now) {
      console.log(`Session ${session.dateTime} is not valid now`);
      return;
    }

    setSessions((prevSessions) => [...prevSessions, session]);
    setValues({ dateTime: '', description: '' });
  };

  const generateCallLink = async (startAt: string, description: string) => {
    if (!client || !user) {
      console.log("no client or user");
      return '';
    }
    if (!startAt) {
      console.log("no dateTime");
      return '';
    }
    const id = crypto.randomUUID();
    const call = client?.call('default', id);
    if (!call) throw new Error('Failed to create a call');
    const startsAt = new Date(startAt).toISOString();

    await call.getOrCreate({
      data: {
        starts_at: startsAt,
        custom: {
          description: description,
        }
      }
    });
    setCallDetails(call);
    console.log(call);
    const meetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
    return meetLink;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      // Ensure that sessions is not empty before calling generateCallLink
      if (sessions.length === 0) {
        console.log('No sessions to generate meeting link for');
        return;
      }

      const firstSession = sessions[0];
      const meetLink = await generateCallLink(firstSession.dateTime, firstSession.description);
      if (!meetLink) {
        console.log('Failed to generate meeting link');
        return;
      }
      setMeetingLink(meetLink);

      if (createOrganization) {
        await createOrganization({ name: organizationName });
      }

      const confId = await createConference({
        title: organizationName,
        subject: subject,
        organizer: user ? user.id : '',
        startDate: startDate,
        endDate: endDate,
        meetingLink: meetLink,
        sessions: sessions,
        description: description
      });

      setOrganizationName("");
      setSubject("");
      setSessions([]);
      setMeetingLink('');

      console.log("Conference created with confId:", confId);
      if(confId) router.push('/upcoming');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-5">
      <label className="font-bold">Title</label>
      <input
        type="text"
        name="conferenceName"
        value={organizationName}
        placeholder="Conference Name"
        onChange={(e) => setOrganizationName(e.target.value)}
        className="flex focus:border-none p-2 rounded-xl"
      />
      <label className="font-bold">Subject</label>
      <input
        type="text"
        name="conferenceSubject"
        value={subject}
        placeholder="Subject"
        onChange={(e) => setSubject(e.target.value)}
        className="flex focus:border-none p-2 rounded-xl"
      />
      <div className="flex flex-row gap-1 justify-between w-full">
        <div className="flex flex-col ">
        <label className="font-bold">Start Date</label>
      <input
        type="datetime-local"
        name="startDate"
        value={startDate}
        onChange={(e) =>{
          const newDate = Date.parse((e.target.value).toString()) ;
          const curDate = new Date(Date.now());
          const now = Date.parse(curDate.toString());
          if (newDate < now){
             return new Error("Invalid start Date: " + newDate)
          }
          setStartDate(e.target.value);


        } }
        className="flex flex-grow focus:border-none p-2 rounded-xl w-full"
      />
        </div>
      <div className="flex flex-col ">
      <label className="font-bold">End Date</label>
      <input
        type="datetime-local"
        name="endDate"
        value={endDate}
        onChange={(e) =>{
          const newDate = Date.parse((e.target.value).toString()) ;
          const curDate = new Date(Date.now());
          const start = Date.parse(startDate.toString());
          const now = Date.parse(curDate.toString());
          if ((newDate < now) || (newDate < start) ){
             return new Error("Invalid end Date: " + newDate)
          }
          setEndDate(e.target.value);
        } }
        className="flex w-full flex-grow focus:border-none p-2 rounded-xl"
      />
      </div>
      
      </div>
      
      <label className="font-bold">Description </label>
      <textarea
      name="description"
      value={description}
      placeholder="Give a Brief Description"
      onChange={(e) => setDescription(e.target.value)}
      className="flex focus:border-none p-2 rounded-xl"/> 
    
      <h3 className="font-bold">Session Details</h3>
      <label>Name of session</label>
      <input
        type="text"
        className="border-spacing-1 p-2 m-1 w-full rounded-xl"
        value={values.description}
        placeholder="Session Name"
        onChange={(e) => setValues({ ...values, description: e.target.value })}
      />
      <label>Date and Time</label>
      <input
        type="datetime-local"
        className="border-spacing-1 p-2 m-1 w-full rounded-xl"
        value={values.dateTime}
        onChange={(e) => {
          const sessionDate = Date.parse((e.target.value).toString());
          const start = Date.parse(startDate.toString());
          const end = Date.parse(endDate.toString());
          if(sessionDate < start || sessionDate > end)
            return new Error("Session date should be between start and end date");
          
          setValues({ ...values, dateTime: e.target.value });
        }
        }
      />
      <button type="button" onClick={addSession}>Add Session</button>
      {sessions.map((session, index) => (
        <div key={index} className={`${session.dateTime === '' ? "hidden" : "flex flex-col"}`}>
          <label>Name of session: {session.description}</label>
          <label>Date and Time: {session.dateTime}</label>
        </div>
      ))}
      <button type="submit">Create Conference</button>
    </form>
  );
};

export default CreateConference;
