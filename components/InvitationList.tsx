
"use client"

import { useOrganization } from '@clerk/nextjs';
import { OrganizationCustomRoleKey } from '@clerk/types';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';



const InvitationList = () => {
     const OrgMembersParams = {
        memberships: {
          pageSize: 5,
          keepPreviousData: true,
        },
      };
      
     const OrgInvitationsParams = {
        invitations: {
          pageSize: 5,
          keepPreviousData: true,
        },
      };
    const { isLoaded, invitations, memberships } = useOrganization({
        ...OrgInvitationsParams,
        ...OrgMembersParams,
      });
    
      if (!isLoaded) {
        return <>Loading</>;
      }
 
         

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Invited</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations?.data?.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.emailAddress}</td>
              <td>{inv.createdAt.toLocaleDateString()}</td>
              <td>{inv.role}</td>
              <td>
                <button
                  onClick={async () => {
                    await inv.revoke();
                    await Promise.all([
                      memberships?.revalidate,
                      invitations?.revalidate,
                    ]);
                  }}
                >
                  Revoke
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          disabled={!invitations?.hasPreviousPage || invitations?.isFetching}
          onClick={() => invitations?.fetchPrevious?.()}
        >
          Previous
        </button>

        <button
          disabled={!invitations?.hasNextPage || invitations?.isFetching}
          onClick={() => invitations?.fetchNext?.()}
        >
          Next
        </button>
      </div>
    </div>
  );
      
   
}

export default InvitationList
