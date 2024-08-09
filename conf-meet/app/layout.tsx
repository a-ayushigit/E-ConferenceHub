import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar.jsx";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] });

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
