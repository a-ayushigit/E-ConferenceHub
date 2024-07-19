import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

//for roles defined for different users 
export default defineSchema({
    conference: defineTable({
          //unique id for each conference
        orgId:v.optional(v.string()),
        title:v.string(),
        subject:v.string(),
        sessions:v.optional(v.array(v.object({ description:v.string() , dateTime:v.string() }))) , 
        startDate:v.optional(v.string()),
        endDate:v.optional(v.string()),
        speakers:v.optional( v.array(v.string())),
        organizer:v.optional(v.string()),//will be token identifier  
        attendees: v.optional(v.array(v.object({
            id:v.id("users"),
            name:v.string()

        }))),
        meetingLink:v.optional(v.string()),
       
    }).index("name" , ['title']), 
    users: defineTable({
        name:v.string() , 
        tokenIdentifier:v.string(),
        conferencesJoined:v.array(v.string()),
        conferencesCreated:v.array(v.string()), 
        role:v.string(),
   }).index("token" , ['tokenIdentifier']), 
    session: defineTable({
        title:v.string() , 
        description:v.string() , 
        speaker:v.string(),
        date:v.string(),
        time:v.string(),
        attendees: v.array(v.object({
            id:v.id("users"),
            name:v.string()

        }))
    })
})
