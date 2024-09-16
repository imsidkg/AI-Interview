import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto_Mono } from 'next/font/google';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const robotoMono = Roboto_Mono({
  subsets: ['latin'], 
  weight: ['400', '700'], 
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
    <html lang="en">

      <body className={robotoMono.className}>{children}
        
      </body>
    </html>
      </ClerkProvider>
  );
}
