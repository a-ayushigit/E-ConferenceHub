"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {useAuth , ClerkProvider, SignedOut} from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated , ConvexReactClient , AuthLoading , Unauthenticated} from "convex/react";
import Loading from "@/components/auth/Loading";
import { useRouter} from 'next/navigation';

interface ConvexClientProvProps {
    children : React.ReactNode ; 
}

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!;

// adding a convex instance 
const convex = new ConvexReactClient(convexURL);

export const ConvexClientProvider = ({children} : ConvexClientProvProps) => {
    const router = useRouter();
   // this authenticated function is perhaps overriding the public routes setup in the middleware
    return (
        <ClerkProvider>
         <ConvexProviderWithClerk useAuth={useAuth} client={convex} >
         {/* <Unauthenticated>
         <SignInButton />
       
         </Unauthenticated> */}
         <SignedOut>
         <SignInButton />
         </SignedOut>
            <Authenticated>
            {children}
            </Authenticated>
           <AuthLoading>
            <Loading/>
           </AuthLoading>
         </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}