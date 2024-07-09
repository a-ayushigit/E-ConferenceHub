import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConfoMeet",
  description: "Online Conference Management Tool",
  icons:{
    icon:'/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider 
      appearance = {{
        
        variables:{
          colorText:'#3d4005',
          colorBackground:"#edf55b",
          colorPrimary:"#1ad9a3",
          colorInputBackground:"#eaf2b6",
          colorInputText:'#3d4005'
        }
      }}>
      <body className={`${inter.className} bg-dark-2`}>
        {children}
        <Toaster/>
      </body>
      </ClerkProvider>
      
    </html>
  );
}
