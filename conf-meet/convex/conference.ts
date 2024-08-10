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
         sessions:v.optional(v.array(v.object({ description:v.string() , dateTime:v.string() }))),
         description:v.string(),
         
    },
    handler:async(ctx,args) =>{
        try {
            const confId = await ctx.db.insert("conference" , {
                // unique id for each conference
                
                title:args.title,
                subject:args.subject,
                organizer:args.organizer,
                startDate:args.startDate,
                endDate:args.endDate,
                sessions:args.sessions,
                meetingLink:args.meetingLink,
                description:args.description
  
      })
          console.log("conference Id returned to frontend :",confId);
          //conference Id returned to the frontend is the same as the one stored in the table 
          return {
              conferenceId: confId
          }
            
        } catch (error) {
            console.log(error);
        }
      
    }
})

export const getConference = internalQuery({
    args:{
        name:v.string()
        
    
    },
    handler:async(ctx,args)=>{
        try {
            if(args.name){
                const conference = await ctx.db.query("conference").withIndex("name", (q) =>
                    q.eq("title", args.name)).unique()
                console.log("conference sent successfully")
                return conference;
            }
            
            else{
                throw new Error("Provide name")
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }
})

export const getConferenceForClient = query({
    args:{
        name:v.string()
        
    
    },
    handler:async(ctx,args)=>{
        try {
            if(args.name){
                const conference = await ctx.db.query("conference").withIndex("name", (q) =>
                    q.eq("title", args.name)).unique()
                console.log("conference sent successfully")
                return conference;
            }
            
            else{
                throw new Error("Provide name")
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }
})

export const getConferenceDetails = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
      return await ctx.db.query("conference").filter((q)=> q.eq(q.field("_id"), args.id)).collect();
    },
})

export const giveOrgIdtoConference = internalMutation({
    args:{
        conferenceId:v.id("conference"),
        orgId:v.string()
        
    
    },
    handler:async(ctx,args)=>{
        try {
            await ctx.db.patch(args.conferenceId, {
                orgId: args.orgId
            })
            console.log("Organizer updated")
            return  
        } catch (error) {
            console.log(error);
        }
       
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
        const offset = curDate.getTimezoneOffset();
        console.log(curDate);
        const now = Date.parse(new Date(curDate.getTime() - offset ).toString());

        const allConferences = await ctx.db.query("conference").collect();
        //console.log(allConferences);
        const upComingConf: Object[] = [];
        allConferences.map((conference)=>{
           
         const date = conference.startDate || "";
        
         const ndate = Date.parse(date);
         
         console.log("now ",now);
         console.log(ndate);
         console.log(ndate > now);
          if(ndate > now){
            upComingConf.push(conference);
          }
        })
        console.log("upcomingConf ",upComingConf);
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

export const setAttendees = mutation({
    args:{
        tokenIdentifier : v.string(),
        conferenceId : v.id("conference"),
        name : v.string(),
    },
    handler:async(ctx,args)=>{
        try{
            const {conferenceId , tokenIdentifier} = args;
            const conference = await ctx.db.get(conferenceId);
            if(!conference){
                throw new Error("Conference not found");
            }
            /***** Method to update the attendee List *****    ******/
            const attendees = conference.attendees || [];
            if(!attendees.some((attendee) => attendee.tokenIdentifier === tokenIdentifier && attendee.name === args.name)){
                attendees.push({tokenIdentifier: tokenIdentifier , name:args.name});
                await ctx.db.patch(conferenceId, { attendees });
                console.log("Attendee added");
                return conference;
            }
            else{
                throw new Error ("Attendee already added ");
            }

        }
        catch(error){
            console.log(error);
        }

    }
})
