'use client'
import React, { Suspense } from 'react'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { middleware } from '../middleware';


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

 function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        suppressContentEditableWarning
        suppressHydrationWarning
        className={inter.className}>
        <Suspense fallback={"...Loading"}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}

RootLayout.middleware = middleware;
export default RootLayout;