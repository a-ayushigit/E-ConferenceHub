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
        orgId:v.string(),
        tokenId:v.string(),
        role:v.string(),
    },
    handler:async(ctx , args)=>{
        try{
            const { orgId , tokenId , role} = args;
            const user = await ctx.db.query("users").withIndex("token" , (q)=>q.eq("tokenIdentifier" , tokenId)).unique();
            if (!user) throw new Error("User not found");
            const conferencesJoined =  user.conferencesJoined || [];
            if(!conferencesJoined.some((conference) => conference.orgId === orgId && conference.role===role)){
                conferencesJoined.push({orgId: orgId, role:role});
                await ctx.db.patch(user._id, { conferencesJoined });
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

export const addCreatedConference = internalMutation({
    args:{
        orgId:v.string(),
        tokenId:v.string(),
        role:v.string(),
    },
    handler:async(ctx , args)=>{
        try{
            const { orgId , tokenId , role} = args;
            const user = await ctx.db.query("users").withIndex("token" , (q)=>q.eq("tokenIdentifier" , tokenId)).unique();
            if (!user) throw new Error("User not found");
            const conferencesCreated =  user.conferencesCreated || [];
            if(!conferencesCreated.some((conference) => conference.orgId === orgId && conference.role===role)){
                conferencesCreated.push({orgId: orgId, role:role});
                await ctx.db.patch(user._id, { conferencesCreated });
                console.log("Attended conference added");
                return conferencesCreated;
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

export const getUserConference = query({
    args:{
        tokenIdentifier: v.string(),
    } , 
    handler:async(ctx , args)=>{
        try {
            const { tokenIdentifier} = args ; 
            const user = await ctx.db.query("users").withIndex("token" ,(q)=>q.eq("tokenIdentifier" , tokenIdentifier)).unique();
            if (!user) throw new Error("User not found");
            const conferencesCreated = user.conferencesCreated;
            const conferencesAttended = user.conferencesJoined;
            return {
                conferencesCreated:conferencesCreated,
                conferencesAttended:conferencesAttended
            }

        } catch (error) {
            console.log("Error sending the conferences !!!")

        }
        

    }
})