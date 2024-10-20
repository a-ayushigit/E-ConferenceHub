import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

//for roles defined for different users 
export default defineSchema({
    conference: defineTable({
          //unique id for each conference
        orgId:v.optional(v.string()),
        title:v.string(),
        subject:v.string(),
        sessions:v.optional(v.array(v.object({ name:v.string() ,description:v.string() , dateTime:v.string() }))) , 
        startDate:v.optional(v.string()),
        endDate:v.optional(v.string()),
        speakers:v.optional( v.array(v.string())),
        organizer:v.optional(v.object({userId:v.string(), userName:v.string()})),//will be token identifier  + name
        attendees: v.optional(v.array(v.object({
            tokenIdentifier:v.string(),
            name:v.string()
        }))),
        meetingLink:v.optional(v.string()),
        description:v.optional(v.string()),
       
    }).index("name" , ['title']).index("orgId" , ["orgId"]), 
    users: defineTable({
        name:v.string() , 
        tokenIdentifier:v.string(),
        conferencesCreated:v.optional(v.array(v.object({
            orgId:v.string(),
            role:v.string()
        }))),
        conferencesJoined:v.optional(v.array(v.object({
            orgId:v.string(),
            role:v.string()
        }))), 
        
   }).index("token" , ['tokenIdentifier']), 
    session: defineTable({
        title:v.string() , 
        description:v.string() , 
        speaker:v.string(),
        date:v.string(),
        time:v.string(),
        attendees: v.array(v.object({
            tokenIdentifier:v.string(),
            name:v.string()

        })),

    })
})
