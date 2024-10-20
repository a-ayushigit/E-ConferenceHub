import { mutation , query } from "./_generated/server";
import { v } from "convex/values";

// // functions required 
// //workflow :
// //user logs in , sees the list of upcoming conferences , gets a button to create a conference , submits the form  , after filling the form , gets two buttons to schedule a meeting or create a meeting 
// // on conference button , can click to register in the conference , register will add the user to the list of attendees 
// // On clicking view details button of conference card , after registration , join the session option will appear 

// // view details conference 
// // register in a conference 
// // how to ensure that only attendee can see the recordings of the session 
// export const registerUserforConference = mutation({
//     args: {
//         conferenceId : v.id("conference"),

//     } , 
//     handler: async(ctx , args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         const name = identity?.name;
//         if(!identity) throw new Error ("User not found ! Not authenticated!");
//         const user = await ctx.db.query("users").withIndex("token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();
        
//         const conference = await ctx.db.get(args.conferenceId)
//     if (user !== null && conference !== null) {
//         //if user present in the database that it had already registered for some conference before , register the user for the new conference by updating both the conference table and the user table 
//         await ctx.db.patch(user._id ,{
//             conferencesJoined : [args.conferenceId]
//         } )
//         await ctx.db.patch(conference._id , {
//             attendees : [...conference.attendees!!, { id: user._id, name:name ?? ""}]
//         } )
//     }
// }
// })

// export const displayConferenceDetails =mutation({
//     // get the conference details from the database using the conference id and return the details to the user
//     // check if the user is present in the attendees list of the conference , if yes , then display the join session button and the recordings of the session , else display the register button
//     args:{
//         conferenceId : v.id("conference")
//     },
//     handler: async(ctx , args)=>{
//         const conference = await ctx.db.get(args.conferenceId)
//         const identity = await ctx.auth.getUserIdentity();
//         if(!identity) throw new Error ("User not found ! Not authenticated!");
//         const user = await ctx.db.query("users").withIndex("token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();
//         if(user !== null && conference !== null){
//             const isUserAttendee = conference.attendees!!.some(attendee => attendee.id === user._id);
//             if(isUserAttendee){
//                 return (
//                     {conferenceDetails : conference,
//                     joinSessionButton : true,
//                     recordingsButton : true}
//                 );
//             }
//             else{
//                 return (
//                    { conferenceDetails : conference,
//                     joinSessionButton : false,
//                     recordingsButton : false}
//                 );
//             }

//     }


// }
// }) 

// export const createConference = mutation({
//     args:{ 
//         title:v.string(),
//         sessions:v.array(v.string()) , 
//         dateTime:v.string(),
//         speakers: v.array(v.string()),
//         organizer:v.string(), 
//         attendees:v.optional(v.array(v.object({
//             id:v.id("users"),
//             name:v.string()

//         })))
//     },
//     handler:async(ctx,args) =>{
//         const confId = await ctx.db.insert("conference" , {
//             title: args.title,
//             sessions: args.sessions,
//             dateTime: args.dateTime,
//             speakers: args.speakers,
//             organizer: args.organizer,
//             attendees: args.attendees,
            
//         })
//         console.log("conference Id returned to frontend :",confId);
//         return {
//             conferenceId: confId
//         }
      
//     }
// })
export const getUser = mutation({
    args:{},
    handler:async(ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log(identity);
        console.log("hello user");
        console.log(identity?.tokenIdentifier);
    }

})





