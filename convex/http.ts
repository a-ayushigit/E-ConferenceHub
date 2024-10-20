import { GenericActionCtx, httpRouter } from "convex/server";

import { internal  } from "./_generated/api";
import { httpAction } from "./_generated/server";

import { mutation , query } from "./_generated/server";
import { ConvexError } from "convex/values";

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      });
      console.log("hello");

      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.user.createUser, {
            tokenIdentifier: `https://fresh-tiger-39.clerk.accounts.dev|${result.data.id}`,
            name: `${result.data.first_name ?? ""} ${
              result.data.last_name ?? ""
            }`,
           
          });
          break;
        // case "user.updated":
        //   await ctx.runMutation(internal.users.updateUser, {
        //     tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.id}`,
        //     name: `${result.data.first_name ?? ""} ${
        //       result.data.last_name ?? ""
        //     }`,
        //     image: result.data.image_url,
        //   });
        //   break;
        // case "organizationMembership.created":
        //   await ctx.runMutation(internal.users.addOrgIdToUser, {
        //     tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
        //     orgId: result.data.organization.id,
        //     role: result.data.role === "org:admin" ? "admin" : "member",
        //   });
        //   break;
        // case "organizationMembership.updated":
        //   console.log(result.data.role);
        //   await ctx.runMutation(internal.users.updateRoleInOrgForUser, {
        //     tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
        //     orgId: result.data.organization.id,
        //     role: result.data.role === "org:admin" ? "admin" : "member",
        //   });
        //   break;

        case "organization.created":
          try {
            console.log("Organization Created", result.data);
          const conference = await ctx.runQuery(internal.conference.getConference, {name:result.data.name});
          if(conference !== null ){
           const receivedOrgId =  await ctx.runMutation(internal.conference.giveOrgIdtoConference, {
              conferenceId: conference._id ,
              orgId: result.data.id,
            })

            if(receivedOrgId) {
              await ctx.runMutation(internal.user.addCreatedConference , {
                orgId:receivedOrgId,
                tokenId:`https://fresh-tiger-39.clerk.accounts.dev|${result.data.created_by}`,
                role:"admin",
              })
              console.log("Conference orgId added successfully  and conference added to user table !!!");
            }
          }
          else  new ConvexError("Conference not made yet ")
          } catch (error) {
            console.log("org_id not set : ",error);
          }
          
        
          break;
        case  "organizationInvitation.accepted":
          console.log("Invitation accepted" , result.data);
           
          break;
      }


    console.log(result);
      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;