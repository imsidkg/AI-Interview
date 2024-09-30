import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from 'sonner';
import "./globals.css";
import { Roboto_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const robotoMono = Roboto_Mono({
  subsets: ['latin'], 
  weight: ['400', '700'] as const, 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel='icon' type='image/svg+xml' href='/favicon.svg' sizes="any" />
          {/* Optional: Fallback for older browsers */}
          <link rel='icon' type='image/png' href='/favicon.png' sizes='any' />
          <link rel='icon' type='image/x-icon' href='/favicon.ico' />
          <meta name='theme-color' content='#ffffff' />
        </head>
        
        <body className={robotoMono.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
