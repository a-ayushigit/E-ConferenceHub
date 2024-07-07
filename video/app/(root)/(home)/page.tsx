import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-IN', { 'hour':'2-digit' , 'minute':'2-digit'});
  const date = (new Intl.DateTimeFormat('en-IN' , { 'dateStyle' : 'full'})).format(now);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[15rem] w-full rounded-[2rem] bg-hero bg-repeat-round opacity-[0.80]">
        <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="flex self-center px-2 text-blue-950 font-extrabold  text-base glassmorphism py-3 max-w-[27rem] text-center ">Upcoming Conference at : 12:30pm</h2>
            <div className="flex flex-col gap-2">
                <h1 className="flex self-center text-4xl font-extrabold lg:text-7xl text-blue-2">{time}</h1>
                <p className="flex justify-start self-center font-bold text-lg  text-blue-950 pt-5">{date} </p>
            </div>
        </div>

      </div>
      <div>
        <MeetingTypeList/>
      </div>
    </section >
  )
}

export default Home
