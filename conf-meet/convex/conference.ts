import { internalMutation, mutation , query , internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const createConference = mutation({

    // orgId:v.optional(v.string()),
    // title:v.string(),
    // subject:v.string(),
    // sessions:v.optional(v.array(v.string())) , 
    // dateTime:v.optional(v.string()),
    // speakers:v.optional( v.array(v.string())),
    // organizer:v.string(),//will be token identifier  
    // attendees: v.optional(v.array(v.object({
    //     id:v.id("users"),
    //     name:v.string()

    // })))

    args:{ 
         // unique id for each conference  // or v.string()  // for testing purpose
        
         title:v.string(),
         subject:v.string(),
         organizer:v.string(),
         startDate:v.string(),
         endDate:v.string(),
         meetingLink:v.string(),
         sessions:v.optional(v.array(v.object({ description:v.string() , dateTime:v.string() })))
         
    },
    handler:async(ctx,args) =>{
        const confId = await ctx.db.insert("conference" , {
              // unique id for each conference
              
              title:args.title,
              subject:args.subject,
              organizer:args.organizer,
              startDate:args.startDate,
              endDate:args.endDate,
              sessions:args.sessions,
              meetingLink:args.meetingLink

    })
        console.log("conference Id returned to frontend :",confId);
        //conference Id returned to the frontend is the same as the one stored in the table 
        return {
            conferenceId: confId
        }
    }
})

export const getConference = internalQuery({
    args:{
        name:v.string()
        
    
    },
    handler:async(ctx,args)=>{
        if(args.name){
            const conference = await ctx.db.query("conference").withIndex("name", (q) =>
                q.eq("title", args.name)).unique()
            console.log("conference sent successfully")
            return conference;
        }
        
        else{
            throw new Error("Provide name")
        }
    }
})

export const giveOrgIdtoConference = internalMutation({
    args:{
        conferenceId:v.id("conference"),
        orgId:v.string()
        
    
    },
    handler:async(ctx,args)=>{
        await ctx.db.patch(args.conferenceId, {
            orgId: args.orgId
        })
        console.log("Organizer updated")
        return 
    }
})

export const getConferenceName = mutation({
    args:{}, 
    handler:async(ctx,args)=>{}
})

export const getConferenceSessions = mutation({
    args:{}, 
    handler:async(ctx,args)=>{}
})

export const inviteSpeakersToConference = mutation({
    args:{} , 
    handler:async(ctx,args)=>{}
})
//get all upcoming conferences 
export const getAllUpcomingConferences = mutation({
    args:{},
    handler:async(ctx , args)=>{
        const curDate = new Date(Date.now());
        const now = Date.parse(curDate.toString());
        const allConferences = await ctx.db.query("conference").collect();
        const upComingConf: Object[] = [];
        allConferences.map((conference)=>{
           
         const date = conference.startDate || "";
         const ndate = Date.parse(date);
          if(ndate > now){
            upComingConf.push(conference);
          }
        })
        
        return upComingConf;
    }
})

//get all previous conferences 
export const getAllPreviousConferences = mutation({
    args:{},
    handler:async(ctx , args)=>{
        const curDate = new Date(Date.now());
        const now = Date.parse(curDate.toString());
        const allConferences = await ctx.db.query("conference").collect();
        const previousConf: Object[] = [];
        allConferences.map((conference)=>{
           
         const date = conference.startDate || "";
         const ndate = Date.parse(date);
          if(ndate < now){
            previousConf.push(conference);
          }
        })
        
        return previousConf;
    }
})




// export const getUpcomingConferences = query(async ({ db }) => {
//   const curDate = new Date();
//   return await db
//     .query("conference")
//     .filter(q => q.gte(new Date(q.field('startDate')).getTime(), curDate.getTime()))
//     .collect();
// });
