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
      return ctx.db.query("users").withIndex("token", (q)=>q.eq("tokenIdentifier", args.tokenIdentifier)).unique();
    },
  });