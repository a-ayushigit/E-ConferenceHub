import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/sonner"
import '@stream-io/video-react-sdk/dist/css/styles.css';
const inter = Inter({ subsets: ["latin"] });

// import {NextUIProvider} from "@nextui-org/react";
export const metadata: Metadata = {
  title: "E-ConferenceHub",
  description: "One stop Solution for streamlining online conferences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
        <ConvexClientProvider>
         
          <Navbar/>
          <Toaster />
          
        {children}
      
        </ConvexClientProvider>
        
        </body>
    </html>
  );
}
