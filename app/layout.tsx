import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Theme} from "@radix-ui/themes";
import {AuthProvider} from "@/app/auth/Provider";
import NavbarWrapper from "@/app/components/NavbarWrapper";
import QueryClientProvider from "@/app/QueryClientProvider";


const inter = Inter({
    subsets: ['latin'],
    variable: "--font-inter",
})

export const metadata: Metadata = {
    metadataBase: new URL("https://your-domain.com"),
    title: 'FlowSphere',
    description: "Manage your tasks efficiently",
    keywords: ["task management", "issues", "project management", "productivity"],
    authors: [{ name: "Maxim Ivanov" }],
    creator: "FlowSphere Company",
    publisher: "FlowSphere Company",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <QueryClientProvider>
          <AuthProvider>
              <Theme appearance={'dark'} accentColor={'ruby'}>
                  <NavbarWrapper/>
                  <main>
                      {children}
                  </main>
              </Theme>
          </AuthProvider>
      </QueryClientProvider>
      </body>
    </html>
  )
}
