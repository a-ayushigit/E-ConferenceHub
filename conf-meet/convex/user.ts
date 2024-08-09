import { internalMutation, mutation , query , internalQuery } from "./_generated/server";
import { v } from "convex/values";


export const createUser = internalMutation({
    args:{
        name:v.string() , 
        tokenIdentifier:v.string(),
    }, 
    handler:async(ctx,args)=>{
        try {
            const user = await ctx.db.insert("users", {
                name: args.name,
                tokenIdentifier: args.tokenIdentifier
            })
            console.log("User created successfully")
            return user;
        } catch (error) {
            console.log(error);
        }
    }
});

export const getUser = query({
    args: { tokenIdentifier : v.string() },
    handler: async (ctx, args) => {
        try{
            return ctx.db.query("users").withIndex("token", (q)=>q.eq("tokenIdentifier", args.tokenIdentifier)).unique();
        }
        catch(error){
            console.log(error);
        }
      
    },
  });

export const addAttendingConference = mutation({
    args:{
        conferenceId:v.string(),
        userId:v.id("users"),
        role:v.string(),
    },
    handler:async(ctx , args)=>{
        try{
            const { conferenceId , userId , role} = args;
            const user = await ctx.db.get(userId);
            if (!user) throw new Error("User not found");
            const conferencesJoined =  user.conferencesJoined || [];
            if(!conferencesJoined.some((conference) => conference.confId === conferenceId && conference.role===role)){
                conferencesJoined.push({confId: conferenceId, role:role});
                await ctx.db.patch(userId, { conferencesJoined });
                console.log("Attended conference added");
                return conferencesJoined;
            }
            else{
                throw new Error ("Already added the conference ! ");
            }

        }
        catch(error){
            console.log(error);
        }
    }
})